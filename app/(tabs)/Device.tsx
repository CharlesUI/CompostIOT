import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import CustomButton from "@/components/CustomButton";
import { LineChart } from "react-native-gifted-charts";

// Generate mock data
const generateMockData = (timePeriod: string) => {
  switch (timePeriod) {
    case "Day":
      // Generate data for a single day (24 hours)
      return Array.from({ length: 24 }, (_, i) => ({
        label: `${i}:00`,
        value: Math.random() * 100, // Random watt value
      }));
    case "Week":
      // Generate data for a week (7 days)
      return Array.from({ length: 7 }, (_, i) => ({
        label: `Day ${i + 1}`,
        value: Math.random() * 100, // Random watt value
      }));
    case "Month":
      // Generate data for a month (12 months)
      return Array.from({ length: 12 }, (_, i) => ({
        label: `Month ${i + 1}`,
        value: Math.random() * 100, // Random watt value
      }));
    default:
      return [];
  }
};

const Device = () => {
  const [isDeviceEnergySelected, setDeviceEnergySelected] = useState(false);
  const [isDeviceCompostSelected, setDeviceCompostSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleDeviceEnergyClick = () => {
    if (isDeviceCompostSelected) {
      setDeviceCompostSelected(false);
    }
    setDeviceEnergySelected(!isDeviceEnergySelected);
  };

  const handleDeviceCompostClick = () => {
    if (isDeviceEnergySelected) {
      setDeviceEnergySelected(false);
    }
    setDeviceCompostSelected(!isDeviceCompostSelected);
  };

  const handleTimeClick = (time: string) => {
    if (isDeviceEnergySelected || isDeviceCompostSelected) {
      setSelectedTime(time);
      setChartData([]); // Clear current data to restart the chart
      setTimeout(() => {
        setChartData(generateMockData(time)); // Update chart data after clearing
      }, 300); // Add a small delay to allow the chart to clear first
    }
  };

  useEffect(() => {
    if (selectedTime) {
      setChartData(generateMockData(selectedTime)); // Initial chart data load
    }
  }, [selectedTime]);

  return (
    <View className="flex-1">
      <HeaderSection
        headerText="Device"
        title="User"
        onPressToggle={() => console.log("Device")}
      />
      <View className="w-full flex justify-center items-center">
        <View className="w-[92.5%] py-3 flex-row border-b-2 flex justify-between items-center mt-5">
          <View className="flex flex-row gap-4">
            <MaterialIcons name="devices" size={24} color="black" />
            <Text>#97ABJ873223</Text>
          </View>
          <CustomButton onPress={() => console.log("HELP")} title="HELP" />
        </View>

        {/* Device Data Buttons */}
        <View className="w-[92.5%] py-3 flex-row flex justify-between items-center mt-5 gap-2">
          <CustomButton
            onPress={handleDeviceEnergyClick}
            title="Energy Data"
            textStyles="text-[7px] font-bold"
            containerStyles={`w-[45%] p-2 align-center border-[0.5px] ${
              isDeviceEnergySelected
                ? "border-green-600 bg-green-100"
                : "border-gray-400"
            }`}
          />
          <CustomButton
            onPress={handleDeviceCompostClick}
            title="Compost Data"
            textStyles="text-[7px] font-bold"
            containerStyles={`w-[45%] p-2 align-center border-[0.5px] ${
              isDeviceCompostSelected
                ? "border-green-600 bg-green-100"
                : "border-gray-400"
            }`}
          />
        </View>

        {/* Time Period Buttons */}
        <View className="w-[92.5%] py-3 flex-row flex justify-between items-center">
          {["Day", "Week", "Month"].map((time) => (
            <CustomButton
              key={time}
              onPress={() => handleTimeClick(time)}
              title={time}
              textStyles="text-[6px] font-semibold"
              containerStyles={`w-1/4 align-center border-[0.5px] ${
                selectedTime === time
                  ? "border-green-600 bg-green-100"
                  : "border-gray-400"
              } ${
                !(isDeviceEnergySelected || isDeviceCompostSelected) &&
                "opacity-50"
              }`}
              disabled={!(isDeviceEnergySelected || isDeviceCompostSelected)}
            />
          ))}
        </View>
      </View>

      <View className="w-full p-5 flex-col">
        {selectedTime && chartData.length > 0 && (
          <View>
            <Text className=" font-bold mb-4">Device Data:</Text>
            <LineChart
              data={chartData}
              isAnimated
              thickness={3}
              color="#07BAD1"
              maxValue={100}
              noOfSections={4}
              xAxisLabelsHeight={50}
              height={250}
              yAxisLabelSuffix="W"
              animateOnDataChange
              animationDuration={1000}
              onDataChangeAnimationDuration={300}
              areaChart
              curved
              yAxisTextStyle={{ color: "black", fontSize: 8 }}
              yAxisThickness={0}
              xAxisThickness={2} // Increased thickness for the X-axis
              xAxisLabelTextStyle={{
                color: "black",
                fontSize: 8,
                fontWeight: "bold",
              }}
              rotateLabel
              hideDataPoints
              startFillColor={"rgb(84,219,234)"}
              endFillColor={"rgb(84,219,234)"}
              startOpacity={0.4}
              endOpacity={0.1}
              backgroundColor="transparent"
              rulesColor="gray"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Device;
