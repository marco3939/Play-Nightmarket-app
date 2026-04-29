import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii, shadows, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

const DEMO_PIN = '1234';

const KEY_ROWS: (string | null)[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [null, '0', 'back'],
];

export const AdminEntryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const enter = (k: string) => {
    if (pin.length >= 4) return;
    const next = pin + k;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === DEMO_PIN) {
          navigation.replace('AdminTabs');
        } else {
          setError(true);
          setPin('');
        }
      }, 200);
    }
  };

  const back = () => {
    setPin((p) => p.slice(0, -1));
    setError(false);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()} hitSlop={12}>
        <Ionicons name="close" size={26} color={colors.textMuted} />
      </Pressable>

      <View style={styles.brandBlock}>
        <View style={styles.shieldIcon}>
          <Ionicons name="shield-checkmark" size={42} color={colors.primary} />
        </View>
        <Text style={styles.title}>管委會核銷端</Text>
        <Text style={styles.subtitle}>請輸入工作人員 4 位 PIN 碼</Text>
        <View style={styles.demoHintBlock}>
          <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
          <Text style={styles.demoHint}>Demo PIN：1234</Text>
        </View>
      </View>

      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < pin.length && styles.dotFilled,
              error && styles.dotError,
            ]}
          />
        ))}
      </View>
      {error && <Text style={styles.errText}>PIN 碼錯誤，請重試</Text>}

      <View style={styles.keypad}>
        {KEY_ROWS.map((row, ri) => (
          <View key={ri} style={styles.keyRow}>
            {row.map((k, ki) =>
              k === null ? (
                <View key={ki} style={styles.key} />
              ) : k === 'back' ? (
                <Pressable key={ki} onPress={back} style={styles.key}>
                  <Ionicons name="backspace-outline" size={28} color={colors.text} />
                </Pressable>
              ) : (
                <Pressable key={ki} onPress={() => enter(k)} style={styles.key}>
                  <Text style={styles.keyText}>{k}</Text>
                </Pressable>
              )
            )}
          </View>
        ))}
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
  closeBtn: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
  },
  brandBlock: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  shieldIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pinkSoft,
    borderWidth: 3,
    borderColor: colors.pinkAccent,
  },
  title: {
    marginTop: spacing.md,
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 16,
    color: colors.textMuted,
  },
  demoHintBlock: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoHint: {
    fontSize: 13,
    color: colors.textMuted,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginVertical: spacing.lg,
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dotError: {
    borderColor: colors.danger,
  },
  errText: {
    textAlign: 'center',
    color: colors.danger,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    fontSize: 14,
    fontWeight: '700',
  },
  keypad: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  keyRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  key: {
    flex: 1,
    height: 72,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  keyText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
});
