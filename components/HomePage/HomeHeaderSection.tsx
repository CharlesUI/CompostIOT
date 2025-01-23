import { View, Text } from "react-native";
import React from "react";

import { router } from "expo-router";
import HeaderSection from "../HeaderSection";

export const goToUserLog = () => {
  router.push("/(modal)/userLog");
};

const HomeHeaderSection = () => {
  return (
    <HeaderSection headerText="Compost IoT" title="Log In" onPressToggle={goToUserLog}/>
  );
};

export default HomeHeaderSection;
