import type { Shop, Landmark, StreetPath } from '../types';

export const MAP_VIEWBOX = { width: 1200, height: 900 };

export const streets: StreetPath[] = [
  { id: 'street_main', d: 'M 0 420 H 1200 V 540 H 0 Z', label: '文華路', labelX: 600, labelY: 485 },
  { id: 'street_cross', d: 'M 540 0 H 660 V 900 H 540 Z', label: '逢甲路', labelX: 600, labelY: 60 },
  { id: 'alley_1', d: 'M 0 200 H 540 V 240 H 0 Z' },
  { id: 'alley_2', d: 'M 660 200 H 1200 V 240 H 660 Z' },
  { id: 'alley_3', d: 'M 0 700 H 540 V 740 H 0 Z' },
  { id: 'alley_4', d: 'M 660 700 H 1200 V 740 H 660 Z' },
];

export const shops: Shop[] = [
  // Top-left quadrant (food row)
  { id: 'shop_001', name: '逢甲豆乳雞', category: 'food', x: 40,  y: 80,  width: 150, height: 110, hours: '17:00–01:00', description: '招牌獨門豆乳醃製，外酥內嫩的酥脆雞塊。', isPromoting: true,  signature: '豆乳雞 / NT$80 起' },
  { id: 'shop_002', name: '官芝霖大腸包小腸', category: 'food', x: 210, y: 80,  width: 150, height: 110, hours: '16:00–00:00', description: '逢甲三十年老店，糯米腸夾香腸經典銅板美食。', isPromoting: false, signature: '大腸包小腸 / NT$60' },
  { id: 'shop_003', name: '日船章魚小丸子', category: 'food', x: 380, y: 80,  width: 140, height: 110, hours: '15:00–23:30', description: '台日合作章魚燒名店，現點現做、外脆內軟。', isPromoting: true,  signature: '8 入 / NT$70' },

  // Top-right quadrant (drinks)
  { id: 'shop_004', name: '老虎堂黑糖珍奶', category: 'drink', x: 680, y: 80,  width: 150, height: 110, hours: '11:00–23:00', description: '黑糖虎紋珍奶創始店，堅持用甘蔗黑糖手炒。', isPromoting: false, signature: '黑糖珍奶 / NT$65' },
  { id: 'shop_005', name: '春水堂',           category: 'drink', x: 850, y: 80,  width: 150, height: 110, hours: '10:30–22:00', description: '台中珍珠奶茶發源地，內用茶飲與輕食。', isPromoting: false, signature: '珍珠奶茶 / NT$80' },
  { id: 'shop_006', name: '50 嵐',           category: 'drink', x: 1020, y: 80, width: 140, height: 110, hours: '10:00–23:00', description: '國民手搖飲，多種糖度冰塊客製化。', isPromoting: true,  signature: '波霸奶茶 / NT$45' },

  // Mid-left (food)
  { id: 'shop_007', name: '黃金右腿炸雞腿',   category: 'food', x: 40,  y: 280, width: 150, height: 110, hours: '17:00–00:00', description: '比臉還大的炸雞腿，外皮酥脆肉汁飽滿。', isPromoting: false, signature: '黃金右腿 / NT$120' },
  { id: 'shop_008', name: '明倫蛋餅',         category: 'food', x: 210, y: 280, width: 150, height: 110, hours: '16:00–23:00', description: '北部知名古早味蛋餅進駐逢甲，多種口味。', isPromoting: true,  signature: '招牌蛋餅 / NT$45' },
  { id: 'shop_009', name: '大麻臭豆腐',       category: 'food', x: 380, y: 280, width: 140, height: 110, hours: '17:00–02:00', description: '麻辣鴨血臭豆腐，麻香有層次。', isPromoting: false, signature: '麻辣臭豆腐 / NT$70' },

  // Mid-right (clothing)
  { id: 'shop_010', name: 'NET 服飾',         category: 'clothing', x: 680, y: 280, width: 150, height: 110, hours: '12:00–22:30', description: '本土平價服飾品牌，男女童裝齊全。', isPromoting: false, signature: 'T-Shirt / NT$199 起' },
  { id: 'shop_011', name: 'SPAO 韓系服飾',    category: 'clothing', x: 850, y: 280, width: 150, height: 110, hours: '12:00–22:30', description: '韓國連鎖快時尚，聯名款齊全。', isPromoting: true,  signature: '聯名 T / NT$590' },
  { id: 'shop_012', name: '逢甲飾品專賣',     category: 'accessory', x: 1020, y: 280, width: 140, height: 110, hours: '14:00–23:00', description: '銀飾、耳環、手鍊大集合，學生最愛。', isPromoting: false, signature: '耳環 / NT$50 起' },

  // Below main street, left (food)
  { id: 'shop_013', name: '三兄弟豆花',       category: 'drink', x: 40,  y: 580, width: 150, height: 100, hours: '14:00–23:30', description: '手工豆花配料超過 12 種，料多實在。', isPromoting: false, signature: '綜合豆花 / NT$45' },
  { id: 'shop_014', name: '麻吉燒',           category: 'food', x: 210, y: 580, width: 150, height: 100, hours: '15:00–23:00', description: '日式現烤年糕串，麻吉口感甜中帶鹹。', isPromoting: true,  signature: '麻吉燒 / NT$50' },
  { id: 'shop_015', name: '滿燒丸',           category: 'food', x: 380, y: 580, width: 140, height: 100, hours: '16:00–00:00', description: '日式炸丸子，多種口味創意組合。', isPromoting: false, signature: '綜合丸子 / NT$80' },

  // Below main street, right (entertainment + accessories)
  { id: 'shop_016', name: '逢甲投籃機館',     category: 'entertainment', x: 680, y: 580, width: 150, height: 100, hours: '14:00–01:00', description: '雙人對戰投籃機，氣氛熱絡同學最愛。', isPromoting: true,  signature: '投幣 NT$10 / 局' },
  { id: 'shop_017', name: '夾娃娃機天堂',     category: 'entertainment', x: 850, y: 580, width: 150, height: 100, hours: '24 小時',     description: '上百台主題娃娃機，夜市必訪夢幻場域。', isPromoting: false, signature: 'NT$10 / 次' },
  { id: 'shop_018', name: '貼紙工坊',         category: 'accessory', x: 1020, y: 580, width: 140, height: 100, hours: '15:00–23:00', description: '客製貼紙、印章、文青小物。', isPromoting: false, signature: '貼紙 / NT$30 起' },

  // Bottom row
  { id: 'shop_019', name: '阿伯茶葉蛋',       category: 'food',  x: 40,  y: 770, width: 150, height: 100, hours: '24 小時', description: '滷得入味的茶葉蛋，深夜療癒首選。', isPromoting: false, signature: '茶葉蛋 / NT$15' },
  { id: 'shop_020', name: '法藍薄餅',         category: 'food',  x: 210, y: 770, width: 150, height: 100, hours: '15:00–00:00', description: '法式薄餅鹹甜口味皆有，現點現做。', isPromoting: true,  signature: '可麗餅 / NT$80' },
  { id: 'shop_021', name: '天使紅茶',         category: 'drink', x: 380, y: 770, width: 140, height: 100, hours: '11:00–23:30', description: '人氣 1 公升大紅茶，清涼解膩。', isPromoting: false, signature: '紅茶 (L) / NT$35' },
  { id: 'shop_022', name: '一中益民豪大雞排', category: 'food',  x: 680, y: 770, width: 150, height: 100, hours: '17:00–01:00', description: '台中老字號雞排，份量大酥脆有口感。', isPromoting: true,  signature: '豪大雞排 / NT$80' },
  { id: 'shop_023', name: '起士馬鈴薯',       category: 'food',  x: 850, y: 770, width: 150, height: 100, hours: '17:00–00:00', description: '焗烤起司爆漿馬鈴薯，多種配料。', isPromoting: false, signature: '起士馬鈴薯 / NT$95' },
  { id: 'shop_024', name: 'PLAYBOY 服飾',     category: 'clothing', x: 1020, y: 770, width: 140, height: 100, hours: '12:00–22:30', description: '美式潮流品牌，學生族群熱愛。', isPromoting: false, signature: '帽 T / NT$1280' },
];

export const landmarks: Landmark[] = [
  { id: 'lm_toilet_1',  type: 'toilet',   label: '廁所',     x: 270, y: 40 },
  { id: 'lm_toilet_2',  type: 'toilet',   label: '廁所',     x: 920, y: 870 },
  { id: 'lm_atm',       type: 'atm',      label: 'ATM',      x: 600, y: 480 },
  { id: 'lm_parking',   type: 'parking',  label: '停車場',   x: 110, y: 870 },
  { id: 'lm_entrance_1',type: 'entrance', label: '主入口',   x: 600, y: 30 },
  { id: 'lm_entrance_2',type: 'entrance', label: '側入口',   x: 30,  y: 480 },
];

export const getShopById = (id: string) => shops.find((s) => s.id === id);
