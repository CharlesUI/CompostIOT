import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f",
      title: "Third Item",
    },
  ];

const AddedDevice = () => {
  return (
    // Added
    <View className="flex-1 p-5 bg-pink">
    <View className=" flex-row justify-between items-center mb-4">
      <Text>Recently Added</Text>
      <Pressable onPress={() => console.log("Clearing the devices")}>
        <Text>Clear</Text>
      </Pressable>
    </View>

    <FlatList
    // Add a listHeader to not make an error using scrollView
      ListHeaderComponent={
        <View className="border-b-2 border-gray-200">
        </View>
      }
      showsVerticalScrollIndicator={false}
      data={DATA}
      renderItem={({ item }) => {
        return (
          <View className="rounded-md mb-2 bg-white flex-row justify-between items-center p-5">
            <Text className="">{item.id}</Text>
            <Pressable onPress={() => console.log("Going to the Device")}>
              <AntDesign name="right" size={24} color="black" />
            </Pressable>
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  </View>
  )
}

export default AddedDevice