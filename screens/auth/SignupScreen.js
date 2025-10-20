import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";
import { useTheme } from "../../theme/ThemeContext";
import ThemedTextInput from "../../components/TextInput";

export default function SignupScreen({ onSignup, onLogin }) {
  const { theme } = useTheme();
  const { gradients, typography, colors, spacing, radii } = theme;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <LinearGradient
      colors={gradients.primary.colors}
      start={gradients.primary.start}
      end={gradients.primary.end}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View
            style={[
              styles.content,
              {
                padding: spacing.lg,
                paddingTop: spacing.xxl,
                paddingBottom: spacing.xl,
              },
            ]}>
            <Text style={[styles.logo, { marginBottom: spacing.md }]}>🔥</Text>
            <Text
              style={[
                styles.title,
                {
                  ...typography.h1,
                  color: colors.white,
                  marginBottom: spacing.sm,
                },
              ]}>
              Create Account
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  ...typography.subtitle1,
                  color: colors.white,
                  opacity: 0.9,
                  marginBottom: spacing.xl,
                },
              ]}>
              Join the community
            </Text>

            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderRadius: radii.xl,
                  padding: spacing.lg,
                  shadowColor: colors.text,
                },
              ]}>
              <ThemedTextInput
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />

              <ThemedTextInput
                label="Email"
                placeholder="john@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <ThemedTextInput
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <ThemedTextInput
                label="Birthday"
                placeholder="MM/DD/YYYY"
                value={birthday}
                onChangeText={setBirthday}
              />

              <PrimaryButton
                title="Sign Up"
                onPress={() =>
                  onSignup && onSignup({ name, email, phone, birthday })
                }
                style={[styles.button, { marginTop: spacing.lg }]}
              />

              <TouchableOpacity onPress={onLogin}>
                <Text
                  style={[
                    styles.link,
                    {
                      ...typography.body2,
                      color: colors.textSecondary,
                      marginTop: spacing.lg,
                    },
                  ]}>
                  Already have an account?{" "}
                  <Text style={{ fontWeight: "bold", color: colors.primary }}>
                    Log In
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 80,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    opacity: 0.9,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {},
  link: {
    textAlign: "center",
  },
});
