import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { categoryColors, colors, radii, spacing } from '../theme';
import type { ShopCategory } from '../types';

const CATEGORIES: ShopCategory[] = ['food', 'drink', 'clothing', 'accessory', 'entertainment'];

type Props = {
  active: ShopCategory[] | null;
  onToggle: (category: ShopCategory) => void;
  onClear: () => void;
};

export const CategoryFilter: React.FC<Props> = ({ active, onToggle, onClear }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Pressable onPress={onClear} style={[styles.chip, !active && styles.chipActive]}>
        <Text style={[styles.chipText, !active && styles.chipTextActive]}>全部</Text>
      </Pressable>
      {CATEGORIES.map((cat) => {
        const meta = categoryColors[cat];
        const isActive = active?.includes(cat);
        return (
          <Pressable
            key={cat}
            onPress={() => onToggle(cat)}
            style={[
              styles.chip,
              isActive && { backgroundColor: meta.stroke, borderColor: meta.stroke },
            ]}
          >
            <Text style={styles.chipEmoji}>{meta.emoji}</Text>
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{meta.label}</Text>
          </Pressable>
        );
      })}
      <View style={{ width: spacing.lg }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});
