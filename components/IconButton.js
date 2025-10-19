import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./welcomeStyles";

// Generic icon button. Use children to pass icon/text.
export default function IconButton({ onPress, children, style }) {
  return (
    <TouchableOpacity style={[styles.closeButton, style]} onPress={onPress}>
      <Text style={styles.closeText}>{children}</Text>
    </TouchableOpacity>
  );
}
