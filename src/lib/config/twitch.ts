import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../env';

export const TWITCH_CONFIG = {
  channels: [
    'ninja',
    'shroud',
    'pokimane',
    'timthetatman',
    'summit1g',
    'tfue',
    'myth',
    'nickmercs',
    'syndicate',
    'cloakzy',
    'caseoh_',
    'kaicenat',
    'xqc',
    'hasanabi',
    'ludwig',
    'fuslie',
    'sodapoppin',
    'valorant',
    'riotgames',
    'esl_csgo'
  ],
  sortBy: 'viewers',
  collapseAfter: 3,
  appAuth: {
    name: "YumlabsLiveMonitor",
    id: "k2hkqw7hmjl60of13uakd3x03pfybr",
    secret: TWITCH_CLIENT_SECRET
  }
};