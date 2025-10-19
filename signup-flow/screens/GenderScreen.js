import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import SelectionButton from "../../components/SelectionButton";

/**
 * Gender selection screen
 * Third step in signup flow
 */
export default function GenderScreen({ data, onDataChange }) {
  const genderOptions = ["Woman", "Man", "Other"];
  const [showGender, setShowGender] = useState(data.showGender !== false);

  const handleGenderSelect = (gender) => {
    onDataChange({ gender });
  };

  const handleToggleShow = (value) => {
    setShowGender(value);
    onDataChange({ showGender: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your gender?</Text>

        <View style={styles.optionsContainer}>
          {genderOptions.map((option) => (
            <SelectionButton
              key={option}
              label={option}
              selected={data.gender === option}
              onPress={() => handleGenderSelect(option)}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={styles.toggleLabel}>Show my gender on my profile</Text>
            <Text style={styles.toggleHint}>
              Your gender will be visible to other users
            </Text>
          </View>
          <Switch
            value={showGender}
            onValueChange={handleToggleShow}
            trackColor={{ false: "#414345", true: "#FF585880" }}
            thumbColor={showGender ? "#FF5858" : "#666"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#232526",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#414345",
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  toggleHint: {
    fontSize: 13,
    color: "#A3A3A3",
  },
});
