import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import SignupFlow from "./signup-flow";

export default function App() {
  const handleComplete = (userData) => {
    console.log("Signup complete:", userData);
    // Placeholder: in a real app you'd send the data to backend or navigate
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SignupFlow onComplete={handleComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181A20" },
});
