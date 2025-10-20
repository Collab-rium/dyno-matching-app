import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

export default function BottomNavigation({ currentScreen, onNavigate }) {
  const { colors, gradients, typography, spacing, radii } = useTheme();

  const tabs = [
    { id: "home", icon: "🔥", label: "Discover" },
    { id: "matches", icon: "💬", label: "Matches" },
    { id: "chatList", icon: "✉️", label: "Messages" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          shadowColor: colors.text,
        },
      ]}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onNavigate(tab.id)}
            activeOpacity={0.7}>
            {isActive ? (
              <LinearGradient
                colors={gradients.primary.colors}
                style={[
                  styles.activeTab,
                  {
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    borderRadius: radii.lg,
                  },
                ]}>
                <Text style={styles.activeIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.activeLabel,
                    { ...typography.caption, color: colors.white },
                  ]}>
                  {tab.label}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={[styles.inactiveTab, { paddingVertical: spacing.sm }]}>
                <Text style={styles.inactiveIcon}>{tab.icon}</Text>
                <Text
                  style={[
                    styles.inactiveLabel,
                    { ...typography.caption, color: colors.textSecondary },
                  ]}>
                  {tab.label}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },
  inactiveTab: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  inactiveIcon: {
    fontSize: 22,
    opacity: 0.5,
    marginBottom: 4,
  },
  activeLabel: {
    fontWeight: "600",
  },
  inactiveLabel: {
    fontWeight: "500",
  },
});
