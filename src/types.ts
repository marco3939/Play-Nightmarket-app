export type ShopCategory = 'food' | 'drink' | 'clothing' | 'accessory' | 'entertainment';

export type LandmarkType = 'toilet' | 'atm' | 'parking' | 'entrance';

export type Shop = {
  id: string;
  name: string;
  category: ShopCategory;
  x: number;
  y: number;
  width: number;
  height: number;
  hours: string;
  description: string;
  isPromoting: boolean;
  signature?: string;
};

export type Landmark = {
  id: string;
  type: LandmarkType;
  label: string;
  x: number;
  y: number;
};

export type StreetPath = {
  id: string;
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
};

export type Event = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  startDate: string;
  endDate: string;
  description: string;
  benefit: string;
  applicableShopIds: string[];
  highlight?: boolean;
};

export type TicketStatus = 'unused' | 'used' | 'expired';

export type Ticket = {
  id: string;
  eventId: string;
  shopId?: string;
  title: string;
  benefit: string;
  acquiredAt: string;
  expiresAt: string;
  status: TicketStatus;
  code: string;
};
