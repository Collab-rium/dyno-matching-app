import React from "react";
import { View, Text } from "react-native";
import GradientBackground from "../GradientBackground";
import styles from "./welcomeStyles";
import AppLogo from "./AppLogo";
import IconButton from "./IconButton";
import InfoBlock from "./InfoBlock";
import PrimaryButton from "./PrimaryButton";
import {
  handleClose,
  handleAgree,
  handleDateSafelyLink,
} from "./welcomeFunctions";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <GradientBackground />
      <IconButton onPress={() => handleClose(navigation)}>×</IconButton>
      <AppLogo />
      <Text style={styles.title}>Welcome to Tinder.</Text>
      <Text style={styles.subtitle}>Please follow these House Rules.</Text>
      <View style={styles.rulesContainer}>
        <InfoBlock title="Be yourself.">
          Make sure your photos, age, and bio are true to who you are.
        </InfoBlock>
        <InfoBlock title="Stay safe.">
          Don't be too quick to give out personal information.{" "}
          <Text style={styles.link} onPress={handleDateSafelyLink}>
            Date Safely
          </Text>
        </InfoBlock>
        <InfoBlock title="Play it cool.">
          Respect others and treat them as you would like to be treated.
        </InfoBlock>
        <InfoBlock title="Be proactive.">Always report bad behavior.</InfoBlock>
      </View>
      <PrimaryButton title="I Agree" onPress={() => handleAgree(navigation)} />
    </View>
  );
}
