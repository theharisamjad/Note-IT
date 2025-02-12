import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "../constants/colors";
import { verticalScale } from "react-native-size-matters";

type CustomTouchableInputProps = {
  label: string; // Text to display on the left
  onPress: () => void; // Function to call when the input is pressed
  iconName: string; // Icon name (from Material Community Icons)
  iconColor?: string; // Optional icon color
};

const CustomTouchableInput = ({
  label,
  onPress,
  iconName,
  iconColor = "#000",
}: CustomTouchableInputProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{label}</Text>
        <IconButton
          icon={iconName}
          iconColor={iconColor}
          size={24}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: verticalScale(10),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: colors.white,
  },
});

export default CustomTouchableInput;
