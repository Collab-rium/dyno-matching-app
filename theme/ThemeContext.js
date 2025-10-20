import React, { createContext, useState, useContext, useMemo, useCallback } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./index";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const themeValue = useMemo(
    () => ({
      ...theme,
      toggleTheme,
      isDarkMode,
    }),
    [isDarkMode, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
