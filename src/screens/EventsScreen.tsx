import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { events } from '../data/events';
import { colors, radii, shadows, spacing } from '../theme';
import type { Event } from '../types';
import type { RootStackParamList } from '../navigation/RootNavigator';

const formatRange = (start: string, end: string) => {
  const fmt = (s: string) => {
    const d = new Date(s);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
};

const EventCard: React.FC<{ event: Event; onPress: () => void }> = ({ event, onPress }) => (
  <Pressable onPress={onPress} style={[styles.card, event.highlight && styles.cardHighlight]}>
    <View style={styles.coverBlock}>
      <Text style={styles.cover}>{event.cover}</Text>
      {event.highlight && (
        <View style={styles.hotBadge}>
          <Text style={styles.hotBadgeText}>HOT</Text>
        </View>
      )}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.subtitle}>{event.subtitle}</Text>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{formatRange(event.startDate, event.endDate)}</Text>
        </View>
        <View style={styles.benefitTag}>
          <Text style={styles.benefitText}>{event.benefit}</Text>
        </View>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
  </Pressable>
);

export const EventsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>限時活動</Text>
        <Text style={styles.headerSubtitle}>商圈管委會精選 · 領券至服務台核銷</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
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
    paddingBottom: spacing.md,
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
  cardHighlight: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  coverBlock: {
    width: 78,
    height: 78,
    borderRadius: radii.md,
    backgroundColor: '#FFF1DA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cover: {
    fontSize: 40,
  },
  hotBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.danger,
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  hotBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: colors.textMuted,
  },
  metaRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: '500',
  },
  benefitTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#FFE9D8',
    borderRadius: radii.pill,
  },
  benefitText: {
    fontSize: 15,
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
