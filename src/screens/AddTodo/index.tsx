import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import CustomTouchableInput from "../../components/CustomTouchableInput";
import { Button } from "react-native-paper";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import CalendarModal from "../../components/CalendarModal";
import { useStore } from "../../store";
import { moderateScale, scale } from "react-native-size-matters";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

type AddScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const AddTodo: React.FC<AddScreenProps> = ({ navigation }) => {
  const { selectedTodo, addTodo, editTodo, setSelectedTodo } = useStore();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      selectedTodo &&
        selectedTodo.dateString &&
        setSelectedDate(selectedTodo.dateString);
    }
  }, []);

  // // Clear selected todo when the screen loses focus
  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       setSelectedTodo(null);
  //     };
  //   }, [])
  // );

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

  const clearStateItems = () => {
    setTitle("");
    setSelectedDate("");
    setDescription("");
  };

  const checkError = () => {
    // Reset errors
    setTitleError(false);
    setDescriptionError(false);

    // Validate fields
    if (!title.trim()) {
      setTitleError(true);
    }
    if (!description.trim()) {
      setDescriptionError(true);
    }
  };

  const addTodoToList = () => {
    checkError();

    if (title.trim() && description.trim()) {
      const todo = {
        id: Date.now(),
        title: title,
        description,
        dateString: selectedDate,
      };
      addTodo(todo);
      navigation.goBack();
      clearStateItems();
    }
  };

  const editTodoItem = () => {
    checkError();
    if (title.trim() && description.trim() && selectedTodo?.id) {
      const todo = {
        id: selectedTodo?.id,
        title: title,
        description,
      };
      editTodo(todo);
      navigation.popToTop();
      clearStateItems();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <CalendarModal
            isVisible={isModalVisible}
            onClose={closeModal}
            onDateSelect={handleDateSelect}
          />
          <CustomTextInput
            placeholder="Title"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setTitleError(false); // Clear error when user types
            }}
            error={titleError}
          />
          {titleError && (
            <Text style={styles.errorText}>Title is required</Text>
          )}
          <CustomTextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setDescriptionError(false); // Clear error when user types
            }}
            error={descriptionError}
            multiline
            style={{ height: height * 0.4 }}
          />
          {descriptionError && (
            <Text style={styles.errorText}>Description is required</Text>
          )}

          <CustomTouchableInput
            label={selectedDate ? selectedDate : "Deadline (Optional)"}
            onPress={openModal}
            iconName="calendar" // Icon on the right
            iconColor={colors.white}
            disabled={selectedTodo ? true : false}
          />

          <Button
            mode="contained"
            onPress={selectedTodo ? editTodoItem : addTodoToList}
            buttonColor={colors.white}
            textColor={colors.primaryColor}
            labelStyle={{ fontFamily: fonts.regular }}
            style={styles.button}
          >
            {selectedTodo ? "EDIT TODO" : "ADD TODO"}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    padding: scale(15),
  },
  button: {
    height: height * 0.05,
    width: width * 0.92,
    borderRadius: moderateScale(12),
    position: "absolute",
    bottom: scale(15),
    marginHorizontal: scale(15),
  },
  bottomSheetInnerContainer: {
    width: width * 0.92,
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
