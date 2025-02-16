import { useCameraPermissions } from "expo-camera";
import React from "react";
import HomeHeaderSection from "@/components/HomePage/HomeHeaderSection";
import { View, Text, Pressable, TextInput } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import AddedDevice from "@/components/AddedDevice";
import { goToUserLog } from "@/components/HomePage/HomeHeaderSection";

const HomePage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const router = useRouter(); // Initialize router

  const handleScanQRCode = () => {
      if (!isPermissionGranted) {
          requestPermission(); // Request permission if not granted
      } else {
          router.push('/scanner'); // Navigate to scanner if permission is granted
      }
  };

  return (
    <View className="flex-1">
      <HomeHeaderSection />
      <View className="flex-1 bg-gray-200">
        <View className="w-full flex-row justify-between p-3 mt-5">
          <Text className=" font-semibold p-1">Compost Monitoring Server</Text>
          <Pressable onPress={() => console.log("Go to HELP")}>
            <Text className=" font-light p-1">HELP</Text>
          </Pressable>
        </View>

        <View className=" w-full flex justify-center items-center">
          <View className="w-[92.5%] bg-white rounded-md mx-2">
            {/* First */}
            <View className=" p-5 border-b-2 border-gray-300">
              <Pressable className="w-full" onPress={goToUserLog}>
                <Text className=" text-justify">
                  Press here to sign in to your compost IoT account and see the
                  details regarding your compost bin energy harvesting and
                  monitoring system.
                </Text>
              </Pressable>
            </View>
            {/* Second */}
            <View className=" p-5  border-b-2 border-gray-300">
              <Pressable className=" mb-2">
                <Text>Enter Device Number:</Text>
              </Pressable>
              <View className="flex justify-around">
                <TextInput
                  placeholder="#0SDFESKDSDFSM"
                  placeholderTextColor="gray"
                  // value={text}
                  // onChangeText={setText}
                  className=" border-[0.5px] mb-2 rounded-md p-2"
                />
                <CustomButton
                  title="Add Device"
                  containerStyles="min-h-[45px] border-[1px] bg-black mb-2"
                  textStyles=" text-white"
                  onPress={() => console.log("Adding Device")}
                ></CustomButton>
              </View>
            </View>
            {/* Third */}
            <View className="p-5">
              <Pressable onPress={handleScanQRCode}>
                <Text>Scan QR Code</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <AddedDevice />
      </View>
    </View>
  );
};

export default HomePage;
