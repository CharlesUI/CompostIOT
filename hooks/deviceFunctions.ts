// Set dynamic chart labels and max value based on selected parameter
export const getYAxisLabelSuffix = (selectedParameter: string) => {
  if (selectedParameter === "voltage") return "V";
  if (selectedParameter === "current") return "A";
  if (selectedParameter === "wattage") return "W";
  if (selectedParameter === "methane") return "ppm";
  if (selectedParameter === "moisture") return "%";
  if (selectedParameter === "temperature") return "°C";
  return ""; // Default case
};

export const getMaxValue = (selectedParameter: string) => {
  if (selectedParameter === "voltage") return 20;
  if (selectedParameter === "current") return 5;
  if (selectedParameter === "wattage") return 100;
  if (selectedParameter === "methane") return 50;
  if (selectedParameter === "moisture") return 80;
  if (selectedParameter === "temperature") return 100;
  return 100; // Default max value
};
