import type { TwitchApiResponse, TwitchService } from '../../types';
import { TWITCH_CONFIG } from '../../config';

class TwitchServiceImpl implements TwitchService {
  async fetchTwitchStreams(userLogins: string[]): Promise<TwitchApiResponse> {
    // Get access token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `client_id=${TWITCH_CONFIG.appAuth.id}&client_secret=${TWITCH_CONFIG.appAuth.secret}&grant_type=client_credentials`,
    });

    if (!tokenResponse.ok) {
      throw new Error(`Twitch Token API error: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch streams
    const params = new URLSearchParams();
    userLogins.forEach(login => params.append('user_login', login));
    params.append('first', '100'); // Max 100 streams

    const response = await fetch(`https://api.twitch.tv/helix/streams?${params.toString()}`, {
      headers: {
        'Client-ID': TWITCH_CONFIG.appAuth.id,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch Streams API error: ${response.statusText}`);
    }

    return await response.json() as TwitchApiResponse;
  }
}

export const twitchService: TwitchService = new TwitchServiceImpl();