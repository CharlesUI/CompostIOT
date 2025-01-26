import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ActivityIndicator } from "react-native";
import CustomButton from "@/components/CustomButton";
import { LineChart } from "react-native-gifted-charts";

// Generate mock data for energy
const generateMockData = (timePeriod: string, dataType: string) => {
  let maxValue = 100; // Default maximum value for wattage
  if (dataType === "voltage") maxValue = 20;
  if (dataType === "current") maxValue = 5;

  const dataLength = timePeriod === "Day" ? 24 : timePeriod === "Week" ? 7 : 12;

  return Array.from({ length: dataLength }, (_, i) => ({
    label:
      timePeriod === "Day"
        ? `${i}:00`
        : timePeriod === "Week"
        ? `Day ${i + 1}`
        : `Month ${i + 1}`,
    value: parseFloat((Math.random() * maxValue).toFixed(2)), // Random value within range
    timeStamp: new Date(), // Mock timestamp
  }));
};

// Generate mock data for compost
const generateCompostData = (timePeriod: string, dataType: string) => {
  let maxValue = 100; // Default maximum value for temperature
  if (dataType === "methane") maxValue = 50;
  if (dataType === "moisture") maxValue = 80;

  const dataLength = timePeriod === "Day" ? 24 : timePeriod === "Week" ? 7 : 12;

  return Array.from({ length: dataLength }, (_, i) => ({
    label:
      timePeriod === "Day"
        ? `${i}:00`
        : timePeriod === "Week"
        ? `Day ${i + 1}`
        : `Month ${i + 1}`,
    value: parseFloat((Math.random() * maxValue).toFixed(2)), // Random value within range
    timeStamp: new Date(), // Mock timestamp
  }));
};

const Device = () => {
  const [isDeviceEnergySelected, setDeviceEnergySelected] = useState(false);
  const [isDeviceCompostSelected, setDeviceCompostSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>("Day");
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedParameter, setSelectedParameter] = useState("voltage");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("Device", isDeviceEnergySelected);
  console.log("Compost", isDeviceCompostSelected);
  console.log(selectedTime);
  console.log(selectedParameter);
  console.log(chartData);

  const handleDeviceEnergyClick = () => {
    if (isDeviceCompostSelected) {
      setDeviceCompostSelected(false);
      setSelectedTime("Day");
    }
    setDeviceEnergySelected(!isDeviceEnergySelected);
    setSelectedParameter("voltage"); // Default to voltage when energy is selected
  };

  const handleDeviceCompostClick = () => {
    if (isDeviceEnergySelected) {
      setDeviceEnergySelected(false);
      setSelectedTime("Day");
    }
    setDeviceCompostSelected(!isDeviceCompostSelected);
    setSelectedParameter("methane"); // Default to methane when compost is selected
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setChartData([]); // Clear current data to restart the chart
    setIsLoading(true);
    setTimeout(() => {
      if (isDeviceEnergySelected) {
        setChartData(generateMockData(time, selectedParameter));
      } else if (isDeviceCompostSelected) {
        setChartData(generateCompostData(time, selectedParameter));
      }
      setIsLoading(false);
    }, 300); // Add a small delay to allow the chart to clear first
  };

  const handleParameterChange = (parameter: string) => {
    setSelectedParameter(parameter);
    setIsLoading(true);
    if (isDeviceEnergySelected && selectedTime) {
      setChartData(generateMockData(selectedTime, parameter));
    } else if (isDeviceCompostSelected && selectedTime) {
      setChartData(generateCompostData(selectedTime, parameter));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedTime) {
      if (isDeviceEnergySelected) {
        setChartData(generateMockData(selectedTime, selectedParameter)); // Initial energy data load
      } else if (isDeviceCompostSelected) {
        setChartData(generateCompostData(selectedTime, selectedParameter)); // Initial compost data load
      }
    }
  }, [
    selectedTime,
    selectedParameter,
    isDeviceCompostSelected,
    isDeviceEnergySelected,
  ]);

  // Set dynamic chart labels and max value based on selected parameter
  const getYAxisLabelSuffix = () => {
    if (selectedParameter === "voltage") return "V";
    if (selectedParameter === "current") return "A";
    if (selectedParameter === "wattage") return "W";
    if (selectedParameter === "methane") return "ppm";
    if (selectedParameter === "moisture") return "%";
    if (selectedParameter === "temperature") return "°C";
    return ""; // Default case
  };

  const getMaxValue = () => {
    if (selectedParameter === "voltage") return 20;
    if (selectedParameter === "current") return 5;
    if (selectedParameter === "wattage") return 100;
    if (selectedParameter === "methane") return 50;
    if (selectedParameter === "moisture") return 80;
    if (selectedParameter === "temperature") return 100;
    return 100; // Default max value
  };

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

        {/* Line Chart with Parameter Selection for Energy and Compost*/}
        <View className="w-full p-5 flex-col">
          {selectedTime && chartData.length > 0 && !isLoading && (
            <View>
              <View>
                <Text className=" font-bold mb-4">Device Data:</Text>
                <LineChart
                  data={chartData}
                  isAnimated
                  thickness={3}
                  color="#07BAD1"
                  maxValue={getMaxValue()}
                  noOfSections={4}
                  xAxisLabelsHeight={50}
                  height={250}
                  yAxisLabelSuffix={getYAxisLabelSuffix()}
                  animateOnDataChange
                  animationDuration={1000}
                  onDataChangeAnimationDuration={300}
                  areaChart
                  curved
                  yAxisTextStyle={{ color: "black", fontSize: 8 }}
                  yAxisThickness={0}
                  xAxisThickness={0}
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
              {/* Parameter Selection for Energy and Compost */}
              {(isDeviceEnergySelected || isDeviceCompostSelected) && (
                <View className="w-full justify-center items-center">
                  <View className="w-[92.5%] py-3 flex-row flex justify-between items-center">
                    {(isDeviceEnergySelected
                      ? ["voltage", "current", "wattage"]
                      : ["methane", "moisture", "temp"]
                    ).map((param) => (
                      <CustomButton
                        key={param}
                        onPress={() => handleParameterChange(param)}
                        title={param.charAt(0).toUpperCase() + param.slice(1)}
                        textStyles="text-[6px] font-semibold"
                        containerStyles={`w-1/4 align-center border-[0.5px] ${
                          selectedParameter === param
                            ? "border-green-600 bg-green-100"
                            : "border-gray-400"
                        }`}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        {isLoading && <ActivityIndicator color={"#DE0F3F"} size={"large"} />}
      </View>
    </View>
  );
};

export default Device;
