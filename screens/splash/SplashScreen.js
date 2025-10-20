import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../theme/ThemeContext";

export default function SplashScreen({ onFinish }) {
  const { gradients, typography, colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <LinearGradient
      colors={gradients.primary.colors}
      start={gradients.primary.start}
      end={gradients.primary.end}
      style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <Text style={styles.logo}>🔥</Text>
        <Text
          style={[
            styles.title,
            {
              ...typography.h1,
              color: colors.white,
              textShadowColor: "rgba(0,0,0,0.3)",
            },
          ]}>
          DYNO
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              ...typography.subtitle1,
              color: colors.white,
              opacity: 0.9,
            },
          ]}>
          Find Your Match
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 4,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    marginTop: 8,
  },
});
