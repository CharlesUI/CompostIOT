import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

interface DeviceProps {
  handleDeviceEnergyClick: () => void;
  handleDeviceCompostClick: () => void;
  isDeviceCompostSelected: boolean;
  isDeviceEnergySelected: boolean;
  handleTimeClick: (time: string) => void;
  selectedTime: string;
}

const DeviceInitialButtons = ({
  handleDeviceEnergyClick,
  handleDeviceCompostClick,
  isDeviceCompostSelected,
  isDeviceEnergySelected,
  handleTimeClick,
  selectedTime,
}: DeviceProps) => {
  return (
    <>
      {/* Device Data Buttons */}
      <View className="w-[72.5%] py-3 flex-row flex justify-between items-center mt-4 gap-2">
        <CustomButton
          onPress={handleDeviceEnergyClick}
          title="Energy Data"
          textStyles="text-[8px] font-bold"
          containerStyles={`w-[40%] p-2 align-center border-[0.5px] ${
            isDeviceEnergySelected
              ? "border-green-600 bg-green-100"
              : "border-gray-400"
          }`}
        />
        <CustomButton
          onPress={handleDeviceCompostClick}
          title="Compost Data"
          textStyles="text-[8px] font-bold"
          containerStyles={`w-[40%] p-2 align-center border-[0.5px] ${
            isDeviceCompostSelected
              ? "border-green-600 bg-green-100"
              : "border-gray-400"
          }`}
        />
      </View>

      {/* Time Period Buttons */}
      <View className="w-[72.5%] py-2 flex-row flex justify-between items-center">
        {["Day", "Week", "Month"].map((time) => (
          <CustomButton
            key={time}
            onPress={() => handleTimeClick(time)}
            title={time}
            textStyles="text-[8px] font-bold"
            containerStyles={`w-1/4 align-center p-2 border-[0.5px] ${
              selectedTime === time
                ? "border-green-600 bg-green-100"
                : "border-gray-400"
            } ${
              !(isDeviceEnergySelected || isDeviceCompostSelected) &&
              "opacity-50 border-green-[0] bg-transparent"
            }`}
            disabled={!(isDeviceEnergySelected || isDeviceCompostSelected)}
          />
        ))}
      </View>
    </>
  );
};

export default DeviceInitialButtons;
