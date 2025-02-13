import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DetailsScreen, Home, Add } from "../screens";
import HeaderHome from "../components/Header";
import { colors } from "../constants/colors";
import { Appbar } from "react-native-paper";
import { useStore } from "../store";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { selectedTodo, deleteTodo } = useStore();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: "", // Hide the title globally
          headerTintColor: colors.primaryColor, // Reset header text color
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: (props) => <HeaderHome {...props} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerTitle: "",
            header: ({ navigation, ...props }) => (
              <Appbar.Header style={{ backgroundColor: colors.primaryColor }}>
                <Appbar.BackAction
                  color={colors.white}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                <Appbar.Content title="" />
                <>
                  <Appbar.Action
                    color={colors.white}
                    icon="pencil"
                    onPress={() => navigation.navigate("Add")}
                  />
                  <Appbar.Action
                    color={colors.white}
                    icon="delete"
                    onPress={() => {
                      selectedTodo &&
                        selectedTodo?.id &&
                        deleteTodo(selectedTodo?.id);

                      navigation.goBack();
                    }}
                  />
                </>
              </Appbar.Header>
            ),
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            header: ({ navigation, ...props }) => (
              <Appbar.Header style={{ backgroundColor: colors.primaryColor }}>
                <Appbar.BackAction
                  color={colors.white}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                <Appbar.Content
                  color={colors.white}
                  title={selectedTodo ? `EDIT NOTE` : "ADD NOTE"}
                />
              </Appbar.Header>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
