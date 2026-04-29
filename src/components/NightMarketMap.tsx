import React from 'react';
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

export const NightMarketMap: React.FC<Props> = ({ selectedId, activeCategories, onSelectShop }) => {
  return (
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
              fontSize={20}
              fontWeight="600"
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
        return (
          <G
            key={shop.id}
            onPress={() => onSelectShop(shop)}
            opacity={dimmed ? 0.25 : 1}
          >
            {shop.isPromoting && (
              <Rect
                x={shop.x - 6}
                y={shop.y - 6}
                width={shop.width + 12}
                height={shop.height + 12}
                rx={14}
                fill={colors.promoGlow}
                opacity={0.35}
              />
            )}
            <Rect
              x={shop.x}
              y={shop.y}
              width={shop.width}
              height={shop.height}
              rx={10}
              fill={fill}
              stroke={isActive ? colors.primary : cat.stroke}
              strokeWidth={isActive ? 4 : 2}
            />
            <SvgText
              x={shop.x + shop.width / 2}
              y={shop.y + shop.height / 2 - 6}
              fill="#5C3B14"
              fontSize={26}
              textAnchor="middle"
            >
              {cat.emoji}
            </SvgText>
            <SvgText
              x={shop.x + shop.width / 2}
              y={shop.y + shop.height / 2 + 24}
              fill="#3D250A"
              fontSize={16}
              fontWeight="600"
              textAnchor="middle"
            >
              {shop.name}
            </SvgText>
            {shop.isPromoting && (
              <G>
                <Rect
                  x={shop.x + shop.width - 50}
                  y={shop.y + 6}
                  width={44}
                  height={20}
                  rx={10}
                  fill={colors.primary}
                />
                <SvgText
                  x={shop.x + shop.width - 28}
                  y={shop.y + 20}
                  fill="#FFFFFF"
                  fontSize={12}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  優惠
                </SvgText>
              </G>
            )}
          </G>
        );
      })}

      {/* landmarks */}
      {landmarks.map((lm) => (
        <G key={lm.id}>
          <Circle cx={lm.x} cy={lm.y} r={20} fill="#FFFFFF" stroke="#B98948" strokeWidth={2} />
          <SvgText x={lm.x} y={lm.y + 8} fontSize={20} textAnchor="middle">
            {landmarkEmoji[lm.type]}
          </SvgText>
          <SvgText
            x={lm.x}
            y={lm.y + 38}
            fill="#7A5530"
            fontSize={12}
            fontWeight="600"
            textAnchor="middle"
          >
            {lm.label}
          </SvgText>
        </G>
      ))}
    </Svg>
  );
};
