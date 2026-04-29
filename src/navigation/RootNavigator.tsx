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
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { AdminEntryScreen } from '../screens/AdminEntryScreen';
import { AdminScannerScreen } from '../screens/AdminScannerScreen';
import { AdminScanResultScreen } from '../screens/AdminScanResultScreen';
import { AdminLogsScreen } from '../screens/AdminLogsScreen';
import { AdminStatsScreen } from '../screens/AdminStatsScreen';
import { colors } from '../theme';

export type TabParamList = {
  Map: undefined;
  Events: undefined;
  Tickets: undefined;
  Services: undefined;
};

export type AdminTabParamList = {
  Scanner: undefined;
  Logs: undefined;
  Stats: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  EventDetail: { eventId: string };
  TicketDetail: { ticketId: string };
  AdminEntry: undefined;
  AdminTabs: NavigatorScreenParams<AdminTabParamList> | undefined;
  AdminScanResult: { payload: string };
};

const Tab = createBottomTabNavigator<TabParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();
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

const AdminTabs = () => (
  <AdminTab.Navigator
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
      tabBarLabelStyle: { fontSize: 14, fontWeight: '700', marginTop: 2 },
      tabBarIcon: ({ color, size, focused }) => {
        const map: Record<keyof AdminTabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
          Scanner: ['scan-outline', 'scan'],
          Logs: ['receipt-outline', 'receipt'],
          Stats: ['stats-chart-outline', 'stats-chart'],
        };
        const [outline, filled] = map[route.name];
        return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
      },
    })}
  >
    <AdminTab.Screen name="Scanner" component={AdminScannerScreen} options={{ title: '掃碼' }} />
    <AdminTab.Screen name="Logs" component={AdminLogsScreen} options={{ title: '紀錄' }} />
    <AdminTab.Screen name="Stats" component={AdminStatsScreen} options={{ title: '統計' }} />
  </AdminTab.Navigator>
);

export const RootNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
    <Stack.Screen name="AdminEntry" component={AdminEntryScreen} options={{ animation: 'slide_from_bottom' }} />
    <Stack.Screen name="AdminTabs" component={AdminTabs} />
    <Stack.Screen name="AdminScanResult" component={AdminScanResultScreen} options={{ animation: 'slide_from_bottom' }} />
  </Stack.Navigator>
);
