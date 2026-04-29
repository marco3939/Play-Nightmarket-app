import React, { useEffect, useRef } from 'react';
import { Alert, Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import { useTickets } from '../data/store';
import { getEventById } from '../data/events';
import { colors, radii, shadows, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

const notify = (title: string, message: string, onConfirm?: () => void) => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    if (window.confirm(`${title}\n${message}`)) onConfirm?.();
  } else {
    Alert.alert(title, message, [
      { text: '取消', style: 'cancel' },
      { text: '確認', onPress: onConfirm },
    ]);
  }
};

export const TicketDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'TicketDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tickets, markUsed } = useTickets();
  const ticket = tickets.find((t) => t.id === route.params.ticketId);

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [pulse]);

  if (!ticket) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>找不到此票券</Text>
      </SafeAreaView>
    );
  }

  const event = getEventById(ticket.eventId);
  const isUsed = ticket.status === 'used';

  const qrPayload = JSON.stringify({
    v: 1,
    tid: ticket.id,
    eid: ticket.eventId,
    code: ticket.code,
    iat: ticket.acquiredAt,
  });

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  const handleSimulate = () => {
    notify('模擬核銷', '工作人員已掃碼，確認核銷此票券？', () => {
      markUsed(ticket.id);
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.headerBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>票券</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{ticket.title}</Text>
        <Text style={styles.benefit}>{ticket.benefit}</Text>

        <Animated.View style={[styles.qrCard, !isUsed && { transform: [{ scale }] }]}>
          {isUsed && (
            <View style={styles.usedOverlay}>
              <Text style={styles.usedText}>已使用</Text>
            </View>
          )}
          <View style={styles.qrInner}>
            <QRCode value={qrPayload} size={220} color={isUsed ? '#A0A0A0' : '#1F2937'} backgroundColor="#FFFFFF" />
          </View>
          <Text style={styles.code}>{ticket.code}</Text>
          <Text style={styles.codeHint}>請至管委會服務台出示此 QR Code 核銷</Text>
        </Animated.View>

        <View style={styles.infoCard}>
          <Row icon="time-outline" label="領取時間" value={ticket.acquiredAt.replace('T', ' ').slice(0, 16)} />
          <Row icon="hourglass-outline" label="使用期限" value={ticket.expiresAt.slice(0, 10).replace(/-/g, '/')} />
          <Row icon="storefront-outline" label="活動名稱" value={event?.title ?? '—'} />
          <Row icon="location-outline" label="核銷地點" value="逢甲商圈管委會服務台" />
        </View>

        {!isUsed && (
          <Pressable style={styles.simulateBtn} onPress={handleSimulate}>
            <Ionicons name="qr-code-outline" size={18} color={colors.primary} />
            <Text style={styles.simulateText}>模擬管委會掃碼核銷（Demo）</Text>
          </Pressable>
        )}

        <Text style={styles.footnote}>
          ※ 為防止盜用，QR Code 內含時效 token，每次顯示皆會重新驗證。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Row: React.FC<{ icon: any; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={18} color={colors.textMuted} />
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
  </View>
);

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
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.sm,
  },
  benefit: {
    marginTop: 8,
    fontSize: 19,
    color: colors.primary,
    fontWeight: '700',
  },
  qrCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginTop: spacing.xl,
    alignItems: 'center',
    ...shadows.card,
  },
  qrInner: {
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
  },
  code: {
    marginTop: spacing.md,
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 3,
    fontFamily: 'monospace' as any,
  },
  codeHint: {
    marginTop: 10,
    fontSize: 15,
    color: colors.textMuted,
  },
  usedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderRadius: radii.lg,
  },
  usedText: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.danger,
    transform: [{ rotate: '-15deg' }],
    borderWidth: 4,
    borderColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
  },
  infoCard: {
    width: '100%',
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    gap: spacing.sm,
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowLabel: {
    fontSize: 16,
    color: colors.textMuted,
    width: 100,
  },
  rowValue: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'right',
  },
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: 16,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: '#FFF3EB',
  },
  simulateText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  footnote: {
    marginTop: spacing.lg,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
});
