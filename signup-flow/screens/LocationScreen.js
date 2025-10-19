import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";

/**
 * Location input screen
 * Gets user's location/city
 */
export default function LocationScreen({ data, onDataChange }) {
  const [manualEntry, setManualEntry] = useState(false);

  const handleUseCurrentLocation = () => {
    // In a real app, this would use geolocation API
    Alert.alert(
      "Location Access",
      "In a real app, this would request location permissions and get your current location",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Use Demo Location",
          onPress: () => {
            onDataChange({
              location: {
                city: "San Francisco",
                state: "CA",
                country: "USA",
                latitude: 37.7749,
                longitude: -122.4194,
              },
            });
          },
        },
      ]
    );
  };

  const handleCityChange = (city) => {
    onDataChange({
      location: {
        ...data.location,
        city,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Where are you?</Text>
        <Text style={styles.subtitle}>
          This helps us show you people nearby. Your exact location is never
          shared.
        </Text>

        {!manualEntry ? (
          <View>
            <PrimaryButton
              title="Use my current location"
              onPress={handleUseCurrentLocation}
              style={styles.locationButton}
            />
            <Text style={styles.link} onPress={() => setManualEntry(true)}>
              Or enter manually
            </Text>
          </View>
        ) : (
          <View>
            <TextInput
              value={data.location?.city || ""}
              onChangeText={handleCityChange}
              placeholder="Enter your city"
              label="City"
            />
            <Text style={styles.link} onPress={() => setManualEntry(false)}>
              Use current location instead
            </Text>
          </View>
        )}

        {data.location?.city && (
          <View style={styles.locationDisplay}>
            <Text style={styles.locationText}>
              📍 {data.location.city}
              {data.location.state ? `, ${data.location.state}` : ""}
            </Text>
          </View>
        )}
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
  locationButton: {
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: "#FF5858",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  locationDisplay: {
    backgroundColor: "#232526",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#FF5858",
  },
  locationText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
