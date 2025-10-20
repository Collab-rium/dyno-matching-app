import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";
import { useTheme } from "../../theme/ThemeContext";

const onboardingData = [
  {
    id: 1,
    title: "Find Your Perfect Match",
    subtitle: "Connect with people who share your interests and values",
    emoji: "💝",
  },
  {
    id: 2,
    title: "Swipe & Match",
    subtitle: "Swipe right to like, left to pass. It's that simple!",
    emoji: "👆",
  },
  {
    id: 3,
    title: "Chat & Connect",
    subtitle: "Start meaningful conversations with your matches",
    emoji: "💬",
  },
];

export default function OnboardingScreen({ onGetStarted }) {
  const { gradients, typography, colors, spacing, radii } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (onGetStarted) onGetStarted();
    }
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <LinearGradient
      colors={gradients.primary.colors}
      start={gradients.primary.start}
      end={gradients.primary.end}
      style={styles.container}>
      <View style={[styles.content, { padding: spacing.lg }]}>
        <Text style={[styles.emoji, { marginBottom: spacing.xl }]}>
          {currentSlide.emoji}
        </Text>
        <Text
          style={[
            styles.title,
            { ...typography.h1, color: colors.white, marginBottom: spacing.md },
          ]}>
          {currentSlide.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { ...typography.body1, color: colors.white, opacity: 0.9 },
          ]}>
          {currentSlide.subtitle}
        </Text>

        <View
          style={[
            styles.pagination,
            { marginTop: spacing.xxl, marginBottom: spacing.xl },
          ]}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: radii.full,
                },
                index === currentIndex && {
                  backgroundColor: colors.white,
                  width: 30,
                },
              ]}
            />
          ))}
        </View>

        <PrimaryButton
          title={
            currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"
          }
          onPress={handleNext}
          style={[styles.button, { marginTop: spacing.lg }]}
        />

        <Text
          style={[
            styles.skip,
            {
              ...typography.button,
              color: colors.white,
              marginTop: spacing.lg,
              opacity: 0.8,
            },
          ]}
          onPress={onGetStarted}>
          Skip
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 120,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  pagination: {
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  button: {
    width: "100%",
  },
  skip: {
    fontSize: 16,
  },
});
