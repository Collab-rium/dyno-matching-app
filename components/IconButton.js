import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

// Generic icon button.
export default function IconButton({
  onPress,
  children,
  style,
  size = 48,
  backgroundColor,
}) {
  const { colors, radii } = useTheme();

  const buttonStyles = {
    width: size,
    height: size,
    borderRadius: radii.full,
    backgroundColor: backgroundColor || colors.background,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, style]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
