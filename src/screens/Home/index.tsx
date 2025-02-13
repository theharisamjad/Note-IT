import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FAB, TouchableRipple } from "react-native-paper";
import { verticalScale, moderateScale } from "react-native-size-matters";

import { margins, sizes } from "../../constants/sizes";
import { useStore } from "../../store";
import { colors } from "../../constants/colors";
import UnionImage from "../../assets/images/union.svg";
import Completed from "../../assets/images/check-square.svg";
import ActionModal from "../../components/ActionModal";
import FilterImage from "../../assets/images/filter.svg";
import DueImage from "../../assets/images/clock.svg";
import { fonts } from "../../constants/fonts";
import { Todo } from "../../types";

const { width, height } = Dimensions.get("window");

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    todos,
    selectedTodo,
    loadTodos,
    toggleTodo,
    deleteTodo,
    setSelectedTodo,
  } = useStore();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Load todos from AsyncStorage on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  const handleDelete = () => {
    if (selectedTodo && selectedTodo?.id) {
      deleteTodo(selectedTodo.id);
      Alert.alert("Task Deleted", "The task has been deleted.");
      closeModal();
    }
  };

  const handleComplete = () => {
    if (selectedTodo && selectedTodo?.id) {
      toggleTodo(selectedTodo.id);
      Alert.alert("Task Completed", "The task has been marked as complete.");
      closeModal();
    }
  };

  const TodoItem = (todo: Todo) => {
    return (
      <TouchableRipple
        style={styles.touchableContainer}
        onPress={() => {
          setSelectedTodo(todo);
          navigation.navigate("Details");
        }}
        onLongPress={() => {
          if (!todo.completed) {
            openModal();
            setSelectedTodo(todo);
          }
        }}
      >
        <View
          style={[
            styles.todoItemContainer,
            {
              backgroundColor: todo?.completed
                ? colors.seafoamGreen
                : colors.primaryColor,
            },
          ]}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.todoItemName}>{todo?.title}</Text>
            {!todo?.completed ? <DueImage /> : <Completed />}
          </View>
          <Text numberOfLines={2} style={styles.todoItemDescription}>
            {todo?.description}
          </Text>
          <Text
            style={styles.todoTextDate}
          >{`Created at ${todo?.dateString}`}</Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={styles.container}>
      <ActionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
      <View style={styles.padding15}>
        <View style={[styles.rowContainer, styles.rowBottomMargin]}>
          <View style={styles.rowOnly}>
            <UnionImage />
            <Text style={styles.listTodoHeading}>LIST OF TODO</Text>
          </View>
          {/* <FilterImage /> */}
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => <TodoItem {...item} />}
        />
      </View>
      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        rippleColor={"rgba(0, 0, 0, 0.1)"}
        onPress={() => {
          setSelectedTodo(null);
          navigation.navigate("Add");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  padding15: {
    padding: 15,
  },
  rowOnly: { flexDirection: "row" },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowBottomMargin: { marginBottom: moderateScale(10) },
  listTodoHeading: {
    fontSize: sizes.heading,
    fontFamily: fonts.bold,
    color: colors.secondaryColor,
    marginLeft: margins.margin10,
  },
  touchableContainer: {
    marginVertical: moderateScale(10),
  },
  todoItemContainer: {
    height: verticalScale(110),
    backgroundColor: colors.primaryColor,
    width: width * 0.92,
    padding: moderateScale(10),
    borderRadius: moderateScale(12),
  },
  todoTextDate: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: sizes.small,
  },
  todoItemName: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: sizes.large,
  },
  todoItemDescription: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: sizes.medium,
    height: verticalScale(45),
    marginVertical: moderateScale(10),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.secondaryColor,
    borderRadius: 28,
  },
});

export default Home;
