import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { sizes } from "../constants/sizes";
import { fonts } from "../constants/fonts";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectFilter: (filter: "All" | "Completed") => void;
}

const FilterModal = ({
  isVisible,
  onClose,
  onSelectFilter,
}: FilterModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => onSelectFilter("All")}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => onSelectFilter("Completed")}
            >
              <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterOption: {
    padding: 15,
  },
  filterText: {
    fontSize: sizes.medium,
    fontFamily: fonts.regular,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#F79E89",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FilterModal;
