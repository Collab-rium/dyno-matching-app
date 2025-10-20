import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ onBack, onSettings, onEdit }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with gradient */}
      <LinearGradient
        colors={["#FF0008", "#F77502"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.age}>28 years old</Text>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>
          Coffee enthusiast ☕ | Love hiking 🏔️ | Dog person 🐕 | Always up for
          adventures
        </Text>
      </View>

      {/* Photos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <View style={styles.photoGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Image
              key={i}
              source={{ uri: `https://i.pravatar.cc/150?img=${i}` }}
              style={styles.photo}
            />
          ))}
        </View>
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {["Travel", "Music", "Photography", "Yoga", "Cooking"].map(
            (interest) => (
              <View key={interest} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* Settings */}
      <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
        <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Nunito",
    opacity: 0.9,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  editButtonText: {
    color: "#FF0008",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins",
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Nunito",
    lineHeight: 24,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  photo: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interestChip: {
    backgroundColor: "#FFF5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FF0008",
  },
  interestText: {
    color: "#FF0008",
    fontSize: 14,
    fontFamily: "Nunito",
  },
  settingsButton: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  settingsButtonText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#333",
  },
});
