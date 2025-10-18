import React from "react";
import { Image } from "react-native";
import styles from "./welcomeStyles";

export default function AppLogo({ source, style }) {
  const src = source || {
    uri: "https://cdn-icons-png.flaticon.com/512/2111/2111702.png",
  };
  return <Image source={src} style={[styles.logo, style]} />;
}
