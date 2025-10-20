import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";

export default function SettingsScreen({ onLogout }) {
  const [notifications, setNotifications] = React.useState(true);
  const [location, setLocation] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Edit Profile</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Privacy Settings</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Subscription</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>Push Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#ccc", true: "#FF0008" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Location Services</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: "#ccc", true: "#FF0008" }}
            thumbColor="#fff"
          />
        </View>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Distance Preferences</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Help Center</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Terms of Service</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Privacy Policy</Text>
          <Text style={styles.itemIcon}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#333",
  },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#999",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#333",
  },
  itemIcon: {
    fontSize: 24,
    color: "#ccc",
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#FF0008",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Nunito",
    color: "#999",
    paddingBottom: 40,
  },
});
