import React from "react";
import { TextInput as RNTextInput, View, Text, StyleSheet } from "react-native";

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
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <RNTextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#232526",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#414345",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF5858",
  },
  errorText: {
    color: "#FF5858",
    fontSize: 14,
    marginTop: 4,
  },
});
