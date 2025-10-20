import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

// GradientBackground: wraps children in a seamless animated gradient
// Uses main colors and smooth transitions for a modern look
export default function GradientBackground({
  children,
  style,
  type = "primary",
}) {
  const { theme } = useTheme();
  const { gradients } = theme;
  const gradient = gradients[type] || gradients.primary;

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
});
