import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import styles from './welcomeStyles';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Tinder Logo */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111702.png' }} // Use your own asset if needed
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Welcome to Tinder.</Text>
      <Text style={styles.subtitle}>Please follow these House Rules.</Text>

      {/* Rules */}
      <View style={styles.rulesContainer}>
        <Text style={styles.ruleTitle}>Be yourself.</Text>
        <Text style={styles.ruleText}>Make sure your photos, age, and bio are true to who you are.</Text>

        <Text style={styles.ruleTitle}>Stay safe.</Text>
        <Text style={styles.ruleText}>
          Don't be too quick to give out personal information.{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.gotinder.com/safety')}>
            Date Safely
          </Text>
        </Text>

        <Text style={styles.ruleTitle}>Play it cool.</Text>
        <Text style={styles.ruleText}>Respect others and treat them as you would like to be treated.</Text>

        <Text style={styles.ruleTitle}>Be proactive.</Text>
        <Text style={styles.ruleText}>Always report bad behavior.</Text>
      </View>

      {/* Agree Button */}
      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => navigation.navigate('NextPage')} // Replace 'NextPage' with your next screen name
      >
        <Text style={styles.agreeText}>I agree</Text>
      </TouchableOpacity>
    </View>
  );
}

