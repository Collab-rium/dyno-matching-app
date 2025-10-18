import React from "react";
import { View, Text } from "react-native";
import styles from "./welcomeStyles";

export default function InfoBlock({ title, children }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleText}>{children}</Text>
    </View>
  );
}
