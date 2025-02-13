import React, { useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useStore } from "../../store";
import { useFocusEffect } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { fonts } from "../../constants/fonts";
import { sizes } from "../../constants/sizes";

type DetailsScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const { setSelectedTodo, selectedTodo } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedTodo?.title}</Text>
      <Text style={styles.description}>{selectedTodo?.description}</Text>
      <Text
        style={styles.createdAt}
      >{`Created At ${selectedTodo?.dateString}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: scale(15),
  },
  title: {
    fontSize: sizes.heading,
    fontFamily: fonts.medium,
    marginBottom: scale(20),
  },
  description: {
    fontSize: sizes.large,
    fontFamily: fonts.extraLight,
    marginBottom: scale(20),
  },
  createdAt: {
    alignSelf: "center",
    position: "absolute",
    fontFamily: fonts.light,
    bottom: scale(15),
    marginHorizontal: scale(15),
  },
});

export default DetailsScreen;
