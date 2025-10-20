import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const mockMatches = [
  {
    id: 1,
    name: "Sarah",
    lastMessage: "Hey! How are you?",
    time: "2m ago",
    avatar: "https://i.pravatar.cc/100?img=1",
    unread: true,
  },
  {
    id: 2,
    name: "Emma",
    lastMessage: "See you tomorrow!",
    time: "1h ago",
    avatar: "https://i.pravatar.cc/100?img=5",
    unread: false,
  },
  {
    id: 3,
    name: "Olivia",
    lastMessage: "That sounds great!",
    time: "3h ago",
    avatar: "https://i.pravatar.cc/100?img=9",
    unread: false,
  },
  {
    id: 4,
    name: "Sophia",
    lastMessage: "Let's grab coffee",
    time: "1d ago",
    avatar: "https://i.pravatar.cc/100?img=10",
    unread: true,
  },
];

export default function ChatListScreen({ onChatPress }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => onChatPress && onChatPress(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={[styles.lastMessage, item.unread && styles.unread]}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.badge} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <FlatList
        data={mockMatches}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
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
  },
  list: {
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#333",
  },
  time: {
    fontSize: 12,
    fontFamily: "Nunito",
    color: "#999",
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: "Nunito",
    color: "#666",
  },
  unread: {
    fontWeight: "600",
    color: "#333",
  },
  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF0008",
    marginLeft: 10,
  },
});
