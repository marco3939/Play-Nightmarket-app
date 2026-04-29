import React, { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CategoryFilter } from '../components/CategoryFilter';
import { NightMarketMap } from '../components/NightMarketMap';
import { ShopBottomSheet } from '../components/ShopBottomSheet';
import { shops } from '../data/shops';
import { events } from '../data/events';
import { useTickets } from '../data/store';
import { colors, radii, shadows, spacing } from '../theme';
import type { Event, Shop, ShopCategory } from '../types';
import type { RootStackParamList } from '../navigation/RootNavigator';

const notify = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export const MapScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { claimTicket } = useTickets();
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [activeCategories, setActiveCategories] = useState<ShopCategory[] | null>(null);
  const [search, setSearch] = useState('');

  const matched = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.trim().toLowerCase();
    return shops.filter((s) => s.name.toLowerCase().includes(q));
  }, [search]);

  const relatedEvents: Event[] = useMemo(() => {
    if (!selectedShop) return [];
    return events.filter((e) => e.applicableShopIds.includes(selectedShop.id));
  }, [selectedShop]);

  const toggleCategory = (cat: ShopCategory) => {
    setActiveCategories((prev) => {
      if (!prev) return [cat];
      if (prev.includes(cat)) {
        const next = prev.filter((c) => c !== cat);
        return next.length === 0 ? null : next;
      }
      return [...prev, cat];
    });
  };

  const handleClaim = (event: Event) => {
    const ticket = claimTicket(event);
    setSelectedShop(null);
    notify('領券成功 🎉', `${event.title}\n券號：${ticket.code}\n請至「我的票券」於管委會服務台出示 QR Code 核銷。`);
    navigation.navigate('Tabs', { screen: 'Tickets' });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="搜尋店家、商品（如：豆乳雞）"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      <CategoryFilter
        active={activeCategories}
        onToggle={toggleCategory}
        onClear={() => setActiveCategories(null)}
      />

      <View style={styles.mapHintTop}>
        <Ionicons name="hand-left-outline" size={14} color="#7A5530" />
        <Text style={styles.mapHintText}>點擊店家查看詳情，金色背景為限時優惠</Text>
      </View>

      <View style={styles.mapWrap}>
        <NightMarketMap
          selectedId={selectedShop?.id ?? null}
          activeCategories={activeCategories}
          onSelectShop={setSelectedShop}
        />

        {matched && matched.length > 0 && (
          <View style={styles.searchResults}>
            {matched.slice(0, 5).map((shop) => (
              <Pressable
                key={shop.id}
                style={styles.resultRow}
                onPress={() => {
                  setSelectedShop(shop);
                  setSearch('');
                }}
              >
                <Text style={styles.resultTitle}>{shop.name}</Text>
                <Text style={styles.resultMeta}>{shop.hours}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <ShopBottomSheet
        shop={selectedShop}
        relatedEvents={relatedEvents}
        onClose={() => setSelectedShop(null)}
        onClaim={handleClaim}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    ...shadows.card,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    padding: 0,
  },
  mapWrap: {
    flex: 1,
    margin: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: '#FFF3DA',
    ...shadows.card,
  },
  searchResults: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingVertical: spacing.xs,
    ...shadows.card,
  },
  resultRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  resultMeta: {
    marginTop: 4,
    fontSize: 15,
    color: colors.textMuted,
  },
  mapHintTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: spacing.lg,
    marginTop: 0,
    marginBottom: spacing.xs,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: '#FFF1F4',
  },
  mapHintText: {
    fontSize: 14,
    color: '#7A5530',
    fontWeight: '600',
  },
});
