import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

/**
 * Range slider component for age, distance, etc.
 * @param {number} value - Current slider value
 * @param {function} onValueChange - Callback when value changes
 * @param {number} minimumValue - Minimum value
 * @param {number} maximumValue - Maximum value
 * @param {number} step - Step increment
 * @param {string} label - Label above slider
 * @param {string} unit - Unit to display (e.g., 'km', 'years')
 * @param {object} style - Additional styles
 */
export default function RangeSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  label = "",
  unit = "",
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <Text style={styles.value}>
          {value}
          {unit ? ` ${unit}` : ""}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#FF5858"
        maximumTrackTintColor="#414345"
        thumbTintColor="#FF5858"
      />
      <View style={styles.range}>
        <Text style={styles.rangeText}>
          {minimumValue}
          {unit ? ` ${unit}` : ""}
        </Text>
        <Text style={styles.rangeText}>
          {maximumValue}
          {unit ? ` ${unit}` : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF5858",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  range: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeText: {
    fontSize: 12,
    color: "#A3A3A3",
  },
});
