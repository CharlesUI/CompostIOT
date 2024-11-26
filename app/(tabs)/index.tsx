import { View, Text } from "react-native";
import React from "react";
import HomeHeroSection from "@/components/HomePage/HomeHeroSection";
import HomeHeaderSection from "@/components/HomePage/HomeHeaderSection";

const HomePage = () => {
  return (
    <View className="flex-1">
      <HomeHeaderSection />
      <HomeHeroSection />
    </View>
  );
};

export default HomePage;
