import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { LineChart } from "react-native-gifted-charts";
import { getYAxisLabelSuffix, getMaxValue } from "@/hooks/deviceFunctions";
import { useGenerateReading } from "@/hooks/useGenerateReading";

// Generate mock data for energy
const generateMockData1 = (timePeriod: string, dataType: string) => {
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
const generateMockData2 = (timePeriod: string, dataType: string) => {
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
const generateCompostData1 = (timePeriod: string, dataType: string) => {
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
const generateCompostData2 = (timePeriod: string, dataType: string) => {
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
  const [isDeviceEnergySelected, setDeviceEnergySelected] = useState(true);
  const [isDeviceCompostSelected, setDeviceCompostSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>("Day");
  const [chartDataSolar, setChartDataSolar] = useState<any[]>([]);
  const [chartDataTeg, setChartDataTeg] = useState<any[]>([]);
  const [chartDataCompost1, setChartDataCompost1] = useState<any[]>([]);
  const [chartDataCompost2, setChartDataCompost2] = useState<any[]>([]);
  const [selectedParameter, setSelectedParameter] = useState("voltage");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedReading, setSelectedReading] = useState<string | null>(
    "Battery"
  );
  const { generateReading } = useGenerateReading(selectedReading);
  const lengthChecker =
    chartDataSolar.length > 0 ||
    chartDataTeg.length > 0 ||
    (chartDataCompost1.length > 0 && chartDataCompost2.length > 0);

  console.log("Device:", isDeviceEnergySelected);
  console.log("Compost:", isDeviceCompostSelected);
  console.log("Time:", selectedTime);
  console.log("Parameter:", selectedParameter);
  console.log("reading", selectedReading);
  console.log("Solar length:", chartDataSolar.length > 0);
  console.log("TEG length:", chartDataTeg.length > 0);
  console.log("Compost length:", chartDataCompost1.length > 0);
  console.log("Compost length:", chartDataCompost2.length > 0);
  console.log("Loading?", isLoading);
  console.log("____________________________________________");

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
    setChartDataSolar([]);
    setChartDataTeg([]);
    setChartDataCompost1([]); // Ensure compost data is cleared before updating
    setChartDataCompost2([]); // Ensure compost data is cleared before updating
    setIsLoading(true);

    setTimeout(() => {
      setChartDataSolar((prev) =>
        isDeviceEnergySelected
          ? generateMockData1(time, selectedParameter)
          : prev
      );
      setChartDataTeg((prev) =>
        isDeviceEnergySelected
          ? generateMockData2(time, selectedParameter)
          : prev
      );
      setChartDataCompost1((prev) =>
        isDeviceCompostSelected
          ? generateCompostData1(time, selectedParameter)
          : prev
      );
      setChartDataCompost2((prev) =>
        isDeviceCompostSelected
          ? generateCompostData2(time, selectedParameter)
          : prev
      );
      setIsLoading(false);
    }, 300);
  };

  const handleParameterChange = (parameter: string) => {
    setSelectedParameter(parameter);
    setIsLoading(true);

    setTimeout(() => {
      setChartDataSolar((prev) =>
        isDeviceEnergySelected && selectedTime
          ? generateMockData1(selectedTime, parameter)
          : prev
      );
      setChartDataTeg((prev) =>
        isDeviceEnergySelected && selectedTime
          ? generateMockData2(selectedTime, parameter)
          : prev
      );
      setChartDataCompost1((prev) =>
        isDeviceCompostSelected && selectedTime
          ? generateCompostData1(selectedTime, parameter)
          : prev
      );
      setChartDataCompost2((prev) =>
        isDeviceCompostSelected && selectedTime
          ? generateCompostData2(selectedTime, parameter)
          : prev
      );
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (selectedTime) {
      if (isDeviceEnergySelected) {
        setChartDataSolar(generateMockData1(selectedTime, selectedParameter));
        setChartDataTeg(generateMockData2(selectedTime, selectedParameter));
      }
      if (isDeviceCompostSelected) {
        setChartDataCompost1(
          generateCompostData1(selectedTime, selectedParameter)
        );
        setChartDataCompost2(
          generateCompostData2(selectedTime, selectedParameter)
        );
      }
    }
  }, [
    selectedTime,
    selectedParameter,
    isDeviceCompostSelected,
    isDeviceEnergySelected,
  ]);

  const selectReading = (title: string) => {
    setSelectedReading(title);
  };

  return (
    <View className="flex-1">
      <HeaderSection
        headerText="Device"
        title="User"
        onPressToggle={() => console.log("Device")}
      />
      <ScrollView className="flex-1">
        <View className="w-full flex justify-center items-center">
          {/* Device Number */}
          <View className="w-[92.5%] py-3 flex-row border-b-2 flex justify-between items-center mt-4">
            <View className="flex flex-row gap-4">
              <MaterialIcons name="devices" size={24} color="black" />
              <Text>#97ABJ873223</Text>
            </View>
            <CustomButton onPress={() => console.log("HELP")} title="HELP" />
          </View>

          {/* Device Data Buttons */}
          <View>
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
                  disabled={
                    !(isDeviceEnergySelected || isDeviceCompostSelected)
                  }
                />
              ))}
            </View>
          </View>

          {/* Line Chart with Parameter Selection for Energy and Compost*/}
          <View className="w-full flex-col">
            {!isDeviceCompostSelected && !isDeviceEnergySelected && (
              <View className="w-full h-[350px] justify-center items-center">
                <Text className="font-semibold">Select A Parameter</Text>
              </View>
            )}

            {(isDeviceCompostSelected || isDeviceEnergySelected) && (
              <View className="py-8 ">
                {selectedTime && lengthChecker && !isLoading && (
                  <View>
                    <View className=""
                    >
                      <LineChart
                        data={isDeviceEnergySelected && !isDeviceCompostSelected ? chartDataSolar : chartDataCompost1}
                        data2={isDeviceEnergySelected && !isDeviceCompostSelected ? chartDataTeg : chartDataCompost2}
                        color="#07BAD1"
                        color2="orange"
                        noOfSections={5}
                        height={300}
                        thickness={2}
                        initialSpacing={0}
                        backgroundColor="transparent"
                        rulesType="solid"
                        rulesColor="gray"
                        isAnimated
                        animateOnDataChange
                        animationDuration={1000}
                        onDataChangeAnimationDuration={300}
                        areaChart
                        curved
                        rotateLabel
                        maxValue={getMaxValue(selectedParameter)}
                        xAxisLabelsHeight={50}
                        xAxisThickness={0}
                        xAxisLabelTextStyle={{color: "black", fontSize: 8,fontWeight: "bold",}}
                        yAxisLabelSuffix={getYAxisLabelSuffix(selectedParameter)}
                        yAxisTextStyle={{ color: "black", fontSize: 8 }}
                        yAxisThickness={0}
                        hideDataPoints
                        dataPointsColor1="blue"
                        dataPointsColor2="red"
                        startFillColor1="#8a56ce"
                        startFillColor2="#56acce"
                        endFillColor1="#8a56ce"
                        endFillColor2="#56acce"
                        startOpacity={0.8}
                        endOpacity={0.3}
                        focusEnabled
                        showTextOnFocus
                        pointerConfig={{
                          persistPointer: true,
                          activatePointersOnLongPress: true,
                          pointerStripUptoDataPoint: true,
                          pointerStripColor: "gray",
                          pointerStripWidth: 2,
                          strokeDashArray: [4, 5],
                          pointerColor: "black",
                          radius: 4,
                          pointerLabelWidth: 100,
                          pointerLabelHeight: 120,
                          
                          autoAdjustPointerLabelPosition: false,
                          pointerLabelComponent: (items: any) => {
                            return (
                              <View
                                style={{
                                  height: 90,
                                  width: 100,
                                  justifyContent: 'center',
                                  marginTop: -30,
                                  marginLeft: -40,
                                }}>
                                <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                                  {items[0].date}
                                </Text>
                
                                <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                                  <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                                    {'$' + items[0].value + '.0'}
                                  </Text>
                                </View>
                              </View>
                            );
                          },
                        }}
                      />
                    </View>
                    {/* Parameter Selection for Energy and Compost */}
                    {(isDeviceEnergySelected || isDeviceCompostSelected) && (
                      <View className="w-full justify-center items-center">
                        <View className="w-[72.5%] py-3 flex-row flex justify-between items-center">
                          {(isDeviceEnergySelected
                            ? ["voltage", "current", "wattage"]
                            : ["methane", "moisture", "temp"]
                          ).map((param) => (
                            <CustomButton
                              key={param}
                              onPress={() => handleParameterChange(param)}
                              title={
                                param.charAt(0).toUpperCase() + param.slice(1)
                              }
                              textStyles="text-[8px] font-bold"
                              containerStyles={`w-1/4 p-2 align-center border-[0.5px] ${
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
            )}
          </View>
          {isLoading && (
            <View className="w-full p-5 flex-col">
              <View className="w-full h-[330px] rounded-md justify-center items-center">
                <ActivityIndicator color={"#DE0F3F"} size={"small"} />
              </View>
            </View>
          )}
          {/* Reading for Power*/}
          <View className="w-full justify-center items-center">
            <View className="w-[92.5%] flex-row  justify-between items-center">
              <View className="flex-1 flex-row justify-between items-center">
                <CustomButton
                  onPress={(title) => {
                    if (title) {
                      selectReading(title);
                    } else {
                      return;
                    }
                  }}
                  title="Solar"
                  textStyles="text-[8px] font-bold"
                  containerStyles={`flex-1 p-2 align-center border-x-2 rounded-none`}
                />
                <CustomButton
                  onPress={(title) => {
                    if (title) {
                      selectReading(title);
                    } else {
                      return;
                    }
                  }}
                  title="TEG"
                  textStyles="text-[8px] font-bold"
                  containerStyles={`flex-1 p-2 align-center border-r-2 rounded-none`}
                />
                <CustomButton
                onPress={(title) => {
                  if (title) {
                    selectReading(title);
                  } else {
                    return;
                  }
                }}
                title="Battery Status"
                textStyles="text-[8px] font-bold"
                containerStyles={` p-2 align-center border-r-2 rounded-none`}
              />
                <CustomButton
                  onPress={(title) => {
                    if (title) {
                      selectReading(title);
                    } else {
                      return;
                    }
                  }}
                  title="Compost1"
                  textStyles="text-[8px] font-bold"
                  containerStyles={`flex-1 p-2 align-center border-r-2 rounded-none`}
                />
                <CustomButton
                  onPress={(title) => {
                    if (title) {
                      selectReading(title);
                    } else {
                      return;
                    }
                  }}
                  title="Compost2"
                  textStyles="text-[8px] font-bold"
                  containerStyles={`flex-1 p-2 align-center border-r-2 rounded-none`}
                />
              </View>
            </View>
            {/* Power and Compost Reading */}
            <View className="w-[92.5%] flex-col mt-2 border-2 rounded-md">
              <View className="flex-1 flex-row border-b-2  p-4">
                <MaterialIcons name="devices" size={24} color="black" />
                <Text className="text-center font-bold"> Total Generated:</Text>
                <View className="flex-row gap-2">
                  <Text> 20W</Text>
                </View>
              </View>
              {generateReading(selectedReading)}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Device;
