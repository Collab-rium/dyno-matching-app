import React from "react";
import { TextInput as RNTextInput, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

/**
 * Reusable text input component
 * @param {string} value - Current input value
 * @param {function} onChangeText - Callback when text changes
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Label above input
 * @param {string} error - Error message to display
 * @param {object} style - Additional styles for container
 * @param {object} inputStyle - Additional styles for input
 * @param {string} keyboardType - Keyboard type (default, numeric, email-address, etc.)
 * @param {number} maxLength - Maximum character length
 * @param {boolean} autoFocus - Whether to auto focus
 * @param {boolean} multiline - Whether input is multiline
 * @param {number} numberOfLines - Number of lines for multiline
 */
export default function TextInput({
  value,
  onChangeText,
  placeholder = "",
  label = "",
  error = "",
  style,
  inputStyle,
  keyboardType = "default",
  maxLength,
  autoFocus = false,
  multiline = false,
  numberOfLines = 1,
  ...rest
}) {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              ...typography.label,
              color: colors.text,
              marginBottom: spacing.sm,
            },
          ]}>
          {label}
        </Text>
      ) : null}
      <RNTextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderRadius: radii.md,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.md,
            fontSize: typography.body1.fontSize,
            color: colors.text,
            borderColor: colors.border,
          },
          multiline && styles.multilineInput,
          error && { borderColor: colors.error },
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        {...rest}
      />
      {error ? (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.error,
              fontSize: typography.caption.fontSize,
              marginTop: spacing.xs,
            },
          ]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
  },
  input: {
    borderWidth: 2,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputError: {},
  errorText: {},
});
