import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
// You'll need react-native-linear-gradient installed for this component to render gradients.
// Install with: npm install react-native-linear-gradient
// For Expo managed workflow: expo install react-native-linear-gradient
import LinearGradient from "react-native-linear-gradient";

export default function GradientBackground({ duration = 6000, style }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, useNativeDriver: true }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [anim, duration]);

  const opacityA = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const opacityB = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Two gradients with slightly different directions to create a smooth morph effect
  return (
    <View
      style={[StyleSheet.absoluteFill, styles.wrapper]}
      pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityA }]}>
        <LinearGradient
          colors={["#FF0008", "#F77502"]}
          start={{ x: 0.14, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityB }]}>
        <LinearGradient
          colors={["#FF0008", "#F77502"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: -1,
  },
});
