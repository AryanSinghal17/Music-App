import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SongsScreen from "../screens/SongsScreen";
import ArtistScreen from "../screens/ArtistScreen";
import AlbumScreen from "../screens/AlbumScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#F68B2C" : "#999"}
            />
          ),
        }}
      />

      {/* SONGS */}
      <Tab.Screen
        name="Songs"
        component={SongsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "musical-notes" : "musical-notes-outline"}
              size={24}
              color={focused ? "#F68B2C" : "#999"}
            />
          ),
        }}
      />

      {/* ARTIST */}
      <Tab.Screen
        name="Artist"
        component={ArtistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#F68B2C" : "#999"}
            />
          ),
        }}
      />

      {/* ALBUM */}
      <Tab.Screen
        name="Album"
        component={AlbumScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="album"
              size={24}
              color={focused ? "#F68B2C" : "#999"}
            />
          ),
        }}
      />

      {/* SETTINGS */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={24}
              color={focused ? "#F68B2C" : "#999"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}