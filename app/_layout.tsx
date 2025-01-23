import React from "react";
import { Slot } from "expo-router";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/userLog"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
