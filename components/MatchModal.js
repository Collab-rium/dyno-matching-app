import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";
import PrimaryButton from "./PrimaryButton";

const { width, height } = Dimensions.get("window");

export default function MatchModal({
  visible,
  onClose,
  onSendMessage,
  matchData,
}) {
  const { colors, gradients, typography, radii, spacing } = useTheme();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleValue.setValue(0);
      fadeValue.setValue(0);
    }
  }, [visible, scaleValue, fadeValue]);

  if (!matchData) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <LinearGradient
          colors={gradients.primary.colors}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeValue,
              transform: [{ scale: scaleValue }],
            },
          ]}>
          {/* Header */}
          <Text
            style={[styles.title, { ...typography.h1, color: colors.white }]}>
            It's a Match! 🎉
          </Text>
          <Text
            style={[
              styles.subtitle,
              { ...typography.subtitle1, color: colors.white, opacity: 0.9 },
            ]}>
            You and {matchData.name} liked each other!
          </Text>

          {/* Photos */}
          <View
            style={[
              styles.photosContainer,
              { gap: spacing.lg, marginBottom: spacing.xxl },
            ]}>
            <View style={styles.photoWrapper}>
              <Image
                source={{ uri: "https://i.pravatar.cc/300?img=12" }}
                style={[
                  styles.photo,
                  {
                    width: 130,
                    height: 130,
                    borderRadius: radii.full,
                    borderWidth: 5,
                    borderColor: colors.white,
                  },
                ]}
              />
              <View
                style={[
                  styles.heartBadge,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: radii.full,
                    backgroundColor: colors.white,
                    shadowColor: colors.text,
                  },
                ]}>
                <Text style={[styles.heartIcon, { color: colors.primary }]}>
                  ♥
                </Text>
              </View>
            </View>

            <View style={styles.photoWrapper}>
              <Image
                source={{
                  uri: matchData.image || "https://i.pravatar.cc/300?img=1",
                }}
                style={[
                  styles.photo,
                  {
                    width: 130,
                    height: 130,
                    borderRadius: radii.full,
                    borderWidth: 5,
                    borderColor: colors.white,
                  },
                ]}
              />
              <View
                style={[
                  styles.heartBadge,
                  {
                    width: 40,
                    height: 40,
                    borderRadius: radii.full,
                    backgroundColor: colors.white,
                    shadowColor: colors.text,
                  },
                ]}>
                <Text style={[styles.heartIcon, { color: colors.primary }]}>
                  ♥
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <PrimaryButton
            title="Send Message"
            onPress={onSendMessage}
            style={{
              width: width - 60,
              marginBottom: spacing.md,
              backgroundColor: colors.white,
            }}
            textStyle={{ color: colors.primary }}
          />

          <TouchableOpacity
            style={[styles.keepSwipingButton, { paddingVertical: spacing.md }]}
            onPress={onClose}>
            <Text
              style={[
                styles.keepSwipingText,
                { ...typography.button, color: colors.white },
              ]}>
              Keep Swiping
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  photosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  photoWrapper: {
    position: "relative",
  },
  photo: {},
  heartBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  heartIcon: {
    fontSize: 24,
  },
  keepSwipingButton: {},
  keepSwipingText: {
    textDecorationLine: "underline",
  },
});
