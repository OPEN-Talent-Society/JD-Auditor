
import { LIGHTCAST_CONFIG } from '../constants';
import { LightcastTokenResponse, LightcastExtractionResponse, ExtractedSkill } from '../types';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * Authenticates with Lightcast to get an OAuth2 access token.
 * Uses Client Credentials flow.
 */
export const getLightcastToken = async (): Promise<string> => {
  const now = Date.now();
  
  // Return cached token if valid (add 60s buffer)
  if (cachedToken && tokenExpiry && now < tokenExpiry - 60000) {
    return cachedToken;
  }

  const formData = new URLSearchParams();
  formData.append('client_id', LIGHTCAST_CONFIG.CLIENT_ID);
  formData.append('client_secret', LIGHTCAST_CONFIG.SECRET);
  formData.append('grant_type', 'client_credentials');
  formData.append('scope', LIGHTCAST_CONFIG.SCOPE);

  try {
    const response = await fetch(LIGHTCAST_CONFIG.AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Auth Failed: ${response.status} ${errorBody}`);
    }

    const data: LightcastTokenResponse = await response.json();
    cachedToken = data.access_token;
    // expires_in is in seconds, convert to ms
    tokenExpiry = now + (data.expires_in * 1000);
    
    return cachedToken;
  } catch (error) {
    console.error("Lightcast Auth Error:", error);
    throw error;
  }
};

/**
 * Extracts skills from text using Lightcast Open Skills API.
 */
export const extractSkillsFromText = async (text: string): Promise<ExtractedSkill[]> => {
  try {
    const token = await getLightcastToken();
    
    const response = await fetch(`${LIGHTCAST_CONFIG.BASE_URL}/extract`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        confidenceThreshold: 0.6 // Only get fairly confident matches
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Extraction Failed: ${response.status} ${errorBody}`);
    }

    const result: LightcastExtractionResponse = await response.json();
    
    // Map and deduplicate skills based on ID, keeping the highest confidence one
    const uniqueSkills = new Map<string, ExtractedSkill>();
    
    result.data.forEach(item => {
      const existing = uniqueSkills.get(item.skill.id);
      if (!existing || item.confidence > existing.confidence) {
        uniqueSkills.set(item.skill.id, {
            skill: item.skill,
            confidence: item.confidence
        });
      }
    });

    return Array.from(uniqueSkills.values());

  } catch (error) {
    console.error("Skill Extraction Error:", error);
    throw error;
  }
};
