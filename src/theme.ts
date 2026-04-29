import { Platform, Text, TextInput } from 'react-native';
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
  sm: 8,
  md: 14,
  lg: 22,
  xl: 28,
  pill: 999,
};

// More breathing room — old values bumped up.
export const spacing = {
  xs: 6,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  xxl: 44,
};

// Larger, elderly-friendly type scale. Body bumped from 14 → 18, titles 16 → 22, headers 24 → 30.
export const fontSizes = {
  micro: 13,
  caption: 15,
  body: 18,
  title: 22,
  heading: 30,
  display: 36,
};

export const FONT_FAMILY = 'Huninn';

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 14,
  },
};

// Globally apply the cute rounded font to every <Text> and <TextInput>
// without touching every existing StyleSheet. defaultProps.style is placed
// first in the array so any explicit fontFamily (e.g. Ionicons) still wins.
export const installGlobalFont = () => {
  const setDefault = (Component: any) => {
    if (!Component) return;
    const existing = Component.defaultProps ?? {};
    Component.defaultProps = {
      ...existing,
      style: [{ fontFamily: FONT_FAMILY }, existing.style],
    };
  };
  setDefault(Text);
  setDefault(TextInput);
};
