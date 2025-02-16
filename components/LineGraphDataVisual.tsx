import { View, Text, Animated, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import React from "react";
import CustomButton from "./CustomButton";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
} from "date-fns"; // Import date-fns functions

interface LineGraphProps {
  selectedTime: string | undefined;
  lengthChecker: boolean;
  isLoading: boolean;
  isDeviceCompostSelected: boolean;
  isDeviceEnergySelected: boolean;
  chartDataSolar: any[];
  chartDataTeg: any[];
  chartDataCompost1: any[];
  chartDataCompost2: any[];
  selectedParameter: string | undefined;
  getMaxValue: (selectedParameter: string) => 20 | 5 | 100 | 15 | 80;
  getYAxisLabelSuffix: (
    selectedParameter: string
  ) => "" | "V" | "A" | "W" | "ppm" | "%" | "°C";
  handleParameterChange: (parameter: string) => void;
}

const LineGraphDataVisual = ({
  selectedTime,
  lengthChecker,
  isLoading,
  isDeviceCompostSelected,
  isDeviceEnergySelected,
  chartDataSolar,
  chartDataTeg,
  chartDataCompost1,
  chartDataCompost2,
  selectedParameter,
  getMaxValue,
  getYAxisLabelSuffix,
  handleParameterChange,
}: LineGraphProps) => {
  const chartDateLabel = useMemo(() => {
    if (!selectedTime) return "";
    const today = new Date();
    let startDate: Date = today;
    let endDate: Date = today;
    let formatString = "MM/dd/yyyy";

    switch (selectedTime) {
      case "Day":
        startDate = startOfDay(today);
        endDate = endOfDay(today);
        formatString = "MM/dd/yyyy";
        return `Data as of ${format(today, formatString)}`;
      case "Week":
        startDate = startOfWeek(today);
        endDate = endOfWeek(today);
        formatString = "MM/dd/yyyy";
        return `Week of ${format(startDate, formatString)} - ${format(
          endDate,
          formatString
        )}`;
      case "Month":
        startDate = startOfMonth(today);
        endDate = endOfMonth(today);
        formatString = "MMMM yyyy"; // Changed format for month display
        return `Month of ${format(startDate, formatString)}`;
      default:
        return "";
    }
  }, [selectedTime]);

  const xAxisLabelHeight = useMemo(() => {
    return selectedTime === "Week" || selectedTime === "Month" ? 60 : 50; // Increased height for Week and Month
  }, [selectedTime]);

  const getReadingType = () => {
    if (isDeviceEnergySelected && !isDeviceCompostSelected) {
      return { data1Label: "Solar", data2Label: "TEG" };
    } else if (!isDeviceEnergySelected && isDeviceCompostSelected) {
      return { data1Label: "Compost 1", data2Label: "Compost 2" };
    } else {
      return { data1Label: "Data 1", data2Label: "Data 2" }; // Default or handle error
    }
  };

  const readingTypeLabels = useMemo(
    () => getReadingType(),
    [isDeviceEnergySelected, isDeviceCompostSelected]
  );

  const adjustedMaxValue = useMemo(() => {
    const baseMax = selectedParameter ? getMaxValue(selectedParameter) : 0;
    return baseMax; // Increase max value by 20% for top spacing
  }, [selectedParameter, getMaxValue]);

  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

  useEffect(() => {
    if (lengthChecker && !isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in to full opacity
        duration: 500, // Animation duration (milliseconds) - adjust as needed
        useNativeDriver: true, // For better performance
      }).start();
    } else {
      fadeAnim.setValue(0); // Optionally reset opacity if chart hides
    }
  }, [lengthChecker, isLoading, fadeAnim]);

  return (
    <View className="flex-1 ">
      <View className="pb-4 flex-1">
        {selectedTime && lengthChecker && !isLoading && (
          <View>
            <Text className="text-center font-bold text-md m-4">
              {chartDateLabel}
            </Text>
            <View className="h-[360px] min-h-[360px] overflow-hidden">
              {/* overflow-hidden to clip during fade */}
              <Animated.View style={{ opacity: fadeAnim }}>
                {/* Animated.View for fade */}
                {!isLoading && lengthChecker ? ( // Conditionally render LineChart when data is ready and not loading
                  <LineChart
                    data={
                      isDeviceEnergySelected && !isDeviceCompostSelected
                        ? chartDataSolar
                        : chartDataCompost1
                    }
                    data2={
                      isDeviceEnergySelected && !isDeviceCompostSelected
                        ? chartDataTeg
                        : chartDataCompost2
                    }
                    color="#07BAD1"
                    color2="orange"
                    noOfSections={5}
                    height={310}
                    showVerticalLines
                    thickness={2}
                    initialSpacing={0}
                    spacing={75}
                    backgroundColor="transparent"
                    rulesType="solid"
                    rulesColor="gray"
                    isAnimated
                    animateOnDataChange
                    animationDuration={1000}
                    onDataChangeAnimationDuration={3000}
                    areaChart
                    curved
                    maxValue={adjustedMaxValue}
                    xAxisLabelsHeight={40}
                    xAxisTextNumberOfLines={2}
                    scrollEventThrottle={16}
                    yAxisLabelWidth={30}
                    xAxisThickness={0}
                    xAxisLabelTextStyle={{
                      marginLeft: 25,
                      fontSize: 8,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 5,
                    }}
                    roundToDigits={0}
                    yAxisLabelSuffix={
                      selectedParameter &&
                      getYAxisLabelSuffix(selectedParameter)
                    }
                    yAxisTextStyle={{ fontSize: 8, fontWeight: "bold" }}
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
                      activatePointersOnLongPress: true,
                      pointerStripUptoDataPoint: true,
                      pointerStripColor: "gray",
                      pointerStripWidth: 2,
                      strokeDashArray: [4, 5],
                      pointerColor: "black",
                      radius: 4,
                      pointerLabelWidth: 90,
                      pointerLabelHeight: 1000,
                      autoAdjustPointerLabelPosition: false,
                      pointerLabelComponent: (items: any) => {
                        return (
                          <View
                            style={{
                              height: 90,
                              width: 120,
                              justifyContent: "center",
                              marginTop: -55,
                              marginLeft: -40,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: 12,
                                marginBottom: 3,
                                textAlign: "center",
                              }}
                            >
                              {format(items[0]?.timeStamp, "dd/MM HH:mm")}
                            </Text>

                            <View
                              style={{
                                paddingHorizontal: 12,
                                paddingVertical: 5,
                                borderRadius: 12,
                                backgroundColor: "white",
                                marginBottom: 2,
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  fontSize: 10,
                                  color: "#07BAD1",
                                }}
                              >
                                {readingTypeLabels.data1Label}:{" "}
                                {items[0]?.value?.toFixed(2)}{" "}
                                {getYAxisLabelSuffix(selectedParameter!)}
                              </Text>
                            </View>
                            {items[1] && (
                              <View
                                style={{
                                  paddingHorizontal: 12,
                                  paddingVertical: 5,
                                  borderRadius: 12,
                                  backgroundColor: "white",
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: 10,
                                    color: "orange",
                                  }}
                                >
                                  {readingTypeLabels.data2Label}:{" "}
                                  {items[1]?.value?.toFixed(2)}{" "}
                                  {getYAxisLabelSuffix(selectedParameter!)}
                                </Text>
                              </View>
                            )}
                          </View>
                        );
                      },
                    }}
                  />
                ) : (
                  isLoading && (
                    <View className="w-full h-[360px] min-h-[360px] rounded-md justify-center items-center">
                      <ActivityIndicator color={"#DE0F3F"} size={"small"} />
                    </View>
                  )
                )}
              </Animated.View>
            </View>

            {/* Parameter Selection for Energy and Compost */}
            {(isDeviceEnergySelected || isDeviceCompostSelected) && (
              <View className="w-full justify-center items-center ">
                <View className="w-[72.5%] pt-2 mt-4 flex-row flex justify-between items-center">
                  {(isDeviceEnergySelected
                    ? ["voltage", "current", "wattage"]
                    : ["methane", "moisture", "temperature"]
                  ).map((param) => (
                    <CustomButton
                      key={param}
                      onPress={() => handleParameterChange(param)}
                      title={param.charAt(0).toUpperCase() + param.slice(1)}
                      textStyles="text-[8px] font-bold"
                      containerStyles={`w-1/4 py-2 align-center border-[0.5px] ${
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
    </View>
  );
};

export default LineGraphDataVisual;
