import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, shadows, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

const features = [
  {
    icon: 'map-outline' as const,
    title: '商圈互動地圖',
    desc: '一秒找到喜愛的店家、廁所、ATM',
  },
  {
    icon: 'pricetag-outline' as const,
    title: '限時優惠領券',
    desc: '管委會精選好康，動動手指領回家',
  },
  {
    icon: 'ticket-outline' as const,
    title: '集中核銷',
    desc: '至服務台亮出 QR Code 換實體優惠',
  },
];

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const float = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [float, pulse]);

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.heroBlock}>
        <Animated.View style={[styles.logoCircle, { transform: [{ translateY }] }]}>
          <Text style={styles.logoEmoji}>🏮</Text>
        </Animated.View>
        <Text style={styles.brand}>玩轉逢甲</Text>
        <Text style={styles.tagline}>逢甲夜市最強導覽夥伴</Text>
        <View style={styles.subBadge}>
          <Ionicons name="sparkles" size={14} color={colors.primaryDark} />
          <Text style={styles.subBadgeText}>商圈管委會官方推出</Text>
        </View>
      </View>

      <View style={styles.featureList}>
        {features.map((f, idx) => (
          <View key={f.title} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name={f.icon} size={26} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
            <Text style={styles.featureNum}>0{idx + 1}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomBlock}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            style={styles.cta}
            onPress={() => navigation.replace('Tabs', { screen: 'Map' })}
          >
            <Text style={styles.ctaText}>開始探索</Text>
            <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
        <Text style={styles.disclaimer}>
          首次使用即同意服務條款與隱私權政策
        </Text>
        <Pressable
          style={styles.adminLink}
          onPress={() => navigation.navigate('AdminEntry')}
          hitSlop={8}
        >
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.textMuted} />
          <Text style={styles.adminLinkText}>管委會核銷端</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  heroBlock: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.pinkAccent,
    ...shadows.card,
  },
  logoEmoji: {
    fontSize: 76,
  },
  brand: {
    marginTop: spacing.lg,
    fontSize: 38,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },
  tagline: {
    marginTop: spacing.xs,
    fontSize: 18,
    color: colors.textMuted,
  },
  subBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.pinkSoft,
    borderRadius: radii.pill,
  },
  subBadgeText: {
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  featureList: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.pinkSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },
  featureDesc: {
    marginTop: 4,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  featureNum: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.pinkAccent,
  },
  bottomBlock: {
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: 20,
    borderRadius: radii.pill,
    ...shadows.card,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 2,
  },
  disclaimer: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textMuted,
  },
  adminLink: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  adminLinkText: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: 'underline',
    textDecorationColor: colors.textMuted,
  },
});
