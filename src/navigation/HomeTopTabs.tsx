import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ArtistScreen from "../screens/ArtistScreen";
import QueueScreen from "../screens/QueueScreen";

const Tab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff7a00",
        tabBarInactiveTintColor: "#888",

        tabBarScrollEnabled:false,
        tabBarItemStyle:{ flex:1 },

        tabBarLabelStyle:{
          textTransform:"none",
          fontWeight:"600",
          textAlign:"center"
        },

        tabBarIndicatorStyle:{
          backgroundColor:"#ff7a00",
          height:3,
          borderRadius:2,
        },

        tabBarStyle:{
          backgroundColor:"#fff",
          elevation:0,
          shadowOpacity:0,
        },
      }}
    >
      <Tab.Screen name="Suggested" component={HomeScreen} />
      <Tab.Screen name="Songs" component={QueueScreen} />
      <Tab.Screen name="Artists" component={ArtistScreen} />
      <Tab.Screen name="Albums" component={SearchScreen} />
    </Tab.Navigator>
  );
}