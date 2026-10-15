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

export type Tab = "Explore" | "Saved" | "Messages" | "Profile" | "MyListings";

export type SellerReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type SellerProfile = {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
  campus: string;
  major?: string;
  gradYear?: string;
  bio: string;
  rating: number;
  reviewCount: number;
  responseTime?: string;
  verifiedStudent: boolean;
  joinedDate: string;
  meetupLocations: string[];
  reviews?: SellerReview[];
};
