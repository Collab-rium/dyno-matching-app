import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextInput from "../../components/TextInput";

/**
 * About/Bio screen
 * Optional step in signup flow
 */
export default function AboutScreen({ data, onDataChange }) {
  const handleBioChange = (bio) => {
    onDataChange({ bio });
  };

  const remainingChars = 500 - (data.bio?.length || 0);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About you</Text>
        <Text style={styles.subtitle}>
          Write a short bio to tell people about yourself. What makes you
          unique?
        </Text>

        <TextInput
          value={data.bio || ""}
          onChangeText={handleBioChange}
          placeholder="Tell us about yourself..."
          multiline
          numberOfLines={6}
          maxLength={500}
        />

        <Text style={styles.charCount}>
          {remainingChars} characters remaining
        </Text>

        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Bio Examples:</Text>
          <Text style={styles.exampleText}>
            "Coffee enthusiast ☕ | Adventure seeker 🏔️ | Always up for trying
            new restaurants"
          </Text>
          <Text style={styles.exampleText}>
            "Software developer by day, chef by night. Looking for someone to
            share life's adventures with."
          </Text>
        </View>
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
    paddingTop: 60,
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
    marginBottom: 24,
    lineHeight: 24,
  },
  charCount: {
    fontSize: 13,
    color: "#666",
    textAlign: "right",
  },
  examplesContainer: {
    marginTop: 24,
    backgroundColor: "#232526",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#414345",
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF5858",
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 13,
    color: "#A3A3A3",
    marginBottom: 8,
    fontStyle: "italic",
  },
});
