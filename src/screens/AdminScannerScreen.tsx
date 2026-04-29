import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, shadows, spacing } from '../theme';
import { useTickets } from '../data/store';
import type { RootStackParamList } from '../navigation/RootNavigator';

const VIEWFINDER = 280;

const buildPayload = (ticketId: string, code: string, eventId: string, acquiredAt: string) =>
  JSON.stringify({ v: 1, tid: ticketId, eid: eventId, code, iat: acquiredAt });

export const AdminScannerScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tickets } = useTickets();
  const [pickerOpen, setPickerOpen] = useState(false);

  const scanY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scanY, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [scanY]);

  const lineY = scanY.interpolate({ inputRange: [0, 1], outputRange: [0, VIEWFINDER - 4] });
  const unusedTickets = tickets.filter((t) => t.status === 'unused');

  const onPickTicket = (ticketId: string) => {
    const t = tickets.find((x) => x.id === ticketId);
    if (!t) return;
    setPickerOpen(false);
    const payload = buildPayload(t.id, t.code, t.eventId, t.acquiredAt);
    navigation.navigate('AdminScanResult', { payload });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.headerBar}>
        <View>
          <Text style={styles.headerTitle}>掃碼核銷</Text>
          <Text style={styles.headerSub}>對準用戶 App 的票券 QR Code</Text>
        </View>
        <Pressable
          style={styles.exitBtn}
          onPress={() => navigation.replace('Welcome')}
          hitSlop={12}
        >
          <Ionicons name="exit-outline" size={20} color={colors.textMuted} />
          <Text style={styles.exitText}>退出</Text>
        </Pressable>
      </View>

      <View style={styles.scannerArea}>
        <View style={[styles.viewfinder, { width: VIEWFINDER, height: VIEWFINDER }]}>
          {/* corner brackets */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          {/* animated scan line */}
          <Animated.View style={[styles.scanLine, { transform: [{ translateY: lineY }] }]} />
          {/* hint icon */}
          <View style={styles.scanIconBubble}>
            <Ionicons name="qr-code" size={44} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.scanHint}>系統正在搜尋 QR Code…</Text>
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={styles.simulateBtn} onPress={() => setPickerOpen(true)}>
          <Ionicons name="sparkles" size={18} color="#FFFFFF" />
          <Text style={styles.simulateText}>模擬掃描（Demo）</Text>
        </Pressable>
        <Text style={styles.cameraHint}>實機版本將呼叫相機鏡頭即時辨識 QR Code</Text>
      </View>

      {pickerOpen && (
        <View style={styles.pickerOverlay}>
          <Pressable style={styles.pickerBackdrop} onPress={() => setPickerOpen(false)} />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <Text style={styles.pickerTitle}>選擇要模擬掃描的票券</Text>
            <Text style={styles.pickerSubtitle}>共 {unusedTickets.length} 張未使用票券</Text>
            <ScrollView style={{ maxHeight: 360 }}>
              {unusedTickets.length === 0 ? (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>目前沒有未使用票券，請先在用戶端領券。</Text>
                </View>
              ) : (
                unusedTickets.map((t) => (
                  <Pressable key={t.id} style={styles.pickerRow} onPress={() => onPickTicket(t.id)}>
                    <View style={styles.pickerStub}>
                      <Ionicons name="ticket" size={22} color="#FFFFFF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.pickerRowTitle}>{t.title}</Text>
                      <Text style={styles.pickerRowMeta}>{t.code}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1023',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    marginTop: 4,
    fontSize: 14,
    color: '#C7B7D6',
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  exitText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scannerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinder: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIconBubble: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,123,172,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: colors.primary,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5, borderTopLeftRadius: radii.md },
  cornerTR: { top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5, borderTopRightRadius: radii.md },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5, borderBottomLeftRadius: radii.md },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5, borderBottomRightRadius: radii.md },
  scanLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  scanHint: {
    marginTop: spacing.lg,
    fontSize: 16,
    color: '#E8DAF1',
    fontWeight: '600',
  },
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    alignItems: 'center',
  },
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: 16,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  simulateText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  cameraHint: {
    marginTop: spacing.md,
    fontSize: 12,
    color: '#9F8AB1',
    textAlign: 'center',
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pickerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    ...shadows.sheet,
  },
  pickerHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  pickerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pickerStub: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerRowTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  pickerRowMeta: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
    fontFamily: 'monospace' as any,
  },
  emptyRow: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
  },
});
