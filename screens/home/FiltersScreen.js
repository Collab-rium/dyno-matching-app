import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import GradientBackground from "../../components/GradientBackground";

export default function FiltersScreen({ onBack, onApply }) {
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [distance, setDistance] = useState(25);
  const [showMe, setShowMe] = useState("everyone");

  const handleApply = () => {
    console.log("Applying filters:", { ageRange, distance, showMe });
    onApply?.({ ageRange, distance, showMe });
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>

      <View style={styles.content}>
        {/* Show Me */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Show Me</Text>
          <View style={styles.optionsContainer}>
            {["Women", "Men", "Everyone"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  showMe === option.toLowerCase() && styles.optionButtonActive,
                ]}
                onPress={() => setShowMe(option.toLowerCase())}>
                <Text
                  style={[
                    styles.optionText,
                    showMe === option.toLowerCase() && styles.optionTextActive,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Age Range */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Age Range</Text>
            <Text style={styles.valueText}>
              {ageRange[0]} - {ageRange[1]}
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={60}
              step={1}
              value={ageRange[0]}
              onValueChange={(value) => setAgeRange([value, ageRange[1]])}
              minimumTrackTintColor="#FF0008"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#FF0008"
            />
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={60}
              step={1}
              value={ageRange[1]}
              onValueChange={(value) => setAgeRange([ageRange[0], value])}
              minimumTrackTintColor="#F77502"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#F77502"
            />
          </View>
        </View>

        {/* Distance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Maximum Distance</Text>
            <Text style={styles.valueText}>{distance} km</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#FF0008"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FF0008"
          />
        </View>

        {/* Advanced Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced</Text>
          <TouchableOpacity style={styles.advancedOption}>
            <Text style={styles.advancedText}>Education Level</Text>
            <Text style={styles.advancedValue}>Any ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.advancedOption}>
            <Text style={styles.advancedText}>Height</Text>
            <Text style={styles.advancedValue}>Any ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.advancedOption}>
            <Text style={styles.advancedText}>Relationship Goals</Text>
            <Text style={styles.advancedValue}>Any ›</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetText}>Reset All Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
  },
  backIcon: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  applyButton: {},
  applyText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#333",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Nunito",
    color: "#FF0008",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionButtonActive: {
    backgroundColor: "#FF0008",
    borderColor: "#FF0008",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Nunito",
    color: "#666",
  },
  optionTextActive: {
    color: "#fff",
  },
  sliderContainer: {
    gap: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  advancedOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  advancedText: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#333",
  },
  advancedValue: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#999",
  },
  resetButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF0008",
  },
  resetText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#FF0008",
  },
});
