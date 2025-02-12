import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailsScreen, Home, Add } from "../screens";
import HeaderHome from "../components/Header";
import { colors } from "../constants/colors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: colors.primaryColor, // Reset header text color
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            header: (props) => <HeaderHome {...props} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ title: "Add Note" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
