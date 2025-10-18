import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './welcomeStyles';

export default function CloseButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.closeButton} onPress={onPress}>
      <Text style={styles.closeText}>×</Text>
    </TouchableOpacity>
  );
}