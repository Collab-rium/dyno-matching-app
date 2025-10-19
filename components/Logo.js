import React from 'react';
import { Image } from 'react-native';
import styles from './welcomeStyles';

export default function Logo() {
  return (
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111702.png' }}
      style={styles.logo}
    />
  );
}