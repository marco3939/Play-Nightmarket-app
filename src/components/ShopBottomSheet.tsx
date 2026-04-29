import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryColors, colors, radii, shadows, spacing } from '../theme';
import type { Event, Shop } from '../types';

type Props = {
  shop: Shop | null;
  relatedEvents: Event[];
  onClose: () => void;
  onClaim: (event: Event) => void;
};

export const ShopBottomSheet: React.FC<Props> = ({ shop, relatedEvents, onClose, onClaim }) => {
  const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: shop ? 0 : Dimensions.get('window').height,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [shop, translateY]);

  if (!shop) return null;
  const meta = categoryColors[shop.category];

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        <View style={styles.headerRow}>
          <View style={[styles.iconBubble, { backgroundColor: meta.fill, borderColor: meta.stroke }]}>
            <Text style={styles.iconBubbleEmoji}>{meta.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{shop.name}</Text>
              {shop.isPromoting && (
                <View style={styles.promoBadge}>
                  <Text style={styles.promoBadgeText}>限時優惠</Text>
                </View>
              )}
            </View>
            <Text style={styles.category}>{meta.label} · {shop.id}</Text>
          </View>
          <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={colors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>{shop.hours}</Text>
          </View>
          {shop.signature && (
            <View style={styles.metaItem}>
              <Ionicons name="star-outline" size={16} color={colors.textMuted} />
              <Text style={styles.metaText} numberOfLines={1}>{shop.signature}</Text>
            </View>
          )}
        </View>

        <Text style={styles.description}>{shop.description}</Text>

        {relatedEvents.length > 0 ? (
          <View style={styles.eventsBlock}>
            <Text style={styles.sectionTitle}>可領取的優惠</Text>
            {relatedEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventCover}>{event.cover}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventBenefit}>{event.benefit}</Text>
                </View>
                <Pressable style={styles.claimBtn} onPress={() => onClaim(event)}>
                  <Text style={styles.claimBtnText}>領券</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noEventBlock}>
            <Text style={styles.noEventText}>目前沒有適用優惠，可關注「活動」頁未來檔期。</Text>
          </View>
        )}

        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionBtn, styles.actionPrimary]}>
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
            <Text style={styles.actionPrimaryText}>導航至此</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.actionSecondary]}>
            <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
            <Text style={styles.actionSecondaryText}>收藏</Text>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    ...shadows.sheet,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBubble: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  iconBubbleEmoji: {
    fontSize: 34,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    flexShrink: 1,
  },
  promoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  promoBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7A5500',
  },
  category: {
    marginTop: 4,
    fontSize: 15,
    color: colors.textMuted,
  },
  closeBtn: {
    padding: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: '500',
  },
  description: {
    marginTop: spacing.md,
    fontSize: 17,
    lineHeight: 28,
    color: colors.text,
  },
  eventsBlock: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#FFF8EE',
    borderColor: '#F5DAA8',
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  eventCover: {
    fontSize: 34,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  eventBenefit: {
    marginTop: 4,
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  claimBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.pill,
  },
  claimBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  noEventBlock: {
    marginTop: spacing.lg,
    backgroundColor: '#F4F4F5',
    padding: spacing.md,
    borderRadius: radii.md,
  },
  noEventText: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: radii.pill,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
  },
  actionPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
  },
  actionSecondary: {
    backgroundColor: '#FFF1E8',
    borderWidth: 1,
    borderColor: '#FFD8BD',
  },
  actionSecondaryText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 17,
  },
});
