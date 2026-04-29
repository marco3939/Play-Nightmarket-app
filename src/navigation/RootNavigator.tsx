import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MapScreen } from '../screens/MapScreen';
import { EventsScreen } from '../screens/EventsScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import { TicketsScreen } from '../screens/TicketsScreen';
import { TicketDetailScreen } from '../screens/TicketDetailScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { colors } from '../theme';

export type TabParamList = {
  Map: undefined;
  Events: undefined;
  Tickets: undefined;
  Services: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  EventDetail: { eventId: string };
  TicketDetail: { ticketId: string };
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
        height: Platform.OS === 'ios' ? 96 : 76,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 12,
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 2,
      },
      tabBarIconStyle: {
        marginBottom: 2,
      },
      tabBarIcon: ({ color, size, focused }) => {
        const map: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
          Map: ['map-outline', 'map'],
          Events: ['flame-outline', 'flame'],
          Tickets: ['ticket-outline', 'ticket'],
          Services: ['help-circle-outline', 'help-circle'],
        };
        const [outline, filled] = map[route.name];
        return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Map" component={MapScreen} options={{ title: '地圖' }} />
    <Tab.Screen name="Events" component={EventsScreen} options={{ title: '活動' }} />
    <Tab.Screen name="Tickets" component={TicketsScreen} options={{ title: '我的票券' }} />
    <Tab.Screen name="Services" component={ServicesScreen} options={{ title: '服務' }} />
  </Tab.Navigator>
);

export const RootNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
  </Stack.Navigator>
);
