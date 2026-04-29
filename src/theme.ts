import type { ShopCategory } from './types';

export const colors = {
  primary: '#FF6B3D',
  primaryDark: '#E04A1A',
  accent: '#FFD93D',
  background: '#FFF8F2',
  surface: '#FFFFFF',
  text: '#1F2937',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  danger: '#EF4444',
  mapBackground: '#FAEFD9',
  mapStreet: '#FFFFFF',
  mapStreetEdge: '#E8DCC2',
  shopDefault: '#FBE4C9',
  shopStroke: '#C8A06D',
  promoGlow: '#FFD93D',
};

export const categoryColors: Record<ShopCategory, { fill: string; stroke: string; label: string; emoji: string }> = {
  food:          { fill: '#FFD0A6', stroke: '#E8893B', label: '小吃', emoji: '🍢' },
  drink:         { fill: '#C7E5FF', stroke: '#3B82C6', label: '飲料', emoji: '🧋' },
  clothing:      { fill: '#E0D2F9', stroke: '#7C5BC6', label: '服飾', emoji: '👕' },
  accessory:     { fill: '#FFD2E5', stroke: '#D04C8E', label: '配件', emoji: '💍' },
  entertainment: { fill: '#C9F2D2', stroke: '#3B9C57', label: '娛樂', emoji: '🎯' },
};

export const radii = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
};
