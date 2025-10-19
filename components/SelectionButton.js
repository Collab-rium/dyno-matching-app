import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

/**
 * Selection button component for multiple choice options
 * @param {string} label - Button label
 * @param {boolean} selected - Whether button is selected
 * @param {function} onPress - Callback when pressed
 * @param {object} style - Additional styles
 */
export default function SelectionButton({ label, selected, onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#232526",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: "#414345",
    marginBottom: 12,
    alignItems: "center",
  },
  buttonSelected: {
    borderColor: "#FF5858",
    backgroundColor: "#FF585810",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  buttonTextSelected: {
    color: "#FF5858",
  },
});
