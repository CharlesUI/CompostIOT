import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import AddedDevice from './AddedDevice'
import CustomButton from './CustomButton'

const HomeHeroSection = () => {
  return (
    <View className="flex-1 bg-gray-200">
        <View className="w-full flex-row justify-between p-3 mt-5">
          <Text className=" font-semibold p-1">Compost Monitoring Server</Text>
          <Pressable>
            <Text className=" font-light p-1">HELP</Text>
          </Pressable>
        </View>

        <View className=" w-full flex justify-center items-center">
          <View className="w-[92.5%] bg-white rounded-md mx-2">
            {/* First */}
            <View className=" p-5 border-b-2 border-gray-300">
              <Pressable className="w-full">
                <Text className=" text-justify">
                  Press here to sign in to your compost IoT account and see the
                  details regarding your compost bin energy harvesting and
                  monitoring system.
                </Text>
              </Pressable>
            </View>
            {/* Second */}
            <View className=" p-5 border-b-2 border-gray-300">
              <Pressable className="py-2 mb-2">
                <Text>Enter Device Number:</Text>
              </Pressable>
              <View className="">
                <TextInput
                  placeholder="#0SDFESKDSDFSM"
                  placeholderTextColor="gray"
                  // value={text}
                  // onChangeText={setText}
                  className=" border-[0.5px] mb-4 rounded-md p-2"
                />
                <CustomButton
                  title="Add Device"
                  textStyles=" text-white"
                  containerStyles=" border-2 bg-black min-h-[48px]"
                  onPress={() => console.log("Adding Device")}
                ></CustomButton>
              </View>
            </View>
            {/* Third */}
            <View className=" p-5">
              <Pressable onPress={() => console.log("Going to Scan QR")}>
                <Text>Scan QR Code</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <AddedDevice />
      </View>
  )
}

export default HomeHeroSection