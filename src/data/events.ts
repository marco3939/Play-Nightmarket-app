import type { Event } from '../types';

export const events: Event[] = [
  {
    id: 'evt_midautumn',
    title: '中秋限定優惠週',
    subtitle: '逢甲商圈聯合促銷',
    cover: '🌕',
    startDate: '2026-09-20',
    endDate: '2026-09-30',
    description:
      '中秋節期間至管委會服務台領取「滿 200 折 20 元」聯合券，全商圈合作店家通用。每人每日限領一次。',
    benefit: '滿 200 折 20',
    applicableShopIds: ['shop_001', 'shop_002', 'shop_003', 'shop_007', 'shop_008', 'shop_022'],
    highlight: true,
  },
  {
    id: 'evt_backtoschool',
    title: '學生開學季',
    subtitle: '飲料店買一送一',
    cover: '🎒',
    startDate: '2026-09-01',
    endDate: '2026-09-15',
    description:
      '新學期開學嗨翻天！持學生證至管委會服務台兌換「飲料買一送一」券，逢甲在地飲料店通用。',
    benefit: '飲料買一送一',
    applicableShopIds: ['shop_004', 'shop_005', 'shop_006', 'shop_021'],
    highlight: true,
  },
  {
    id: 'evt_eatingchallenge',
    title: '週末大胃王挑戰',
    subtitle: '冠軍獨享 5,000 元商圈禮券',
    cover: '🍗',
    startDate: '2026-10-05',
    endDate: '2026-10-06',
    description:
      '報名挑戰指定店家招牌餐點，10 分鐘內完食即贏得獎金，並獲商圈合作店家折扣禮包。',
    benefit: '挑戰賽 / 報名 NT$200',
    applicableShopIds: ['shop_022', 'shop_001', 'shop_007'],
  },
  {
    id: 'evt_localweek',
    title: '逢甲在地週',
    subtitle: '小吃 9 折回饋',
    cover: '🏮',
    startDate: '2026-11-10',
    endDate: '2026-11-17',
    description: '在地店家聯合回饋，憑券享小吃類 9 折優惠，週末更有街頭表演與市集。',
    benefit: '小吃全面 9 折',
    applicableShopIds: ['shop_001', 'shop_002', 'shop_003', 'shop_007', 'shop_008', 'shop_009', 'shop_014', 'shop_015', 'shop_019', 'shop_020'],
  },
  {
    id: 'evt_lottery',
    title: '打卡抽 AirPods',
    subtitle: '到逢甲就有機會中獎',
    cover: '🎁',
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    description: 'App 內任意領取一張券即自動參加每月抽獎，頭獎 AirPods Pro，月月開獎。',
    benefit: '自動參加抽獎',
    applicableShopIds: [],
  },
];

export const getEventById = (id: string) => events.find((e) => e.id === id);
