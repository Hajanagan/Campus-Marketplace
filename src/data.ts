import { Listing } from "./types";

export interface CategoryInfo {
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { name: "All items", icon: "✨" },
  { name: "Textbooks", icon: "📚" },
  { name: "Furniture", icon: "🪑" },
  { name: "Tech", icon: "💻" },
  { name: "Fashion", icon: "👕" },
  { name: "Sports", icon: "⚽" },
  { name: "Housing", icon: "🏠" },
  { name: "Art & Supplies", icon: "🎨" },
];

export const categories = CATEGORIES.map((c) => c.name);

export const getCategoryIcon = (categoryName: string): string => {
  const match = CATEGORIES.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase(),
  );
  return match ? match.icon : "🏷️";
};

export const seedListings: Listing[] = [
  {
    id: "1",
    title: "Calculus: Early Transcendentals",
    price: 35,
    category: "Textbooks",
    seller: "Maya R.",
    campus: "North Campus",
    condition: "Like new",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    description: "Barely used and ready for your next math class.",
  },
  {
    id: "2",
    title: "Walnut study desk",
    price: 80,
    category: "Furniture",
    seller: "Jordan K.",
    campus: "West Village",
    condition: "Good condition",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    description: "Solid walnut desk with room for a monitor and books.",
  },
  {
    id: "3",
    title: "Noise-cancelling headphones",
    price: 120,
    category: "Tech",
    seller: "Alex P.",
    campus: "East Quad",
    condition: "Like new",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    description: "Wireless headphones with case and charging cable.",
  },
  {
    id: "4",
    title: "Vintage varsity jacket",
    price: 45,
    category: "Fashion",
    seller: "Sam T.",
    campus: "North Campus",
    condition: "Good condition",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
    description: "A warm, classic layer with a relaxed fit.",
  },
  {
    id: "5",
    title: "Commuter Road Bike",
    price: 110,
    category: "Sports",
    seller: "Chris M.",
    campus: "South Campus",
    condition: "Good condition",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
    description: "Lightweight 21-speed road bike, includes helmet and U-lock.",
  },
  {
    id: "6",
    title: "Summer Sublet - Studio Apartment",
    price: 650,
    category: "Housing",
    seller: "Elena V.",
    campus: "College Town",
    condition: "Furnished",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    description: "Private studio apartment available for summer quarter. Utilities included.",
  },
  {
    id: "7",
    title: "Acrylic Paint & Canvas Set",
    price: 25,
    category: "Art & Supplies",
    seller: "David L.",
    campus: "Fine Arts Center",
    condition: "Brand new",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    description: "Set of 24 acrylic paint tubes and 3 unused stretched canvases.",
  },
];

