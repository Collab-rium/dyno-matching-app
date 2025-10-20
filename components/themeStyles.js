import { StyleSheet } from "react-native";
import {
  createTheme,
  createThemedStyles,
  themeModes,
  lightTheme,
  darkTheme,
  gradients,
  spacing,
  radii,
  typography,
} from "../theme";

// Expose color palettes for backwards compatibility where direct color access is needed.
export const lightColors = lightTheme.colors;
export const darkColors = darkTheme.colors;

// Helper that accepts either a theme object or a theme mode string.
export const getThemeStyles = (themeOrMode = lightTheme) => {
  const theme =
    typeof themeOrMode === "string" ? createTheme(themeOrMode) : themeOrMode;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.lg,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: radii.lg,
      padding: spacing.xl,
      margin: spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: "90%",
      alignItems: "center",
      ...theme.elevation,
    },
    title: {
      ...typography.headingL,
      color: theme.colors.textPrimary,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      color: theme.colors.textSecondary,
      marginBottom: spacing.lg,
    },
    button: {
      backgroundColor: theme.colors.accentPrimary,
      borderRadius: radii.pill,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      marginTop: spacing.xl,
    },
    buttonText: {
      ...typography.headingM,
      color: theme.colors.surface,
      letterSpacing: 0.5,
    },
    link: {
      ...typography.bodySmall,
      color: theme.colors.accentSecondary,
      textDecorationLine: "underline",
      marginTop: spacing.sm,
    },
    gradientButton: {
      borderRadius: radii.pill,
      overflow: "hidden",
    },
    gradientColors: gradients.primary,
  });
};

// Re-export theme utilities so components can access them from a single import.
export {
  createTheme,
  createThemedStyles,
  themeModes,
  lightTheme,
  darkTheme,
  gradients,
  spacing,
  radii,
  typography,
};
