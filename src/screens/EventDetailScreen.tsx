import React from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getEventById } from '../data/events';
import { getShopById } from '../data/shops';
import { useTickets } from '../data/store';
import { colors, radii, shadows, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

const notify = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export const EventDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EventDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const event = getEventById(route.params.eventId);
  const { claimTicket } = useTickets();

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>找不到此活動</Text>
      </SafeAreaView>
    );
  }

  const applicableShops = event.applicableShopIds.map(getShopById).filter(Boolean);

  const handleClaim = () => {
    const ticket = claimTicket(event);
    notify('領券成功 🎉', `${event.title}\n券號：${ticket.code}`);
    navigation.navigate('Tabs', { screen: 'Tickets' });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.headerBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>活動詳情</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{event.cover}</Text>
          <Text style={styles.heroTitle}>{event.title}</Text>
          <Text style={styles.heroSubtitle}>{event.subtitle}</Text>
          <View style={styles.benefitChip}>
            <Text style={styles.benefitChipText}>{event.benefit}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>
              活動期間：{event.startDate.replace(/-/g, '/')} ~ {event.endDate.replace(/-/g, '/')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>核銷地點：逢甲商圈管委會服務台</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
            <Text style={styles.infoText}>每人每日限領一次，需出示 App 內 QR Code</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>活動說明</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {applicableShops.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>適用店家</Text>
            <View style={styles.shopList}>
              {applicableShops.map((shop) => (
                <View key={shop!.id} style={styles.shopChip}>
                  <Text style={styles.shopChipText}>{shop!.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Pressable style={styles.claimBtn} onPress={handleClaim}>
          <Ionicons name="ticket-outline" size={22} color="#FFFFFF" />
          <Text style={styles.claimBtnText}>立即領券</Text>
        </Pressable>

        <Text style={styles.footnote}>
          領券後請至「我的票券」展示 QR Code，工作人員核銷後可至店家換取實體優惠。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    textAlign: 'center',
    marginTop: 60,
    color: colors.textMuted,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    ...shadows.card,
  },
  heroEmoji: {
    fontSize: 56,
  },
  heroTitle: {
    marginTop: spacing.md,
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
  benefitChip: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  benefitChipText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7A5500',
  },
  infoCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    gap: spacing.sm,
    ...shadows.card,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  shopList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  shopChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shopChipText: {
    fontSize: 13,
    color: colors.text,
  },
  claimBtn: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  claimBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  footnote: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
