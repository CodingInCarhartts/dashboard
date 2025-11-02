import type { KickApiResponse, KickService } from '../../types';
import { KICK_CONFIG } from '../../config';

class KickServiceImpl implements KickService {
  async fetchKickChannels(channelSlugs: string[]): Promise<KickApiResponse> {
    const tokenResponse = await fetch('https://id.kick.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${KICK_CONFIG.appAuth.id}&client_secret=${KICK_CONFIG.appAuth.secret}`,
    });
    if (!tokenResponse.ok) {
      throw new Error(`Kick Token API error: ${tokenResponse.statusText}`);
    }
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const params = new URLSearchParams();
    channelSlugs.forEach((slug) => params.append('slug', slug));
    const response = await fetch(`https://api.kick.com/public/v1/channels?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: '*/*',
      },
    });
    if (!response.ok) {
      throw new Error(`Kick Channels API error: ${response.statusText}`);
    }
    return (await response.json()) as KickApiResponse;
  }
}

export const kickService: KickService = new KickServiceImpl();
