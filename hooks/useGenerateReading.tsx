import { useState } from "react";
import { View, Text } from "react-native";

export const useGenerateReading = (selectedReading: string | null) => {

  const generateReading = (selectedReading: string | null) => {
    if (!selectedReading) return;

    switch (selectedReading) {
      case "Battery Status":
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">Battery Status </Text>
            <Text>60%</Text>
          </View>
        );
      case "Solar":
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">Solar Reading </Text>
            <Text>Voltage: 10V</Text>
            <Text>Current: 1.2A</Text>
            <Text>Wattage: 20W</Text>
          </View>
        );
      case "TEG":
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">TEG Reading </Text>
            <Text>Voltage: 10V</Text>
            <Text>Current: 1.2A</Text>
            <Text>Wattage: 20W</Text>
          </View>
        );
      case "Compost1":
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">Compost 1 Reading </Text>
            <Text>Temperature: 60C</Text>
            <Text>Moisture: 50%</Text>
            <Text>Methane: 220ppm</Text>
          </View>
        );
      case "Compost2":
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">Compost 2 Reading </Text>
            <Text>Temperature: 70C</Text>
            <Text>Moisture: 55%</Text>
            <Text>Methane: 250ppm</Text>
          </View>
        );
      default:
        return (
          <View className="flex-1 p-4">
            <Text className="mb-2 font-bold">Battery Status </Text>
            <Text>60%</Text>
          </View>
        );
    }
  };

  return { generateReading };
};
