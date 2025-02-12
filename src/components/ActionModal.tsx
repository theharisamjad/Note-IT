import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

interface ActionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const ActionModal = ({
  isVisible,
  onClose,
  onDelete,
  onComplete,
}: ActionModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close modal when tapping outside
      backdropOpacity={0.5} // Semi-transparent backdrop
      animationIn="slideInUp" // Animation when modal appears
      animationOut="slideOutDown" // Animation when modal disappears
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.optionButton} onPress={onComplete}>
          <Text style={styles.optionText}>Complete Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.optionText}>Delete Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end", // Align modal to the bottom
    margin: 0, // Remove default margin
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  optionButton: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 16,
    color: colors.primaryColor,
    fontFamily: fonts.regular,
  },
  deleteButton: {
    borderBottomWidth: 0, // Remove border for the last option
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
    fontFamily: fonts.regular,
  },
});

export default ActionModal;
