import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const mockMatches = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    mutual: "Coffee, Travel",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Emma",
    age: 25,
    mutual: "Photography, Yoga",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Olivia",
    age: 27,
    mutual: "Hiking, Music",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 4,
    name: "Sophia",
    age: 26,
    mutual: "Art, Cooking",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

export default function MatchesScreen({ onMatchPress }) {
  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => onMatchPress && onMatchPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.matchImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.matchGradient}>
        <Text style={styles.matchName}>
          {item.name}, {item.age}
        </Text>
        <Text style={styles.matchMutual}>❤️ {item.mutual}</Text>
      </LinearGradient>
      <View style={styles.matchBadge}>
        <Text style={styles.matchBadgeText}>New Match!</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Matches</Text>
        <Text style={styles.subtitle}>{mockMatches.length} new matches</Text>
      </View>
      <FlatList
        data={mockMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
    </View>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#666",
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  matchCard: {
    width: "48%",
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  matchImage: {
    width: "100%",
    height: "100%",
  },
  matchGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
    marginBottom: 4,
  },
  matchMutual: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Nunito",
    opacity: 0.9,
  },
  matchBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF0008",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins",
  },
});
