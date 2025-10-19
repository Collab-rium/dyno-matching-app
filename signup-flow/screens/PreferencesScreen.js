import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SelectionButton from "../../components/SelectionButton";
import RangeSlider from "../../components/RangeSlider";

/**
 * Preferences screen
 * Set matching preferences
 */
export default function PreferencesScreen({ data, onDataChange }) {
  const [preferences, setPreferences] = useState(
    data.preferences || {
      lookingFor: "Woman",
      ageMin: 18,
      ageMax: 35,
      maxDistance: 50,
    }
  );

  const updatePreference = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onDataChange({ preferences: newPreferences });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>Your preferences</Text>
        <Text style={styles.subtitle}>
          Tell us who you'd like to meet. You can always change this later.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I'm looking for</Text>
          <SelectionButton
            label="Women"
            selected={preferences.lookingFor === "Woman"}
            onPress={() => updatePreference("lookingFor", "Woman")}
          />
          <SelectionButton
            label="Men"
            selected={preferences.lookingFor === "Man"}
            onPress={() => updatePreference("lookingFor", "Man")}
          />
          <SelectionButton
            label="Everyone"
            selected={preferences.lookingFor === "Everyone"}
            onPress={() => updatePreference("lookingFor", "Everyone")}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age range</Text>
          <RangeSlider
            value={preferences.ageMin}
            onValueChange={(value) => updatePreference("ageMin", value)}
            minimumValue={18}
            maximumValue={preferences.ageMax}
            step={1}
            label="Minimum age"
            unit="years"
          />
          <RangeSlider
            value={preferences.ageMax}
            onValueChange={(value) => updatePreference("ageMax", value)}
            minimumValue={preferences.ageMin}
            maximumValue={100}
            step={1}
            label="Maximum age"
            unit="years"
          />
        </View>

        <View style={styles.section}>
          <RangeSlider
            value={preferences.maxDistance}
            onValueChange={(value) => updatePreference("maxDistance", value)}
            minimumValue={1}
            maximumValue={200}
            step={1}
            label="Maximum distance"
            unit="km"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
});
