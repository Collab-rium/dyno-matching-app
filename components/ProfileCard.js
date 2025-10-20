import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

export default function ProfileCard({ profile, onPress, style }) {
  const { theme } = useTheme();
  const { colors, typography, spacing, radii } = theme;

  if (!profile) return null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderRadius: radii.lg,
          backgroundColor: colors.card,
          shadowColor: colors.text,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={{ uri: profile.image }} style={styles.image} />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={[styles.gradient, { padding: spacing.lg }]}>
        <View style={[styles.info, { gap: spacing.sm }]}>
          <View style={styles.nameContainer}>
            <Text
              style={[styles.name, { ...typography.h2, color: colors.white }]}>
              {profile.name}
            </Text>
            {profile.age && (
              <Text
                style={[styles.age, { ...typography.h2, color: colors.white }]}>
                , {profile.age}
              </Text>
            )}
            {profile.verified && (
              <Text
                style={[
                  styles.verified,
                  {
                    color: colors.primary,
                    backgroundColor: colors.white,
                    borderRadius: radii.full,
                    marginLeft: spacing.sm,
                  },
                ]}>
                ✓
              </Text>
            )}
          </View>

          {profile.location && (
            <Text
              style={[
                styles.location,
                { ...typography.body1, color: colors.white, opacity: 0.9 },
              ]}>
              📍 {profile.location}
            </Text>
          )}

          {profile.bio && (
            <Text
              style={[
                styles.bio,
                { ...typography.body2, color: colors.white, opacity: 0.9 },
              ]}
              numberOfLines={2}>
              {profile.bio}
            </Text>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <View
              style={[
                styles.interests,
                { gap: spacing.sm, marginTop: spacing.xs },
              ]}>
              {profile.interests.slice(0, 3).map((interest, index) => (
                <View
                  key={index}
                  style={[
                    styles.interestTag,
                    {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs,
                      borderRadius: radii.md,
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                  ]}>
                  <Text
                    style={[
                      styles.interestText,
                      { ...typography.caption, color: colors.white },
                    ]}>
                    {interest}
                  </Text>
                </View>
              ))}
              {profile.interests.length > 3 && (
                <View
                  style={[
                    styles.interestTag,
                    {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.xs,
                      borderRadius: radii.md,
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                  ]}>
                  <Text
                    style={[
                      styles.interestText,
                      { ...typography.caption, color: colors.white },
                    ]}>
                    +{profile.interests.length - 3}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </LinearGradient>

      {profile.online && (
        <View
          style={[
            styles.onlineBadge,
            {
              top: spacing.md,
              right: spacing.md,
              backgroundColor: colors.white,
              borderRadius: radii.full,
              padding: spacing.sm,
              shadowColor: colors.text,
            },
          ]}>
          <View
            style={[
              styles.onlineDot,
              {
                width: 12,
                height: 12,
                borderRadius: radii.full,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
  },
  info: {},
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  name: {
    fontWeight: "bold",
  },
  age: {
    fontWeight: "500",
  },
  verified: {
    fontSize: 20,
    width: 24,
    height: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  location: {
    opacity: 0.9,
  },
  bio: {
    opacity: 0.9,
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    borderWidth: 1,
  },
  interestText: {
    fontWeight: "600",
  },
  onlineBadge: {
    position: "absolute",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  onlineDot: {},
});
