import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Defs, G, Path, Rect, Text as SvgText, LinearGradient, Stop, Circle } from 'react-native-svg';
import { categoryColors, colors } from '../theme';
import { MAP_VIEWBOX, landmarks, shops, streets } from '../data/shops';
import type { Landmark, Shop, ShopCategory } from '../types';

type Props = {
  selectedId: string | null;
  activeCategories: ShopCategory[] | null;
  onSelectShop: (shop: Shop) => void;
};

const landmarkEmoji: Record<Landmark['type'], string> = {
  toilet: '🚻',
  atm: '🏧',
  parking: '🅿️',
  entrance: '➡️',
};

// SVG renders with width=100% and height = (viewBox.height / viewBox.width) × screen width
// On a 350px-wide viewport: rendered height ≈ 350 × (2200/720) ≈ 1070px → vertical scroll.
const ASPECT = MAP_VIEWBOX.height / MAP_VIEWBOX.width;

export const NightMarketMap: React.FC<Props> = ({ selectedId, activeCategories, onSelectShop }) => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.svgWrap, { aspectRatio: 1 / ASPECT }]}>
        <Svg
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        >
          <Defs>
            <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFF3DA" />
              <Stop offset="1" stopColor="#F6E1B5" />
            </LinearGradient>
            <LinearGradient id="promoGlow" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFE886" />
              <Stop offset="1" stopColor="#FFB347" />
            </LinearGradient>
          </Defs>

          <Rect x={0} y={0} width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#bg)" />

          {/* streets */}
          {streets.map((street) => (
            <G key={street.id}>
              <Path d={street.d} fill={colors.mapStreet} stroke={colors.mapStreetEdge} strokeWidth={2} />
              {street.label && street.labelX != null && street.labelY != null && (
                <SvgText
                  x={street.labelX}
                  y={street.labelY}
                  fill="#A98548"
                  fontSize={28}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {street.label}
                </SvgText>
              )}
            </G>
          ))}

          {/* shops */}
          {shops.map((shop) => {
            const cat = categoryColors[shop.category];
            const isActive = selectedId === shop.id;
            const dimmed = activeCategories && !activeCategories.includes(shop.category);
            const fill = shop.isPromoting ? 'url(#promoGlow)' : cat.fill;
            const emojiCenterX = shop.x + 56;
            const emojiY = shop.y + shop.height / 2 + 16;
            const textStartX = shop.x + 110;
            const nameY = shop.y + shop.height / 2 - 4;
            const sigY = shop.y + shop.height / 2 + 32;

            return (
              <G
                key={shop.id}
                onPress={() => onSelectShop(shop)}
                opacity={dimmed ? 0.25 : 1}
              >
                {shop.isPromoting && (
                  <Rect
                    x={shop.x - 8}
                    y={shop.y - 8}
                    width={shop.width + 16}
                    height={shop.height + 16}
                    rx={18}
                    fill={colors.promoGlow}
                    opacity={0.35}
                  />
                )}
                <Rect
                  x={shop.x}
                  y={shop.y}
                  width={shop.width}
                  height={shop.height}
                  rx={14}
                  fill={fill}
                  stroke={isActive ? colors.primary : cat.stroke}
                  strokeWidth={isActive ? 5 : 2.5}
                />
                {/* big emoji on the left side of the tile, centered around its own x */}
                <SvgText
                  x={emojiCenterX}
                  y={emojiY}
                  fill="#5C3B14"
                  fontSize={56}
                  textAnchor="middle"
                >
                  {cat.emoji}
                </SvgText>
                {/* shop name, left-aligned to the right of the emoji */}
                <SvgText
                  x={textStartX}
                  y={nameY}
                  fill="#3D250A"
                  fontSize={26}
                  fontWeight="800"
                  textAnchor="start"
                >
                  {shop.name}
                </SvgText>
                {/* signature line — bolder & slightly larger so prices stay readable */}
                {shop.signature && (
                  <SvgText
                    x={textStartX}
                    y={sigY}
                    fill="#5C3B14"
                    fontSize={22}
                    fontWeight="700"
                    textAnchor="start"
                  >
                    {shop.signature}
                  </SvgText>
                )}
                {/* small promo flame in the top-right corner — non-overlapping */}
                {shop.isPromoting && (
                  <SvgText
                    x={shop.x + shop.width - 18}
                    y={shop.y + 30}
                    fontSize={26}
                    textAnchor="end"
                  >
                    🔥
                  </SvgText>
                )}
              </G>
            );
          })}

          {/* landmarks centered on the street */}
          {landmarks.map((lm) => (
            <G key={lm.id}>
              <Circle cx={lm.x} cy={lm.y} r={32} fill="#FFFFFF" stroke="#B98948" strokeWidth={3} />
              <SvgText x={lm.x} y={lm.y + 14} fontSize={36} textAnchor="middle">
                {landmarkEmoji[lm.type]}
              </SvgText>
              <SvgText
                x={lm.x}
                y={lm.y + 60}
                fill="#7A5530"
                fontSize={20}
                fontWeight="700"
                textAnchor="middle"
              >
                {lm.label}
              </SvgText>
            </G>
          ))}
        </Svg>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 0,
  },
  svgWrap: {
    width: '100%',
  },
});
