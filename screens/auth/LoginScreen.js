import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";
import { useTheme } from "../../theme/ThemeContext";
import ThemedTextInput from "../../components/TextInput";

export default function LoginScreen({ onLogin, onSignup }) {
  const { gradients, typography, colors, spacing, radii } = useTheme();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    <LinearGradient
      colors={gradients.primary.colors}
      start={gradients.primary.start}
      end={gradients.primary.end}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}>
        <View style={[styles.content, { padding: spacing.lg }]}>
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
            Welcome Back
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
            Log in to continue
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
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <ThemedTextInput
              label="Verification Code"
              placeholder="Enter 6-digit code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />

            <PrimaryButton
              title="Log In"
              onPress={() => onLogin && onLogin({ phone, code })}
              style={[styles.button, { marginTop: spacing.lg }]}
            />

            <TouchableOpacity onPress={onSignup}>
              <Text
                style={[
                  styles.link,
                  {
                    ...typography.body2,
                    color: colors.textSecondary,
                    marginTop: spacing.lg,
                  },
                ]}>
                Don't have an account?{" "}
                <Text style={{ fontWeight: "bold", color: colors.primary }}>
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
