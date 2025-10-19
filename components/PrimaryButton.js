import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./welcomeStyles";

// Reusable primary button. Props:
// - title: button text
// - onPress: handler
// - style: extra style
export default function PrimaryButton({ title = "Action", onPress, style }) {
  return (
    <TouchableOpacity style={[styles.agreeButton, style]} onPress={onPress}>
      <Text style={styles.agreeText}>{title}</Text>
    </TouchableOpacity>
  );
}
