import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

export default function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  style,
}) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      rotation.setValue(gesture.dx / 10);
    },
    onPanResponderRelease: (event, gesture) => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (gesture.dx > SWIPE_THRESHOLD) {
        // Swipe right
        forceSwipe("right");
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        // Swipe left
        forceSwipe("left");
      } else if (gesture.dy < -SWIPE_THRESHOLD) {
        // Swipe up
        forceSwipe("up");
      } else {
        // Reset position
        resetPosition();
      }
    },
  });

  const forceSwipe = (direction) => {
    const x =
      direction === "right"
        ? width + 100
        : direction === "left"
        ? -width - 100
        : 0;
    const y = direction === "up" ? -height - 100 : 0;

    Animated.timing(position, {
      toValue: { x, y },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (direction === "right") onSwipeRight?.();
      else if (direction === "left") onSwipeLeft?.();
      else if (direction === "up") onSwipeUp?.();

      position.setValue({ x: 0, y: 0 });
      rotation.setValue(0);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();

    Animated.spring(rotation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotation.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  const animatedCardStyles = {
    transform: [...position.getTranslateTransform(), { rotate }, { scale }],
  };

  // Opacity for like/nope overlays
  const likeOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  const superLikeOpacity = position.y.interpolate({
    inputRange: [-height / 2, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[styles.card, style, animatedCardStyles]}
      {...panResponder.panHandlers}>
      {children}

      {/* Like Overlay */}
      <Animated.View
        style={[styles.overlay, styles.likeOverlay, { opacity: likeOpacity }]}>
        <View style={styles.likeLabel}>
          <Animated.Text style={styles.likeText}>LIKE</Animated.Text>
        </View>
      </Animated.View>

      {/* Nope Overlay */}
      <Animated.View
        style={[styles.overlay, styles.nopeOverlay, { opacity: nopeOpacity }]}>
        <View style={styles.nopeLabel}>
          <Animated.Text style={styles.nopeText}>NOPE</Animated.Text>
        </View>
      </Animated.View>

      {/* Super Like Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          styles.superLikeOverlay,
          { opacity: superLikeOpacity },
        ]}>
        <View style={styles.superLikeLabel}>
          <Animated.Text style={styles.superLikeText}>SUPER LIKE</Animated.Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  likeOverlay: {
    alignItems: "flex-start",
    padding: 40,
  },
  likeLabel: {
    borderWidth: 5,
    borderColor: "#4CAF50",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    transform: [{ rotate: "-20deg" }],
  },
  likeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4CAF50",
    fontFamily: "Poppins",
  },
  nopeOverlay: {
    alignItems: "flex-end",
    padding: 40,
  },
  nopeLabel: {
    borderWidth: 5,
    borderColor: "#FF0008",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    transform: [{ rotate: "20deg" }],
  },
  nopeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF0008",
    fontFamily: "Poppins",
  },
  superLikeOverlay: {
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  superLikeLabel: {
    borderWidth: 5,
    borderColor: "#4A90E2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  superLikeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A90E2",
    fontFamily: "Poppins",
  },
});
