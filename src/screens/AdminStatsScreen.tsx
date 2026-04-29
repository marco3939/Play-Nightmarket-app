import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTickets } from '../data/store';
import { events as allEvents } from '../data/events';
import { colors, radii, shadows, spacing } from '../theme';

const Card: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  hint?: string;
  color?: string;
}> = ({ icon, label, value, hint, color = colors.primary }) => (
  <View style={styles.card}>
    <View style={[styles.cardIcon, { backgroundColor: color + '22' }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
    {hint && <Text style={styles.cardHint}>{hint}</Text>}
  </View>
);

export const AdminStatsScreen: React.FC = () => {
  const { getStats, logs } = useTickets();
  const stats = useMemo(() => getStats(), [getStats]);

  const eventBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const log of logs) counts.set(log.eventId, (counts.get(log.eventId) ?? 0) + 1);
    const list = allEvents.map((e) => ({
      id: e.id,
      title: e.title,
      cover: e.cover,
      count: counts.get(e.id) ?? 0,
    }));
    const max = Math.max(1, ...list.map((x) => x.count));
    return list
      .map((x) => ({ ...x, ratio: x.count / max }))
      .sort((a, b) => b.count - a.count);
  }, [logs]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>核銷統計</Text>
        <Text style={styles.headerSub}>即時更新 · 商圈管委會儀表板</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsGrid}>
          <Card
            icon="ticket-outline"
            label="累計領券"
            value={`${stats.totalClaimed}`}
            hint="張"
            color={colors.primary}
          />
          <Card
            icon="checkmark-done-outline"
            label="累計核銷"
            value={`${stats.totalRedeemed}`}
            hint="張"
            color={colors.success}
          />
          <Card
            icon="hourglass-outline"
            label="待核銷"
            value={`${stats.pending}`}
            hint="張"
            color="#F59E0B"
          />
          <Card
            icon="trending-up-outline"
            label="核銷轉換率"
            value={`${(stats.conversionRate * 100).toFixed(0)}%`}
            color="#3B82F6"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>各活動核銷數</Text>
          <View style={styles.barCard}>
            {eventBreakdown.map((row) => (
              <View key={row.id} style={styles.barRow}>
                <Text style={styles.barCover}>{row.cover}</Text>
                <View style={{ flex: 1 }}>
                  <View style={styles.barRowHeader}>
                    <Text style={styles.barTitle} numberOfLines={1}>
                      {row.title}
                    </Text>
                    <Text style={styles.barCount}>{row.count}</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${row.ratio * 100}%` || '4%' },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
            {eventBreakdown.every((b) => b.count === 0) && (
              <Text style={styles.emptyHint}>尚無核銷資料</Text>
            )}
          </View>
        </View>

        {stats.topEventTitle && (
          <View style={styles.topCard}>
            <Ionicons name="flame" size={28} color={colors.danger} />
            <View style={{ flex: 1 }}>
              <Text style={styles.topLabel}>最熱門活動</Text>
              <Text style={styles.topTitle}>{stats.topEventTitle}</Text>
              <Text style={styles.topMeta}>已核銷 {stats.topEventCount} 張</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: { fontSize: 30, fontWeight: '900', color: colors.text },
  headerSub: { marginTop: 6, fontSize: 15, color: colors.textMuted },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  cardValue: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: '900',
  },
  cardHint: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  barCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.md,
    ...shadows.card,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  barCover: { fontSize: 28 },
  barRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barTitle: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1 },
  barCount: { fontSize: 16, fontWeight: '900', color: colors.primary },
  barTrack: {
    marginTop: 6,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.pinkSoft,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  emptyHint: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.textMuted,
  },
  topCard: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#FFF1F1',
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: '#FECACA',
  },
  topLabel: { fontSize: 13, color: colors.danger, fontWeight: '700' },
  topTitle: { marginTop: 4, fontSize: 19, fontWeight: '900', color: colors.text },
  topMeta: { marginTop: 4, fontSize: 14, color: colors.textMuted },
});
