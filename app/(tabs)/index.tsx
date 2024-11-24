import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomePage = () => {
  return (
    <View className="flex-1">
      <SafeAreaView className="flex flex-row h-22 bg-white justify-between items-center p-5">
        {/* Icon and Text aligned horizontally */}
        <View className="flex-row items-center">
          <MaterialIcons name="compost" size={40} color="black" />
          <Text className="ml-1 text-md font-extrabold">Compost IoT</Text>
          {/* Added margin for spacing */}
        </View>

        <View className="flex-1 items-end ">
          <CustomButton
            containerStyles="w-1/2 border-[0.5px] border-gray-400 min-h-[40px]"
            textStyles="text-[12px] font-light"
            title="Log In"
            onPress={() => console.log("logging in")}
          ></CustomButton>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomePage;
