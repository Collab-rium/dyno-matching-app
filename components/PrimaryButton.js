import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

// Beautiful gradient button with rounded corners and custom font
export default function PrimaryButton({
  title = "Action",
  onPress,
  style,
  type = "primary",
}) {
  const { gradients, typography, colors, radii, spacing } = useTheme();
  const gradient = gradients[type] || gradients.primary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={[
          styles.button,
          {
            borderRadius: radii.full,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xl,
            shadowColor: colors.primary,
          },
        ]}>
        <Text
          style={[styles.text, { ...typography.button, color: colors.white }]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    letterSpacing: 1,
  },
});
