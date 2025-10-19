import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateInput from "../../components/DateInput";

/**
 * Birthday input screen
 * Second step in signup flow
 */
export default function BirthdayScreen({ data, onDataChange }) {
  const [error, setError] = useState("");

  // Calculate minimum date (18 years ago)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  // Calculate maximum date (100 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  const handleDateChange = (birthday) => {
    setError("");
    onDataChange({ birthday });
  };

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your b-day?</Text>
        <Text style={styles.subtitle}>
          Your profile shows your age, not your birth date.
        </Text>

        <DateInput
          value={data.birthday}
          onChange={handleDateChange}
          placeholder="MM / DD / YYYY"
          minimumDate={minDate}
          maximumDate={maxDate}
        />

        {data.birthday && (
          <Text style={styles.ageDisplay}>
            You'll appear as {calculateAge(data.birthday)} years old
          </Text>
        )}

        <Text style={styles.hint}>
          You must be at least 18 years old to use this app.
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
    justifyContent: "center",
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
  ageDisplay: {
    fontSize: 16,
    color: "#FF5858",
    fontWeight: "600",
    marginTop: 8,
  },
  hint: {
    fontSize: 13,
    color: "#666",
    marginTop: 16,
  },
});
