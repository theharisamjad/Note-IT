import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import TodoImage from "../assets/images/todo.svg";
import SettingsImage from "../assets/images/settings.svg";
import { verticalScale } from "react-native-size-matters";
import { StackNavigationProp } from "@react-navigation/stack";

interface HeaderHome {
  navigation: StackNavigationProp<any, any>;
}

const HeaderHome: React.FC<HeaderHome> = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TodoImage />
      <SettingsImage onPress={() => console.log("settings")} />
    </View>
  );
};
export default HeaderHome;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 15,
    marginTop: Platform.OS === "ios" ? null : verticalScale(20),
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.white,
  },
});
