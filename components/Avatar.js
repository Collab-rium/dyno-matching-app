import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

export default function Avatar({
  uri,
  size = 50,
  online = false,
  badge = null,
  style,
}) {
  const { theme } = useTheme();
  const { colors, gradients, typography } = theme;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { borderRadius: size / 2 }]}
        />
      ) : (
        <LinearGradient
          colors={gradients.primary.colors}
          style={[styles.placeholder, { borderRadius: size / 2 }]}>
          <Text
            style={[
              styles.placeholderText,
              { fontSize: size * 0.4, ...typography.h1, color: colors.white },
            ]}>
            ?
          </Text>
        </LinearGradient>
      )}

      {online && (
        <View
          style={[
            styles.onlineDot,
            {
              width: size * 0.25,
              height: size * 0.25,
              borderRadius: size * 0.125,
              borderWidth: size * 0.05,
              backgroundColor: colors.success,
              borderColor: colors.background,
            },
          ]}
        />
      )}

      {badge && (
        <View
          style={[
            styles.badge,
            {
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: size * 0.2,
              backgroundColor: colors.primary,
            },
          ]}>
          <Text
            style={[
              styles.badgeText,
              {
                fontSize: size * 0.25,
                ...typography.caption,
                color: colors.white,
              },
            ]}>
            {badge}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontWeight: "bold",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontWeight: "bold",
  },
});
