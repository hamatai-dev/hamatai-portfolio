export type Transport = 'flight' | 'ship' | 'bus' | 'train';
export type StopStatus = 'visited' | 'planned';

export interface JourneyStop {
  id: string;
  country: { ja: string; en: string };
  city?: { ja: string; en: string };
  lat: number;
  lng: number;
  /** How this stop was reached from the previous one. */
  transport?: Transport;
  status: StopStatus;
  current?: boolean;
}

// 実際の渡航ルート。関西空港を出発し、台湾（台北から時計回りで一周・電車）→
// ロサンゼルス（飛行機）→ ダラス（飛行機）→ ヒューストン→モンテレイ→
// グアナファト→メキシコシティ→オアハカ（現在地、いずれも陸路バス）。
// この先の中米・南米・南アフリカ〜東アフリカ・エジプトは大まかに決まっている予定ルート
// （具体的な都市は未定のため、国・地域の代表座標を仮置きしています）。
export const journeyStops: JourneyStop[] = [
  {
    id: 'japan',
    country: { ja: '日本', en: 'Japan' },
    city: { ja: '関西国際空港', en: 'Kansai Airport' },
    lat: 34.4347,
    lng: 135.2441,
    status: 'visited',
  },
  {
    id: 'taiwan',
    country: { ja: '台湾', en: 'Taiwan' },
    city: { ja: '台北', en: 'Taipei' },
    lat: 25.033,
    lng: 121.5654,
    transport: 'train',
    status: 'visited',
  },
  {
    id: 'los-angeles',
    country: { ja: 'アメリカ', en: 'United States' },
    city: { ja: 'ロサンゼルス', en: 'Los Angeles' },
    lat: 34.0522,
    lng: -118.2437,
    transport: 'flight',
    status: 'visited',
  },
  {
    id: 'dallas',
    country: { ja: 'アメリカ', en: 'United States' },
    city: { ja: 'ダラス', en: 'Dallas' },
    lat: 32.7767,
    lng: -96.797,
    transport: 'flight',
    status: 'visited',
  },
  {
    id: 'houston',
    country: { ja: 'アメリカ', en: 'United States' },
    city: { ja: 'ヒューストン', en: 'Houston' },
    lat: 29.7604,
    lng: -95.3698,
    transport: 'bus',
    status: 'visited',
  },
  {
    id: 'monterrey',
    country: { ja: 'メキシコ', en: 'Mexico' },
    city: { ja: 'モンテレイ', en: 'Monterrey' },
    lat: 25.6866,
    lng: -100.3161,
    transport: 'bus',
    status: 'visited',
  },
  {
    id: 'guanajuato',
    country: { ja: 'メキシコ', en: 'Mexico' },
    city: { ja: 'グアナファト', en: 'Guanajuato' },
    lat: 21.019,
    lng: -101.2574,
    transport: 'bus',
    status: 'visited',
  },
  {
    id: 'mexico-city',
    country: { ja: 'メキシコ', en: 'Mexico' },
    city: { ja: 'メキシコシティ', en: 'Mexico City' },
    lat: 19.4326,
    lng: -99.1332,
    transport: 'bus',
    status: 'visited',
  },
  {
    id: 'oaxaca',
    country: { ja: 'メキシコ', en: 'Mexico' },
    city: { ja: 'オアハカ', en: 'Oaxaca' },
    lat: 17.0732,
    lng: -96.7266,
    transport: 'bus',
    status: 'visited',
    current: true,
  },
  {
    id: 'central-america',
    country: { ja: '中米', en: 'Central America' },
    lat: 8.9824,
    lng: -79.5199,
    status: 'planned',
  },
  {
    id: 'south-america',
    country: { ja: '南米', en: 'South America' },
    lat: -15,
    lng: -60,
    status: 'planned',
  },
  {
    id: 'south-africa',
    country: { ja: '南アフリカ', en: 'South Africa' },
    lat: -30.5595,
    lng: 22.9375,
    status: 'planned',
  },
  {
    id: 'east-africa',
    country: { ja: '東アフリカ', en: 'East Africa' },
    lat: -1.2921,
    lng: 36.8219,
    status: 'planned',
  },
  {
    id: 'egypt',
    country: { ja: 'エジプト', en: 'Egypt' },
    lat: 26.8206,
    lng: 30.8025,
    status: 'planned',
  },
];

export const currentStop: JourneyStop =
  journeyStops.find((stop) => stop.current) ??
  journeyStops[journeyStops.length - 1];
