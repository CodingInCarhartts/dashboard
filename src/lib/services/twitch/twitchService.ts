import type { TwitchApiResponse, TwitchService } from '../../types';
import { TWITCH_CONFIG } from '../../config';

class TwitchServiceImpl implements TwitchService {
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

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

    // Fetch streams in batches of 100
    const chunks = this.chunkArray(userLogins, 100);
    const allStreams: any[] = [];

    for (const chunk of chunks) {
      const params = new URLSearchParams();
      chunk.forEach((login) => params.append('user_login', login));
      params.append('first', '100'); // Max 100 streams

      const response = await fetch(`https://api.twitch.tv/helix/streams?${params.toString()}`, {
        headers: {
          'Client-ID': TWITCH_CONFIG.appAuth.id,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorMsg =
          response.status === 400
            ? `Bad request - possibly too many user logins (max 100 per request, attempted ${chunk.length})`
            : `Twitch Streams API error (${response.status}): ${response.statusText}`;
        throw new Error(errorMsg);
      }

      const data = await response.json();
      allStreams.push(...data.data);
    }

    return { data: allStreams };
  }
}

export const twitchService: TwitchService = new TwitchServiceImpl();
