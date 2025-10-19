import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSelectChips from "../../components/MultiSelectChips";

/**
 * Interests selection screen
 * Optional step in signup flow
 */
export default function InterestsScreen({ data, onDataChange }) {
  const interestOptions = [
    "Travel",
    "Cooking",
    "Reading",
    "Music",
    "Sports",
    "Fitness",
    "Art",
    "Photography",
    "Gaming",
    "Movies",
    "Dancing",
    "Yoga",
    "Technology",
    "Fashion",
    "Hiking",
    "Coffee",
    "Wine",
    "Pets",
    "Volunteering",
    "Meditation",
    "Writing",
    "Food",
    "Nature",
    "Beach",
  ];

  const handleSelectInterest = (interest) => {
    const currentInterests = data.interests || [];
    let newInterests;

    if (currentInterests.includes(interest)) {
      newInterests = currentInterests.filter((i) => i !== interest);
    } else {
      newInterests = [...currentInterests, interest];
    }

    onDataChange({ interests: newInterests });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your interests</Text>
        <Text style={styles.subtitle}>
          Let others know what you're passionate about. Select up to 5
          interests.
        </Text>

        <MultiSelectChips
          options={interestOptions}
          selected={data.interests || []}
          onSelect={handleSelectInterest}
          maxSelections={5}
        />

        <Text style={styles.hint}>
          You can always change these later in your profile settings.
        </Text>
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
    marginBottom: 24,
    lineHeight: 24,
  },
  hint: {
    fontSize: 13,
    color: "#666",
    marginTop: 16,
  },
});
