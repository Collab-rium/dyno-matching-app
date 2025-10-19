import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

/**
 * Photo upload component for profile pictures
 * @param {Array} photos - Array of photo URIs
 * @param {function} onAddPhoto - Callback when adding a photo
 * @param {function} onRemovePhoto - Callback when removing a photo (receives index)
 * @param {number} maxPhotos - Maximum number of photos allowed
 * @param {string} label - Label above photo grid
 * @param {object} style - Additional styles
 */
export default function PhotoUpload({
  photos = [],
  onAddPhoto,
  onRemovePhoto,
  maxPhotos = 6,
  label = "",
  style,
}) {
  const emptySlots = Math.max(0, maxPhotos - photos.length);

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemovePhoto(index)}>
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
              {index === 0 && (
                <View style={styles.mainBadge}>
                  <Text style={styles.mainBadgeText}>Main</Text>
                </View>
              )}
            </View>
          ))}
          {photos.length < maxPhotos && (
            <TouchableOpacity style={styles.addButton} onPress={onAddPhoto}>
              <Text style={styles.addButtonText}>+</Text>
              <Text style={styles.addButtonLabel}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Text style={styles.helperText}>
        {photos.length} of {maxPhotos} photos added
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: "row",
  },
  photoContainer: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#232526",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  mainBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#FF5858",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  mainBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    width: 120,
    height: 160,
    backgroundColor: "#232526",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#414345",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 40,
    color: "#666",
    marginBottom: 4,
  },
  addButtonLabel: {
    fontSize: 14,
    color: "#666",
  },
  helperText: {
    fontSize: 13,
    color: "#A3A3A3",
    marginTop: 12,
  },
});
