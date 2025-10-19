import React from 'react';
import { Text } from 'react-native';
import styles from './welcomeStyles';

export default function RuleItem({ title, children }) {
  return (
    <>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleText}>{children}</Text>
    </>
  );
}