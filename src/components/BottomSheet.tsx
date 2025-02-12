import React, { forwardRef, useMemo } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";

// Define the props for the BottomSheetComponent
interface BottomSheetComponentProps extends Partial<BottomSheetProps> {
  children: React.ReactNode; // Content to render inside the bottom sheet
  snapPoints?: (string | number)[]; // Snap points for the bottom sheet
}

// Create the BottomSheetComponent using forwardRef
const BottomSheetComponent = forwardRef<BottomSheet, BottomSheetComponentProps>(
  ({ children, snapPoints = ["25%", "50%", "100%"], ...props }, ref) => {
    // Memoize snap points to avoid unnecessary re-renders
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <BottomSheet
        ref={ref}
        index={-1} // Start closed
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose // Allow closing by swiping down
        {...props} // Pass any additional props to the BottomSheet
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
    // width: "100%",
  },
});

export default BottomSheetComponent;
