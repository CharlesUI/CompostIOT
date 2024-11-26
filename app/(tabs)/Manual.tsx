import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import React from "react";

const Manual = () => {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <SafeAreaView className="flex flex-row h-22 bg-white justify-between items-center p-5">
          {/* Icon and Text aligned horizontally */}
          <View className="flex-row items-center">
            <MaterialIcons name="compost" size={40} color="black" />
            <Text className="ml-1 text-md font-extrabold">Compost Manual</Text>
            {/* Added margin for spacing */}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Manual;
