import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  addDoc,
  collection,
  doc,
  where,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { EmptyState } from "../components/EmptyState";
import { PageTitle } from "../components/PageTitle";
import { db } from "../firebase";
import { Conversation, Message } from "../types";

export function MessagesPage({
  userId,
  username,
  onBrowse,
}: {
  userId: string | null;
  username: string;
  onBrowse: () => void;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!db || !userId) {
      setConversations([]);
      return;
    }
    return onSnapshot(
      query(
        collection(db, "conversations"),
        where("memberIds", "array-contains", userId),
      ),
      (snapshot) => {
        const next = snapshot.docs
          .map((entry) => ({ id: entry.id, ...entry.data() }) as Conversation)
          .filter((conversation) => conversation.memberIds.includes(userId))
          .sort(
            (a, b) =>
              (b.lastMessageAt?.seconds || 0) -
              (a.lastMessageAt?.seconds || 0),
          );
        setConversations(next);
      },
      (snapshotError) => setError(snapshotError.message),
    );
  }, [userId]);

  useEffect(() => {
    if (!db || !selected) {
      setMessages([]);
      return;
    }
    return onSnapshot(
      query(
        collection(db, "conversations", selected.id, "messages"),
        orderBy("createdAt", "asc"),
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map(
            (entry) => ({ id: entry.id, ...entry.data() }) as Message,
          ),
        ),
      (snapshotError) => setError(snapshotError.message),
    );
  }, [selected]);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!db || !selected || !userId || !text) return;
    try {
      await addDoc(collection(db, "conversations", selected.id, "messages"), {
        senderId: userId,
        senderUsername: username,
        text,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "conversations", selected.id), {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
      });
      setDraft("");
      setError("");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send message.");
    }
  };

  if (!userId) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <PageTitle title="Messages" subtitle="Keep campus meetups simple" />
        <EmptyState
          title="Sign in to message"
          message="Sign in to communicate with buyers and sellers using their usernames."
          action="Browse listings"
          onAction={onBrowse}
        />
      </ScrollView>
    );
  }

  if (selected) {
    const otherUser = selected.memberIds.find((id) => id !== userId) || "";
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable onPress={() => setSelected(null)}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>
              {selected.memberUsernames[otherUser] || "Campus member"}
            </Text>
            <Text style={styles.headerSubtitle}>{selected.listingTitle || "Conversation"}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.messages}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.message,
                message.senderId === userId && styles.ownMessage,
              ]}
            >
              <Text style={styles.messageSender}>{message.senderUsername}</Text>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message..."
            style={styles.input}
            onSubmitEditing={sendMessage}
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <PageTitle title="Messages" subtitle="Chat with buyers and sellers by username" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {conversations.length === 0 ? (
        <EmptyState
          title="Your inbox is quiet"
          message="When you message a seller, conversations will show up here."
          action="Browse listings"
          onAction={onBrowse}
        />
      ) : (
        conversations.map((conversation) => {
          const otherUser =
            conversation.memberIds.find((id) => id !== userId) || "";
          return (
            <Pressable
              key={conversation.id}
              style={styles.conversation}
              onPress={() => setSelected(conversation)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(conversation.memberUsernames[otherUser] || "?")[0].toUpperCase()}
                </Text>
              </View>
              <View style={styles.conversationBody}>
                <Text style={styles.username}>
                  {conversation.memberUsernames[otherUser] || "Campus member"}
                </Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {conversation.lastMessage || conversation.listingTitle || "New conversation"}
                </Text>
              </View>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8F8F4" },
  content: { padding: 20, paddingBottom: 110 },
  header: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EBE5",
  },
  back: { fontSize: 38, color: "#205B45", lineHeight: 38 },
  headerTitle: { color: "#183F32", fontSize: 18, fontWeight: "800" },
  headerSubtitle: { color: "#87918C", marginTop: 3 },
  conversation: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DCECE0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#205B45", fontSize: 18, fontWeight: "800" },
  conversationBody: { flex: 1, marginLeft: 12 },
  username: { color: "#183F32", fontSize: 16, fontWeight: "800" },
  preview: { color: "#87918C", marginTop: 4 },
  messages: { padding: 16, paddingBottom: 24 },
  message: {
    alignSelf: "flex-start",
    maxWidth: "82%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  ownMessage: { alignSelf: "flex-end", backgroundColor: "#DCECE0" },
  messageSender: { color: "#205B45", fontSize: 12, fontWeight: "700" },
  messageText: { color: "#183F32", marginTop: 4, fontSize: 15 },
  composer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EBE5",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F8F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  sendButton: {
    backgroundColor: "#205B45",
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
    marginLeft: 8,
  },
  sendText: { color: "#FFF", fontWeight: "800" },
  error: { color: "#A33A2B", marginTop: 10 },
});
