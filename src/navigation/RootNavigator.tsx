import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import PlayerScreen from "../screens/PlayerScreen";
import ArtistScreen from "../screens/ArtistScreen";
import SearchScreen from "../screens/SearchScreen";
import AlbumDetailScreen from "../screens/AlbumDetailScreen";
import ArtistDetailScreen from "../screens/ArtistDetailScreen";

/* ---------- TYPES ---------- */
export type RootStackParamList = {
  Main: undefined;
  Player: undefined;
  Artist: { artist?: any } | undefined;
  Search: undefined;
  AlbumDetail: { album: any };
};

/* ---------- STACK ---------- */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Artist" component={ArtistScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />

    </Stack.Navigator>
  );
}