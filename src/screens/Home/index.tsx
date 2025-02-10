import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FAB } from "react-native-paper";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { margins, sizes } from "../../constants/sizes";
import { useStore } from "../../store";
import { colors } from "../../constants/colors";
import UnionImage from "../../assets/images/union.svg";
import FilterImage from "../../assets/images/filter.svg";
import DueImage from "../../assets/images/clock.svg";
import { fonts } from "../../constants/fonts";

const { width, height } = Dimensions.get("window");

const listItems = [
  {
    id: 1,
    name: "Design Logo",
    description: "Make logo for mini project",
    deadline: "Created at 1 Sept 2021",
    isOverdue: true,
  },
  {
    id: 2,
    name: "Make UI Design",
    description:
      "Make UI design for the mini project post figma link to the trello using skjnasknaskank naknskansk nak snakn skansk anskn skansk naksnaasjnaqjsnajns",
    deadline: "Created at 1 Sept 2021",
    isOverdue: false,
  },
];

const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [dummyList, setDummyList] = useState(listItems);
  const { todos, loadTodos, addTodo, toggleTodo, deleteTodo } = useStore();

  const TodoItem = (todo: any) => {
    console.log(todo);
    return (
      <View
        style={[
          styles.todoItemContainer,
          {
            backgroundColor: todo?.isOverdue
              ? colors.secondaryColor
              : colors.primaryColor,
          },
        ]}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.todoItemName}>{todo.name}</Text>
          {todo?.isOverdue ? <DueImage /> : null}
        </View>
        <Text numberOfLines={2} style={styles.todoItemDescription}>
          {todo?.description}
        </Text>
        <Text style={styles.todoTextDate}>{todo?.deadline}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.rowContainer, styles.rowBottomMargin]}>
        <View style={styles.rowOnly}>
          <UnionImage />
          <Text style={styles.listTodoHeading}>LIST OF TODO</Text>
        </View>
        <FilterImage />
      </View>
      <FlatList
        data={dummyList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TodoItem {...item} />}
      />

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        rippleColor={"rgba(0, 0, 0, 0.1)"}
        onPress={() => console.log("add")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.white,
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
  todoItemContainer: {
    height: verticalScale(110),
    backgroundColor: colors.primaryColor,
    width: width * 0.92,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
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
    fontFamily: fonts.extraLight,
    fontSize: sizes.medium,
    height: verticalScale(45),
    marginVertical: moderateScale(10),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryColor,
    borderRadius: 28,
  },
});

export default Home;
