import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string; // Accept Tailwind class strings for text styling
  containerStyles?: string; // Accept Tailwind class strings for container styling
}

const CustomButton = ({
  onPress,
  title = '', // Default to empty string
  textStyles = '',
  containerStyles = '',
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
    >
      {title ? ( // Render Text only if `title` is valid
        <Text className={`text-black font-semibold text-lg ${textStyles}`}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

// Export with styled for nativewind integration
export default CustomButton;
