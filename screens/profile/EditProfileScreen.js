import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import GradientBackground from "../../components/GradientBackground";

export default function EditProfileScreen({ onBack, onSave }) {
  const [name, setName] = useState("Alex Johnson");
  const [bio, setBio] = useState("Adventure seeker | Coffee addict ☕");
  const [age, setAge] = useState("28");
  const [location, setLocation] = useState("New York, NY");

  const handleSave = () => {
    console.log("Saving profile...");
    onSave?.({ name, bio, age, location });
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>

      <ScrollView style={styles.content}>
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300?img=12" }}
            style={styles.profilePhoto}
          />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="City, State"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Photo Grid */}
          <View style={styles.field}>
            <Text style={styles.label}>Photos</Text>
            <View style={styles.photoGrid}>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <TouchableOpacity key={index} style={styles.photoSlot}>
                  {index <= 3 ? (
                    <Image
                      source={{
                        uri: `https://i.pravatar.cc/200?img=${index + 10}`,
                      }}
                      style={styles.photoImage}
                    />
                  ) : (
                    <Text style={styles.addPhotoIcon}>+</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.field}>
            <Text style={styles.label}>Interests</Text>
            <View style={styles.interestsContainer}>
              {[
                "Travel",
                "Fitness",
                "Music",
                "Coffee",
                "Photography",
                "Cooking",
              ].map((interest) => (
                <TouchableOpacity key={interest} style={styles.interestChip}>
                  <Text style={styles.interestText}>{interest}</Text>
                  <Text style={styles.removeInterest}>×</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addInterestChip}>
                <Text style={styles.addInterestText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  saveButton: {},
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  changePhotoButton: {
    marginTop: 16,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#FF0008",
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#333",
    borderWidth: 1,
    borderColor: "#eee",
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  photoSlot: {
    width: "31%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  addPhotoIcon: {
    fontSize: 32,
    color: "#ccc",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0008",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  interestText: {
    fontSize: 14,
    fontFamily: "Nunito",
    color: "#fff",
  },
  removeInterest: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  addInterestChip: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#FF0008",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addInterestText: {
    fontSize: 14,
    fontFamily: "Nunito",
    color: "#FF0008",
    fontWeight: "600",
  },
});
