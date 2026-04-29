import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, shadows, spacing } from '../theme';
import { useTickets } from '../data/store';
import { getEventById } from '../data/events';
import type { RootStackParamList } from '../navigation/RootNavigator';

const REASON_TEXT: Record<string, string> = {
  not_found: '查無此票券',
  already_used: '此票券已被核銷過',
  expired: '此票券已過期',
  invalid: 'QR Code 內容無效',
};

export const AdminScanResultScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AdminScanResult'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { redeemByPayload, tickets } = useTickets();
  const [done, setDone] = useState<{ ok: boolean; reason?: string } | null>(null);

  // Pre-validate the payload to preview info without writing yet.
  const preview = useMemo(() => {
    try {
      const parsed = JSON.parse(route.params.payload);
      const t = tickets.find((x) => x.id === parsed?.tid);
      const event = t ? getEventById(t.eventId) : null;
      const issue =
        !t
          ? 'not_found'
          : t.status === 'used'
          ? 'already_used'
          : new Date(t.expiresAt) < new Date()
          ? 'expired'
          : null;
      return { ticket: t, event, issue };
    } catch {
      return { ticket: null, event: null, issue: 'invalid' as const };
    }
  }, [route.params.payload, tickets]);

  const isDone = done !== null;
  const success = done?.ok === true;
  const failure = done?.ok === false;
  const previewInvalid = preview.issue !== null;

  const onConfirm = () => {
    const result = redeemByPayload(route.params.payload);
    setDone({ ok: result.ok, reason: result.ok ? undefined : result.reason });
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.headerBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>核銷確認</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.body}>
        {/* Status hero */}
        <View
          style={[
            styles.hero,
            success && styles.heroSuccess,
            (failure || previewInvalid) && !success && styles.heroFail,
          ]}
        >
          <View style={styles.heroIcon}>
            <Ionicons
              name={
                success
                  ? 'checkmark-circle'
                  : failure || previewInvalid
                  ? 'close-circle'
                  : 'help-circle'
              }
              size={56}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.heroTitle}>
            {success
              ? '核銷成功'
              : failure
              ? '核銷失敗'
              : previewInvalid
              ? REASON_TEXT[preview.issue!]
              : '請確認以下資訊'}
          </Text>
          {failure && (
            <Text style={styles.heroSub}>
              {REASON_TEXT[done!.reason ?? 'invalid']}
            </Text>
          )}
          {!isDone && !previewInvalid && preview.ticket && (
            <Text style={styles.heroSub}>票券有效，請與用戶確認後核銷</Text>
          )}
        </View>

        {/* Ticket details */}
        {preview.ticket && (
          <View style={styles.detailCard}>
            <Row label="活動名稱" value={preview.ticket.title} />
            <Row label="優惠內容" value={preview.ticket.benefit} highlight />
            <Row label="券號" value={preview.ticket.code} mono />
            <Row
              label="領取時間"
              value={preview.ticket.acquiredAt.replace('T', ' ').slice(0, 16)}
            />
            <Row
              label="使用期限"
              value={preview.ticket.expiresAt.slice(0, 10).replace(/-/g, '/')}
            />
            {preview.event?.applicableShopIds && preview.event.applicableShopIds.length > 0 && (
              <Row
                label="適用店家"
                value={`${preview.event.applicableShopIds.length} 家`}
              />
            )}
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actionBar}>
        {!isDone && !previewInvalid && (
          <>
            <Pressable style={styles.rejectBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={20} color={colors.danger} />
              <Text style={styles.rejectText}>取消</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={onConfirm}>
              <Ionicons name="checkmark" size={22} color="#FFFFFF" />
              <Text style={styles.confirmText}>確認核銷</Text>
            </Pressable>
          </>
        )}
        {(isDone || previewInvalid) && (
          <Pressable
            style={[styles.doneBtn, success && styles.doneBtnSuccess]}
            onPress={() => navigation.replace('AdminTabs')}
          >
            <Text style={styles.doneText}>{success ? '繼續掃下一張' : '返回掃描'}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const Row: React.FC<{ label: string; value: string; mono?: boolean; highlight?: boolean }> = ({
  label,
  value,
  mono,
  highlight,
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text
      style={[
        styles.rowValue,
        mono && styles.mono,
        highlight && styles.highlightValue,
      ]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xl,
    ...shadows.card,
  },
  heroSuccess: {
    backgroundColor: colors.success,
  },
  heroFail: {
    backgroundColor: colors.danger,
  },
  heroIcon: {
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  heroSub: {
    marginTop: 8,
    fontSize: 15,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '600',
  },
  detailCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rowLabel: {
    fontSize: 15,
    color: colors.textMuted,
    width: 90,
  },
  rowValue: {
    flex: 1,
    fontSize: 17,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'right',
  },
  highlightValue: {
    color: colors.primary,
    fontSize: 19,
  },
  mono: {
    fontFamily: 'monospace' as any,
    letterSpacing: 1,
    fontSize: 15,
  },
  actionBar: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: 18,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.danger,
    backgroundColor: '#FFFFFF',
  },
  rejectText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.danger,
  },
  confirmBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
  },
  confirmText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  doneBtn: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  doneBtnSuccess: {
    backgroundColor: colors.success,
  },
  doneText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
