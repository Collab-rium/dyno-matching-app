import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Multi-select chip component for interests, hobbies, etc.
 * @param {Array} options - Array of option strings
 * @param {Array} selected - Array of selected option strings
 * @param {function} onSelect - Callback when option is toggled (receives option string)
 * @param {string} label - Label above chips
 * @param {object} style - Additional styles
 * @param {number} maxSelections - Maximum number of selections allowed (optional)
 */
export default function MultiSelectChips({
  options = [],
  selected = [],
  onSelect,
  label = "",
  style,
  maxSelections,
}) {
  const handlePress = (option) => {
    if (selected.includes(option)) {
      onSelect(option); // Remove
    } else if (!maxSelections || selected.length < maxSelections) {
      onSelect(option); // Add
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.chipsContainer}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => handlePress(option)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {maxSelections && (
        <Text style={styles.helperText}>
          Select up to {maxSelections} ({selected.length}/{maxSelections})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  chip: {
    backgroundColor: "#232526",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 2,
    borderColor: "#414345",
  },
  chipSelected: {
    borderColor: "#FF5858",
    backgroundColor: "#FF585815",
  },
  chipText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FF5858",
  },
  helperText: {
    fontSize: 13,
    color: "#A3A3A3",
    marginTop: 8,
  },
});
