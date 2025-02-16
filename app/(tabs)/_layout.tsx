import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';


const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "lightgray", // Define the inactive tint color

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Device"
        options={{
          title: "Device",
          tabBarLabel: "Device",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="flower-tulip"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Manual"
        options={{
          title: "Manual",
          tabBarLabel: "Manual",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialCommunityIcons
                name="flower-tulip"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="settings" size={24} color={color} />
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
