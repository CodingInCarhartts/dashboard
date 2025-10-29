import type { YoutubeChannel } from '../types';

export const VIDEOS_CONFIG: { channels: YoutubeChannel[]; limit: number } = {
  channels: [
    { id: 'UCXuqSBlHAE6Xw-yeJA0Tunw', name: 'Linus Tech Tips' },
    { id: 'UCsBjURrPoezykLs9EqgamOA', name: 'Fireship' },
    { id: 'UCUyeluBRhGPCW4rPe_UvBZQ', name: 'ThePrimeTime' },
    { id: 'UCJa14zeVf8p6clixTOIOVyQ', name: 'Jakkuh' },
    { id: 'UC3s0BtrBJpwNDaflRSoiieQ', name: 'Hak5' },
    // Gaming channels
    { id: 'UCQeRaTukNYft1_6AZPACnog', name: 'Asmongold' },
    { id: 'UCMwJJL5FJFuTRT55ksbQ4GQ', name: 'Asmongold Clips' },
    { id: 'UCNvzD7Z-g64bPXxGzaQaa4g', name: 'Gameranx' },
    { id: 'UCZ7AeeVbyslLM_8-nVy2B8Q', name: 'Skill Up' },
    { id: 'UCHDxYLv8iovIbhrfl16CNyg', name: 'GameLinked' },
    { id: 'UC9PBzalIcEQCsiIkq36PyUA', name: 'Digital Foundry' }
  ],
  limit: 3
};
