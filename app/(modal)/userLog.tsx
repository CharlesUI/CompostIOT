import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppGradient from "@/components/AppGradient";
import Feather from '@expo/vector-icons/Feather';
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const userLog = () => {
  return (
    <SafeAreaView className="flex-1 relative">
      <View className="w-full bg-blue-300 flex-row p-5 justify-between items-center">
        <Text className=" font-extrabold text-2xl">ACCOUNT</Text>
        <Pressable
          onPress={() => router.back()}
          className=""
        >
          <Feather name="x" size={24} color="black" />
        </Pressable>
      </View>


      <View className="flex-1 bg-red-400 p-5">
        <View className="justify-center h-4/5">
          <Text className="text-center font-bold text-3xl text-white mb-8">
            HELLO
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default userLog;
