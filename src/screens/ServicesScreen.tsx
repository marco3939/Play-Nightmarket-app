import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme';

const announcements = [
  { id: 'a1', date: '2026/04/27', title: '中秋限定優惠週活動正式啟動', tag: '活動' },
  { id: 'a2', date: '2026/04/22', title: '逢甲商圈停車場 3 號出口維護公告', tag: '公告' },
  { id: 'a3', date: '2026/04/18', title: '本週末 LIVE 街頭表演陣容', tag: '活動' },
];

const facilities = [
  { id: 'f1', icon: 'man-outline', label: '廁所', count: 4 },
  { id: 'f2', icon: 'cash-outline', label: 'ATM', count: 3 },
  { id: 'f3', icon: 'car-outline', label: '停車場', count: 2 },
  { id: 'f4', icon: 'medkit-outline', label: '急救站', count: 1 },
];

const contactItems = [
  { id: 'c1', icon: 'call-outline', label: '管委會服務專線', value: '04-2451-XXXX' },
  { id: 'c2', icon: 'mail-outline', label: '客服信箱', value: 'service@play-fengjia.tw' },
  { id: 'c3', icon: 'logo-instagram', label: '官方 Instagram', value: '@playfengjia' },
];

export const ServicesScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>服務</Text>
        <Text style={styles.headerSubtitle}>商圈管委會公告 · 設施與聯繫</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Section title="最新公告">
          {announcements.map((a) => (
            <View key={a.id} style={styles.annRow}>
              <View style={styles.annTag}>
                <Text style={styles.annTagText}>{a.tag}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.annTitle}>{a.title}</Text>
                <Text style={styles.annDate}>{a.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          ))}
        </Section>

        <Section title="商圈設施">
          <View style={styles.facilityGrid}>
            {facilities.map((f) => (
              <View key={f.id} style={styles.facilityCard}>
                <View style={styles.facilityIcon}>
                  <Ionicons name={f.icon as any} size={24} color={colors.primary} />
                </View>
                <Text style={styles.facilityLabel}>{f.label}</Text>
                <Text style={styles.facilityCount}>共 {f.count} 處</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="聯繫管委會">
          {contactItems.map((c) => (
            <View key={c.id} style={styles.contactRow}>
              <Ionicons name={c.icon as any} size={20} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{c.label}</Text>
                <Text style={styles.contactValue}>{c.value}</Text>
              </View>
            </View>
          ))}
        </Section>

        <Text style={styles.versionFootnote}>玩轉逢甲 v0.1.0 · MVP Demo</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

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
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: colors.textMuted,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.card,
  },
  annRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  annTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFE9D8',
    borderRadius: radii.pill,
  },
  annTagText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  annTitle: {
    fontSize: 17,
    color: colors.text,
    fontWeight: '700',
    lineHeight: 24,
  },
  annDate: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
  facilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  facilityCard: {
    flexBasis: '46%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: '#FFF8EE',
    borderRadius: radii.md,
  },
  facilityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE0CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilityLabel: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  facilityCount: {
    marginTop: 4,
    fontSize: 15,
    color: colors.textMuted,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  contactLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  contactValue: {
    marginTop: 4,
    fontSize: 17,
    color: colors.text,
    fontWeight: '700',
  },
  versionFootnote: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontSize: 13,
    color: colors.textMuted,
  },
});
