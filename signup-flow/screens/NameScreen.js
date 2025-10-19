import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextInput from "../../components/TextInput";

/**
 * Name input screen
 * First step in signup flow
 */
export default function NameScreen({ data, onDataChange }) {
  const [error, setError] = useState("");

  const handleNameChange = (name) => {
    setError("");
    onDataChange({ name });
  };

  const validateName = () => {
    if (!data.name || data.name.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return false;
    }
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your first name?</Text>
        <Text style={styles.subtitle}>
          This is how it'll appear on your profile and you can't change it
          later.
        </Text>

        <TextInput
          value={data.name || ""}
          onChangeText={handleNameChange}
          placeholder="Enter your name"
          maxLength={50}
          autoFocus
          error={error}
          onBlur={validateName}
        />

        <Text style={styles.hint}>
          Make sure it matches your ID for verification purposes.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 32,
    lineHeight: 24,
  },
  hint: {
    fontSize: 13,
    color: "#666",
    marginTop: 8,
  },
});
