import type { Shop, Landmark, StreetPath } from '../types';

// Vertical map: 2 wide columns × 12 rows. Each shop tile is large enough
// to read its name comfortably on a phone.
export const MAP_VIEWBOX = { width: 720, height: 2200 };

const COL_W = 320;          // shop tile width
const COL_H = 150;           // shop tile height
const COL_GAP_X = 80;        // street between left & right columns
const ROW_GAP_Y = 30;        // gap between rows
const MARGIN_X = 0;
const MARGIN_TOP = 100;      // leave room for top entrance
const MARGIN_BOTTOM = 120;   // leave room for bottom row

const colX = (col: 0 | 1) =>
  MARGIN_X + col * (COL_W + COL_GAP_X);
const rowY = (row: number) =>
  MARGIN_TOP + row * (COL_H + ROW_GAP_Y);

const STREET_X = colX(0) + COL_W;        // street starts at right edge of left column
const STREET_W = COL_GAP_X;

export const streets: StreetPath[] = [
  // central pedestrian "street"
  {
    id: 'street_main',
    d: `M ${STREET_X} 0 H ${STREET_X + STREET_W} V ${MAP_VIEWBOX.height} H ${STREET_X} Z`,
    label: '逢甲文華路',
    labelX: STREET_X + STREET_W / 2,
    labelY: 60,
  },
];

// 24 shops, 12 rows × 2 cols
const data: Array<Omit<Shop, 'x' | 'y' | 'width' | 'height'>> = [
  { id: 'shop_001', name: '逢甲豆乳雞', category: 'food', hours: '17:00–01:00', description: '招牌獨門豆乳醃製，外酥內嫩的酥脆雞塊。', isPromoting: true,  signature: '豆乳雞 / NT$80 起' },
  { id: 'shop_002', name: '官芝霖大腸包小腸', category: 'food', hours: '16:00–00:00', description: '逢甲三十年老店，糯米腸夾香腸經典銅板美食。', isPromoting: false, signature: '大腸包小腸 / NT$60' },
  { id: 'shop_003', name: '日船章魚小丸子', category: 'food', hours: '15:00–23:30', description: '台日合作章魚燒名店，現點現做、外脆內軟。', isPromoting: true,  signature: '8 入 / NT$70' },
  { id: 'shop_004', name: '老虎堂黑糖珍奶', category: 'drink', hours: '11:00–23:00', description: '黑糖虎紋珍奶創始店，堅持用甘蔗黑糖手炒。', isPromoting: false, signature: '黑糖珍奶 / NT$65' },
  { id: 'shop_005', name: '春水堂',           category: 'drink', hours: '10:30–22:00', description: '台中珍珠奶茶發源地，內用茶飲與輕食。', isPromoting: false, signature: '珍珠奶茶 / NT$80' },
  { id: 'shop_006', name: '50 嵐',           category: 'drink', hours: '10:00–23:00', description: '國民手搖飲，多種糖度冰塊客製化。', isPromoting: true,  signature: '波霸奶茶 / NT$45' },
  { id: 'shop_007', name: '黃金右腿炸雞腿',   category: 'food', hours: '17:00–00:00', description: '比臉還大的炸雞腿，外皮酥脆肉汁飽滿。', isPromoting: false, signature: '黃金右腿 / NT$120' },
  { id: 'shop_008', name: '明倫蛋餅',         category: 'food', hours: '16:00–23:00', description: '北部知名古早味蛋餅進駐逢甲，多種口味。', isPromoting: true,  signature: '招牌蛋餅 / NT$45' },
  { id: 'shop_009', name: '大麻臭豆腐',       category: 'food', hours: '17:00–02:00', description: '麻辣鴨血臭豆腐，麻香有層次。', isPromoting: false, signature: '麻辣臭豆腐 / NT$70' },
  { id: 'shop_010', name: 'NET 服飾',         category: 'clothing', hours: '12:00–22:30', description: '本土平價服飾品牌，男女童裝齊全。', isPromoting: false, signature: 'T-Shirt / NT$199 起' },
  { id: 'shop_011', name: 'SPAO 韓系服飾',    category: 'clothing', hours: '12:00–22:30', description: '韓國連鎖快時尚，聯名款齊全。', isPromoting: true,  signature: '聯名 T / NT$590' },
  { id: 'shop_012', name: '逢甲飾品專賣',     category: 'accessory', hours: '14:00–23:00', description: '銀飾、耳環、手鍊大集合，學生最愛。', isPromoting: false, signature: '耳環 / NT$50 起' },
  { id: 'shop_013', name: '三兄弟豆花',       category: 'drink', hours: '14:00–23:30', description: '手工豆花配料超過 12 種，料多實在。', isPromoting: false, signature: '綜合豆花 / NT$45' },
  { id: 'shop_014', name: '麻吉燒',           category: 'food', hours: '15:00–23:00', description: '日式現烤年糕串，麻吉口感甜中帶鹹。', isPromoting: true,  signature: '麻吉燒 / NT$50' },
  { id: 'shop_015', name: '滿燒丸',           category: 'food', hours: '16:00–00:00', description: '日式炸丸子，多種口味創意組合。', isPromoting: false, signature: '綜合丸子 / NT$80' },
  { id: 'shop_016', name: '逢甲投籃機館',     category: 'entertainment', hours: '14:00–01:00', description: '雙人對戰投籃機，氣氛熱絡同學最愛。', isPromoting: true,  signature: '投幣 NT$10 / 局' },
  { id: 'shop_017', name: '夾娃娃機天堂',     category: 'entertainment', hours: '24 小時',     description: '上百台主題娃娃機，夜市必訪夢幻場域。', isPromoting: false, signature: 'NT$10 / 次' },
  { id: 'shop_018', name: '貼紙工坊',         category: 'accessory', hours: '15:00–23:00', description: '客製貼紙、印章、文青小物。', isPromoting: false, signature: '貼紙 / NT$30 起' },
  { id: 'shop_019', name: '阿伯茶葉蛋',       category: 'food',  hours: '24 小時', description: '滷得入味的茶葉蛋，深夜療癒首選。', isPromoting: false, signature: '茶葉蛋 / NT$15' },
  { id: 'shop_020', name: '法藍薄餅',         category: 'food',  hours: '15:00–00:00', description: '法式薄餅鹹甜口味皆有，現點現做。', isPromoting: true,  signature: '可麗餅 / NT$80' },
  { id: 'shop_021', name: '天使紅茶',         category: 'drink', hours: '11:00–23:30', description: '人氣 1 公升大紅茶，清涼解膩。', isPromoting: false, signature: '紅茶 (L) / NT$35' },
  { id: 'shop_022', name: '一中益民豪大雞排', category: 'food',  hours: '17:00–01:00', description: '台中老字號雞排，份量大酥脆有口感。', isPromoting: true,  signature: '豪大雞排 / NT$80' },
  { id: 'shop_023', name: '起士馬鈴薯',       category: 'food',  hours: '17:00–00:00', description: '焗烤起司爆漿馬鈴薯，多種配料。', isPromoting: false, signature: '起士馬鈴薯 / NT$95' },
  { id: 'shop_024', name: 'PLAYBOY 服飾',     category: 'clothing', hours: '12:00–22:30', description: '美式潮流品牌，學生族群熱愛。', isPromoting: false, signature: '帽 T / NT$1280' },
];

export const shops: Shop[] = data.map((s, i) => {
  const row = Math.floor(i / 2);
  const col = (i % 2) as 0 | 1;
  return {
    ...s,
    x: colX(col),
    y: rowY(row),
    width: COL_W,
    height: COL_H,
  };
});

// Landmarks scattered along the central street and at row gaps
export const landmarks: Landmark[] = [
  { id: 'lm_entrance_top', type: 'entrance', label: '主入口', x: STREET_X + STREET_W / 2, y: 50 },
  { id: 'lm_toilet_1',     type: 'toilet',   label: '廁所',   x: STREET_X + STREET_W / 2, y: rowY(2) + COL_H / 2 + 15 },
  { id: 'lm_atm',          type: 'atm',      label: 'ATM',    x: STREET_X + STREET_W / 2, y: rowY(5) + COL_H / 2 + 15 },
  { id: 'lm_toilet_2',     type: 'toilet',   label: '廁所',   x: STREET_X + STREET_W / 2, y: rowY(8) + COL_H / 2 + 15 },
  { id: 'lm_parking',      type: 'parking',  label: '停車場', x: STREET_X + STREET_W / 2, y: MAP_VIEWBOX.height - 60 },
];

export const getShopById = (id: string) => shops.find((s) => s.id === id);
