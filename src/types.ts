export type Listing = {
  id: string;
  title: string;
  price: number;
  category: string;
  seller: string;
  sellerId?: string;
  campus: string;
  condition: string;
  image: string;
  description?: string;
  status?: "available" | "sold";
};

export type Conversation = {
  id: string;
  memberIds: string[];
  memberUsernames: Record<string, string>;
  listingId?: string;
  listingTitle?: string;
  lastMessage?: string;
  lastMessageAt?: { seconds: number };
};

export type Message = {
  id: string;
  senderId: string;
  senderUsername: string;
  text: string;
  createdAt?: { seconds: number };
};

export type Tab = "Explore" | "Saved" | "Messages" | "Profile" | "MyListings";
