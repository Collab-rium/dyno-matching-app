import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PhotoUpload from "../../components/PhotoUpload";

/**
 * Photos upload screen
 * Fourth step in signup flow
 */
export default function PhotosScreen({ data, onDataChange }) {
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Permission to access photos is required to add profile pictures. You can enable it from system settings.",
            [{ text: "OK" }]
          );
        }
      }
    })();
  }, []);
  const handleAddPhoto = async () => {
    try {
      // Prevent adding beyond max
      if ((data.photos || []).length >= 6) {
        Alert.alert("Maximum photos", "You can add up to 6 photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [3, 4],
      });

      if (!result.cancelled) {
        const uri = result.uri;
        const newPhotos = [...(data.photos || []), uri];
        onDataChange({ photos: newPhotos });
      }
    } catch (err) {
      console.warn("ImagePicker error:", err);
      Alert.alert("Error", "Unable to pick image. Please try again.");
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    onDataChange({ photos: newPhotos });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>Add your photos</Text>
        <Text style={styles.subtitle}>
          Add at least 2 photos to continue. Your first photo will be your main
          profile picture.
        </Text>

        <PhotoUpload
          photos={data.photos || []}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
          maxPhotos={6}
        />

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Photo Tips</Text>
          <Text style={styles.tipText}>• Use clear, recent photos</Text>
          <Text style={styles.tipText}>
            • Show your face clearly in at least one photo
          </Text>
          <Text style={styles.tipText}>• Avoid group photos</Text>
          <Text style={styles.tipText}>
            • Include photos that show your interests
          </Text>
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
  tipsContainer: {
    backgroundColor: "#232526",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#414345",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5858",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: "#A3A3A3",
    marginBottom: 6,
  },
});
