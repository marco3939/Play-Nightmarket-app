import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTickets } from '../data/store';
import { colors, radii, shadows, spacing } from '../theme';
import type { RedemptionLog } from '../types';

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const hh = `${d.getHours()}`.padStart(2, '0');
  const mm = `${d.getMinutes()}`.padStart(2, '0');
  return `${m}/${day} ${hh}:${mm}`;
};

const Row: React.FC<{ log: RedemptionLog }> = ({ log }) => (
  <View style={styles.row}>
    <View style={styles.iconBubble}>
      <Ionicons name="checkmark-circle" size={26} color={colors.success} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.title} numberOfLines={1}>{log.eventTitle}</Text>
      <Text style={styles.benefit}>{log.benefit}</Text>
      <Text style={styles.code}>{log.ticketCode}</Text>
    </View>
    <View style={styles.timeBlock}>
      <Text style={styles.time}>{formatTime(log.redeemedAt)}</Text>
      <Text style={styles.staff}>由 {log.staffId}</Text>
    </View>
  </View>
);

export const AdminLogsScreen: React.FC = () => {
  const { logs } = useTickets();
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>核銷紀錄</Text>
        <Text style={styles.headerSub}>共 {logs.length} 筆</Text>
      </View>
      <FlatList
        data={logs}
        keyExtractor={(l) => l.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => <Row log={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>尚無核銷紀錄</Text>
          </View>
        }
      />
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
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5FBEC',
  },
  title: { fontSize: 17, fontWeight: '800', color: colors.text },
  benefit: { marginTop: 2, fontSize: 14, color: colors.primary, fontWeight: '700' },
  code: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace' as any,
    letterSpacing: 1,
  },
  timeBlock: { alignItems: 'flex-end' },
  time: { fontSize: 13, fontWeight: '700', color: colors.text },
  staff: { marginTop: 2, fontSize: 11, color: colors.textMuted },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
    gap: spacing.md,
  },
  emptyText: { fontSize: 16, color: colors.textMuted },
});
