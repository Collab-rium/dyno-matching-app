// Centralized theme configuration consolidating design tokens for the DYNO app.
// Exports color palettes, typography, spacing, gradient helpers, and utilities
// for constructing light and dark themes consistently across the project.

export const themeModes = {
  LIGHT: "light",
  DARK: "dark",
};

export const baseColors = {
  primaryRed: "#FF0008",
  primaryOrange: "#F77502",
  midnight: "#0F172A",
  charcoal: "#181A20",
  slate: "#1F2937",
  grey050: "#F9FAFB",
  grey100: "#F5F5F5",
  grey200: "#E5E7EB",
  grey300: "#D1D5DB",
  grey500: "#6B7280",
  grey700: "#374151",
  offWhite: "#FAFAFA",
  white: "#FFFFFF",
  black: "#000000",
  success: "#22C55E",
  warning: "#F97316",
  info: "#3B82F6",
};

export const gradients = {
  primary: [baseColors.primaryRed, baseColors.primaryOrange],
  hero: ["#FF512F", "#DD2476"],
  soft: ["rgba(255,0,8,0.12)", "rgba(247,117,2,0.08)"],
  darkGlass: ["rgba(15,23,42,0.92)", "rgba(15,23,42,0.75)"],
};

export const fonts = {
  heading: "Poppins",
  body: "Nunito",
  mono: "Menlo",
};

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const elevations = {
  light: {
    shadowColor: "rgba(15,23,42,0.12)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
  dark: {
    shadowColor: "rgba(0,0,0,0.45)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 16,
  },
};

const lightColors = {
  mode: themeModes.LIGHT,
  background: baseColors.offWhite,
  surface: baseColors.white,
  surfaceMuted: baseColors.grey050,
  textPrimary: baseColors.midnight,
  textSecondary: baseColors.grey700,
  border: baseColors.grey200,
  separator: "#EEF2FF",
  accentPrimary: baseColors.primaryRed,
  accentSecondary: baseColors.primaryOrange,
  success: baseColors.success,
  warning: baseColors.warning,
  info: baseColors.info,
};

const darkColors = {
  mode: themeModes.DARK,
  background: baseColors.charcoal,
  surface: "#1C1F26",
  surfaceMuted: "#21242C",
  textPrimary: baseColors.white,
  textSecondary: "rgba(248,250,252,0.74)",
  border: "rgba(255,255,255,0.08)",
  separator: "rgba(255,255,255,0.06)",
  accentPrimary: baseColors.primaryRed,
  accentSecondary: baseColors.primaryOrange,
  success: "#4ADE80",
  warning: "#FB923C",
  info: "#60A5FA",
};

export const typography = {
  headingXL: {
    fontFamily: fonts.heading,
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  headingL: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headingM: {
    fontFamily: fonts.heading,
    fontSize: 22,
    fontWeight: "600",
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: "400",
  },
  bodySmall: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: "400",
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
};

export const createTheme = (mode = themeModes.LIGHT) => {
  const colors = mode === themeModes.DARK ? darkColors : lightColors;
  const elevation =
    mode === themeModes.DARK ? elevations.dark : elevations.light;

  return {
    mode,
    colors,
    fonts,
    spacing,
    radii,
    gradients,
    typography,
    elevation,
  };
};

export const lightTheme = createTheme(themeModes.LIGHT);
export const darkTheme = createTheme(themeModes.DARK);

export const createThemedStyles = (modeOrTheme, stylesFactory) => {
  const theme =
    typeof modeOrTheme === "string" ? createTheme(modeOrTheme) : modeOrTheme;
  return stylesFactory(theme);
};
