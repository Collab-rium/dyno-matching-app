import React from "react";
import { SafeAreaView } from "react-native";
import WelcomeScreen from "../components/WelcomeScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WelcomeScreen navigation={{ goBack: () => {}, navigate: () => {} }} />
    </SafeAreaView>
  );
}
