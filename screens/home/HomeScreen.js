import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwipeableCard from "../../components/SwipeableCard";
import ProfileCard from "../../components/ProfileCard";
import MatchModal from "../../components/MatchModal";
import { useTheme } from "../../theme/ThemeContext";

const { width, height } = Dimensions.get("window");

// Mock data for demo
const mockProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    bio: "Love hiking and coffee ☕🏔️",
    image: "https://i.pravatar.cc/400?img=1",
    location: "2 km away",
    interests: ["Travel", "Coffee", "Hiking"],
    online: true,
    verified: true,
  },
  {
    id: 2,
    name: "Emma",
    age: 25,
    bio: "Photographer | Travel enthusiast 📸",
    image: "https://i.pravatar.cc/400?img=5",
    location: "5 km away",
    interests: ["Photography", "Travel", "Art"],
    online: false,
    verified: true,
  },
  {
    id: 3,
    name: "Olivia",
    age: 27,
    bio: "Yoga teacher & dog mom 🧘‍♀️🐕",
    image: "https://i.pravatar.cc/400?img=9",
    location: "3 km away",
    interests: ["Yoga", "Dogs", "Wellness"],
    online: true,
    verified: false,
  },
  {
    id: 4,
    name: "Sophia",
    age: 26,
    bio: "Artist & music lover 🎨🎵",
    image: "https://i.pravatar.cc/400?img=10",
    location: "7 km away",
    interests: ["Art", "Music", "Dancing"],
    online: false,
    verified: true,
  },
];

export default function HomeScreen({
  onProfile,
  onMatches,
  onChat,
  onSettings,
}) {
  const { colors, gradients, typography, spacing, radii } = useTheme();
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);

  const handleLike = () => {
    const current = profiles[currentIndex];
    console.log("Liked:", current?.name);

    // Simulate match (20% chance)
    if (Math.random() > 0.8 && current) {
      setMatchedProfile(current);
      setShowMatchModal(true);
    }

    moveToNext();
  };

  const handlePass = () => {
    console.log("Passed:", profiles[currentIndex]?.name);
    moveToNext();
  };

  const handleSuperLike = () => {
    const current = profiles[currentIndex];
    console.log("Super Liked:", current?.name);

    // Super like has higher match chance (40%)
    if (Math.random() > 0.6 && current) {
      setMatchedProfile(current);
      setShowMatchModal(true);
    }

    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reset for demo
    }
  };

  const handleSendMessage = () => {
    setShowMatchModal(false);
    onChat?.();
  };

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text
          style={[styles.emptyText, { ...typography.h2, color: colors.text }]}>
          No more profiles
        </Text>
        <TouchableOpacity
          style={[
            styles.reloadButton,
            {
              backgroundColor: colors.primary,
              borderRadius: radii.full,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
            },
          ]}
          onPress={() => setCurrentIndex(0)}>
          <Text
            style={[
              styles.reloadText,
              { ...typography.button, color: colors.white },
            ]}>
            Reload
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={gradients.primary.colors}
        start={gradients.primary.start}
        end={gradients.primary.end}
        style={[
          styles.header,
          {
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.xxl,
            paddingBottom: spacing.md,
          },
        ]}>
        <Text style={[styles.logo, { ...typography.h2, color: colors.white }]}>
          🔥 DYNO
        </Text>
        <View style={[styles.headerIcons, { gap: spacing.md }]}>
          <TouchableOpacity onPress={onMatches}>
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSettings}>
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Card Stack */}
      <View style={[styles.cardContainer, { paddingHorizontal: spacing.sm }]}>
        {/* Background cards for depth */}
        {currentIndex + 1 < profiles.length && (
          <View style={[styles.card, styles.backCard2]}>
            <ProfileCard
              profile={profiles[currentIndex + 1]}
              style={styles.profileCard}
            />
          </View>
        )}

        {/* Current card with swipe */}
        <SwipeableCard
          onSwipeLeft={handlePass}
          onSwipeRight={handleLike}
          onSwipeUp={handleSuperLike}
          style={styles.card}>
          <ProfileCard profile={currentProfile} style={styles.profileCard} />
        </SwipeableCard>
      </View>

      {/* Actions */}
      <View
        style={[
          styles.actions,
          { paddingVertical: spacing.lg, gap: spacing.md },
        ]}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              borderWidth: 2,
              borderColor: colors.error,
              backgroundColor: colors.card,
              borderRadius: radii.full,
            },
          ]}
          onPress={handlePass}>
          <Text style={[styles.actionIcon, { color: colors.error }]}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.superLikeButton,
            {
              borderWidth: 2,
              borderColor: colors.info,
              backgroundColor: colors.card,
              borderRadius: radii.full,
              width: 50,
              height: 50,
            },
          ]}
          onPress={handleSuperLike}>
          <Text
            style={[
              styles.actionIcon,
              styles.superLikeIcon,
              { fontSize: 24, color: colors.info },
            ]}>
            ⭐
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.primary, borderRadius: radii.full },
          ]}
          onPress={handleLike}>
          <Text style={[styles.actionIcon, { color: colors.white }]}>♥</Text>
        </TouchableOpacity>
      </View>

      {/* Match Modal */}
      <MatchModal
        visible={showMatchModal}
        matchData={matchedProfile}
        onClose={() => setShowMatchModal(false)}
        onSendMessage={handleSendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    fontSize: 24,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width - 40,
    height: height * 0.6,
  },
  profileCard: {
    width: "100%",
    height: "100%",
  },
  backCard2: {
    position: "absolute",
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  superLikeButton: {},
  actionIcon: {
    fontSize: 30,
  },
  superLikeIcon: {},
  emptyText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
  },
  reloadButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  reloadText: {
    fontWeight: "bold",
  },
});
