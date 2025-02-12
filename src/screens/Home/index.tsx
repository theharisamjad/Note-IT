import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Button, FAB, TextInput } from "react-native-paper";
import { verticalScale, moderateScale } from "react-native-size-matters";
import { margins, sizes } from "../../constants/sizes";
import { useStore } from "../../store";
import { colors } from "../../constants/colors";
import UnionImage from "../../assets/images/union.svg";
import FilterImage from "../../assets/images/filter.svg";
import DueImage from "../../assets/images/clock.svg";
import { fonts } from "../../constants/fonts";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomBottomSheet from "../../components/BottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomTextInput from "../../components/CustomTextInput";
import CalendarModal from "../../components/CalendarModal";
import CustomTouchableInput from "../../components/CustomTouchableInput";

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

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    closeModal(); // Close the modal after selecting a date
  };

  // Function to open the bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const [dummyList, setDummyList] = useState(listItems);
  const { todos, loadTodos, addTodo, toggleTodo, deleteTodo } = useStore();

  const TodoItem = (todo: any) => {
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
      <CalendarModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onDateSelect={handleDateSelect}
      />
      <View style={styles.padding15}>
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
      </View>
      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.white}
        rippleColor={"rgba(0, 0, 0, 0.1)"}
        onPress={openBottomSheet}
      />

      <CustomBottomSheet
        index={0}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: colors.primaryColor }}
        handleIndicatorStyle={{
          backgroundColor: colors.white,
          width: width * 0.2,
        }}
      >
        <View style={{ width: width * 0.92, flex: 1 }}>
          <CustomTextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <CustomTextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            style={{ height: height * 0.5 }}
          />

          <CustomTouchableInput
            label={selectedDate ? selectedDate : "Deadline (Optional)"}
            onPress={openModal}
            iconName="calendar" // Icon on the right
            iconColor={colors.white}
          />

          <Button
            mode="contained"
            onPress={() => setIsModalVisible(true)}
            buttonColor={colors.white}
            textColor={colors.primaryColor}
            labelStyle={{ fontFamily: fonts.regular }}
            style={styles.button}
          >
            ADD TODO
          </Button>
        </View>
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    backgroundColor: colors.secondaryColor,
    borderRadius: 28,
  },
  button: {
    height: height * 0.05,
    width: width * 0.92,
    borderRadius: moderateScale(12),
    position: "absolute",
    bottom: 0,
  },
});

export default Home;
