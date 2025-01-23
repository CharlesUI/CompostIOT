import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "@/components/CustomButton";
import React from "react";
import HeaderSection from "@/components/HeaderSection";

const Settings = () => {
  return (
    <View className="flex-1">
      <HeaderSection headerText="Settings" title="User" onPressToggle={() => console.log("Settings")} />
      <View className="flex-1 justify-center items-center">
        <Text>
          Nothing to see here yet...
        </Text>
      </View>
    </View>
  );
};

export default Settings;
