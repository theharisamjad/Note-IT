import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

// Optional: Configure calendar locale (e.g., for month/day names)
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

const CalendarModal = ({
  isVisible,
  onClose,
  onDateSelect,
}: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString); // Pass the selected date to the parent component
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close modal when tapping outside
      backdropOpacity={0.5} // Semi-transparent backdrop
      animationIn="fadeIn" // Animation when modal appears
      animationOut="fadeOut" // Animation when modal disappears
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Select a Date</Text>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: colors.primaryColor,
            selectedDayTextColor: "#ffffff",
            todayTextColor: colors.primaryColor,
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
          }}
          onDayPress={handleDayPress}
          minDate={new Date().toDateString()}
          markedDates={{
            [selectedDate || ""]: {
              selected: true,
              selectedColor: colors.primaryColor,
            },
          }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center", // Center the modal
    alignItems: "center", // Center the modal
    margin: 20, // Add some margin
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20, // Rounded corners
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
  calendar: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.4, // Set a fixed height for the calendar
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default CalendarModal;
