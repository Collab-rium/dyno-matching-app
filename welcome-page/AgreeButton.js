import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './welcomeStyles';

export default function AgreeButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.agreeButton} onPress={onPress}>
      <Text style={styles.agreeText}>I agree</Text>
    </TouchableOpacity>
  );
}