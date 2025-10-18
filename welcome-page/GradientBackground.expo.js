import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.wrapper]}
      pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityA }]}>
        <LinearGradient
          colors={["#FF0008", "#F77502"]}
          start={[0.14, 0]}
          end={[1, 1]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityB }]}>
        <LinearGradient
          colors={["#FF0008", "#F77502"]}
          start={[0, 0]}
          end={[1, 0]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({ wrapper: { zIndex: -1 } });
