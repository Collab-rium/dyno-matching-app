import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Progress bar component to show signup completion
 * @param {number} current - Current step (0-indexed)
 * @param {number} total - Total number of steps
 * @param {object} style - Additional styles for container
 */
export default function ProgressBar({ current, total, style }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {current + 1} of {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
  },
  progressBackground: {
    height: 4,
    backgroundColor: "#414345",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF5858",
    borderRadius: 2,
  },
  progressText: {
    color: "#A3A3A3",
    fontSize: 14,
    textAlign: "center",
  },
});
