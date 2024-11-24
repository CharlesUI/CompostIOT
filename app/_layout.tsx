import React from "react";
import { Slot } from "expo-router";
import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found"/>
    </Stack>
  );
};

export default RootLayout;
