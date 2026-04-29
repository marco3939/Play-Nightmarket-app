import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTickets } from '../data/store';
import { colors, radii, shadows, spacing } from '../theme';
import type { Ticket, TicketStatus } from '../types';
import type { RootStackParamList } from '../navigation/RootNavigator';

const STATUS_LABEL: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  unused: { label: '未使用', color: '#0F766E', bg: '#D1FAE5' },
  used: { label: '已使用', color: '#6B7280', bg: '#E5E7EB' },
  expired: { label: '已過期', color: '#B91C1C', bg: '#FECACA' },
};

const TicketCard: React.FC<{ ticket: Ticket; onPress: () => void }> = ({ ticket, onPress }) => {
  const status = STATUS_LABEL[ticket.status];
  const isUnused = ticket.status === 'unused';
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, !isUnused && styles.cardDisabled]}
    >
      <View style={[styles.stub, !isUnused && styles.stubDisabled]}>
        <Ionicons name="ticket" size={28} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.benefit}>{ticket.benefit}</Text>
        <Text style={styles.code}>{ticket.code}</Text>
        <Text style={styles.expires}>期限：{ticket.expiresAt.slice(0, 10).replace(/-/g, '/')}</Text>
      </View>
      <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
        <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
      </View>
    </Pressable>
  );
};

export const TicketsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tickets } = useTickets();
  const [filter, setFilter] = useState<'all' | TicketStatus>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tickets;
    return tickets.filter((t) => t.status === filter);
  }, [tickets, filter]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的票券</Text>
        <Text style={styles.headerSubtitle}>共 {tickets.length} 張，未使用 {tickets.filter((t) => t.status === 'unused').length} 張</Text>
      </View>

      <View style={styles.filterRow}>
        {[
          { key: 'all', label: '全部' },
          { key: 'unused', label: '未使用' },
          { key: 'used', label: '已使用' },
        ].map((opt) => (
          <Pressable
            key={opt.key}
            onPress={() => setFilter(opt.key as any)}
            style={[styles.filterChip, filter === opt.key && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === opt.key && styles.filterTextActive]}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={list}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="ticket-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>還沒有票券，到「活動」或地圖領一張吧！</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TicketCard
            ticket={item}
            onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textMuted,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  cardDisabled: {
    opacity: 0.65,
  },
  stub: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stubDisabled: {
    backgroundColor: colors.textMuted,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  benefit: {
    marginTop: 2,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  code: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'monospace' as any,
  },
  expires: {
    marginTop: 2,
    fontSize: 11,
    color: colors.textMuted,
  },
  statusPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: spacing.md,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
