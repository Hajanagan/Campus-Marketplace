import { Listing, SellerProfile } from "./types";

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
    description: "Barely used and ready for your next math class. No highlighted pages, includes access code study sheet.",
    status: "available",
  },
  {
    id: "1b",
    title: "TI-84 Plus CE Graphing Calculator",
    price: 70,
    category: "Tech",
    seller: "Maya R.",
    campus: "North Campus",
    condition: "Like new",
    image: "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=800",
    description: "Rose gold graphing calculator with charging cable. Perfect for calculus, stats, and engineering.",
    status: "available",
  },
  {
    id: "1c",
    title: "Linear Algebra & Applications (5th Ed)",
    price: 30,
    category: "Textbooks",
    seller: "Maya R.",
    campus: "North Campus",
    condition: "Good condition",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    description: "Great textbook for MATH 215. Binding is solid with minor cover wear.",
    status: "sold",
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
    description: "Solid walnut desk with room for a monitor and books. Pick up required, fits in an SUV.",
    status: "available",
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
    description: "Wireless headphones with case and charging cable. Active noise cancellation is phenomenal for study sessions.",
    status: "available",
  },
  {
    id: "3b",
    title: "7-in-1 USB-C Hub Adapter",
    price: 22,
    category: "Tech",
    seller: "Alex P.",
    campus: "East Quad",
    condition: "Like new",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800",
    description: "HDMI 4K, 3x USB 3.0, SD card reader, 100W PD charging pass-through. Metal space gray finish.",
    status: "available",
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
    description: "A warm, classic layer with a relaxed fit. Size Medium, wool body with faux leather sleeves.",
    status: "available",
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
    description: "Lightweight 21-speed road bike, includes helmet and U-lock. Tuned up last month.",
    status: "available",
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
    description: "Private studio apartment available for summer quarter. Utilities included. 5 min walk to Central quad.",
    status: "available",
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
    status: "available",
  },
];

export const seedSellerProfiles: Record<string, SellerProfile> = {
  "Maya R.": {
    id: "seller-maya",
    name: "Maya R.",
    email: "maya.r@campus.edu",
    campus: "North Campus",
    major: "Computer Science & Math",
    gradYear: "Class of '26",
    bio: "Senior CS & Math double major. Selling textbooks, tech accessories, and desk items before graduation! Always happy to meet between classes at North Campus library.",
    rating: 4.9,
    reviewCount: 16,
    responseTime: "⚡ Replies in ~15 mins",
    verifiedStudent: true,
    joinedDate: "Fall 2023",
    meetupLocations: [
      "North Campus Shapiro Library",
      "Duderstadt Center Cafe",
      "Pierpont Commons",
    ],
    reviews: [
      {
        id: "r1",
        author: "Sarah K.",
        rating: 5,
        date: "2 days ago",
        comment: "Met at the library on time! Textbook was pristine, exactly as described. Highly recommend!",
      },
      {
        id: "r2",
        author: "Brandon M.",
        rating: 5,
        date: "1 week ago",
        comment: "Super quick communication and answered all my questions about the calculator.",
      },
      {
        id: "r3",
        author: "Jessica T.",
        rating: 4.8,
        date: "3 weeks ago",
        comment: "Great seller, friendly and very accommodating with meetup time changes.",
      },
    ],
  },
  "Jordan K.": {
    id: "seller-jordan",
    name: "Jordan K.",
    email: "jordan.k@campus.edu",
    campus: "West Village",
    major: "Architecture & Urban Design",
    gradYear: "Class of '25",
    bio: "Junior architecture student living off-campus. Selling dorm furniture and studio art supplies in excellent condition. Can assist with loading heavy items!",
    rating: 4.8,
    reviewCount: 9,
    responseTime: "⚡ Replies within 1 hour",
    verifiedStudent: true,
    joinedDate: "Spring 2024",
    meetupLocations: [
      "West Village Courtyard",
      "Art & Architecture Building",
      "Central Campus Transit Center",
    ],
    reviews: [
      {
        id: "r4",
        author: "Devon L.",
        rating: 5,
        date: "5 days ago",
        comment: "Desk was in awesome shape. Jordan helped me carry it down to my truck!",
      },
      {
        id: "r5",
        author: "Clara W.",
        rating: 4.6,
        date: "2 weeks ago",
        comment: "Good communication and honest description of the furniture condition.",
      },
    ],
  },
  "Alex P.": {
    id: "seller-alex",
    name: "Alex P.",
    email: "alex.p@campus.edu",
    campus: "East Quad",
    major: "Electrical Engineering",
    gradYear: "Class of '26",
    bio: "Engineering student & audio hobbyist. All electronics are thoroughly tested, cleaned, and come with required cables. Safe campus transactions guaranteed.",
    rating: 5.0,
    reviewCount: 22,
    responseTime: "⚡ Replies in ~10 mins",
    verifiedStudent: true,
    joinedDate: "Fall 2023",
    meetupLocations: [
      "East Quad Dining Hall Lobby",
      "EECS Building Atrium",
      "Michigan Union Ground Floor",
    ],
    reviews: [
      {
        id: "r6",
        author: "Marcus C.",
        rating: 5,
        date: "Yesterday",
        comment: "Headphones sound fantastic! Included the original box and audio cord. Top tier seller.",
      },
      {
        id: "r7",
        author: "Priya N.",
        rating: 5,
        date: "10 days ago",
        comment: "Item was basically brand new. Met in a public spot, very safe and easy.",
      },
    ],
  },
  "Sam T.": {
    id: "seller-sam",
    name: "Sam T.",
    email: "sam.t@campus.edu",
    campus: "North Campus",
    major: "Economics & Public Policy",
    gradYear: "Class of '27",
    bio: "Sophomore economics student. Big fan of vintage sportswear and streetwear. Clearing out my closet each semester!",
    rating: 4.7,
    reviewCount: 12,
    responseTime: "⚡ Replies within 2 hours",
    verifiedStudent: true,
    joinedDate: "Winter 2024",
    meetupLocations: [
      "North Campus Recreation Building",
      "Bursley Hall Lobby",
      "Central Diag",
    ],
    reviews: [
      {
        id: "r8",
        author: "Liam O.",
        rating: 5,
        date: "4 days ago",
        comment: "Varsity jacket is super warm and looks great. Thanks Sam!",
      },
    ],
  },
  "Chris M.": {
    id: "seller-chris",
    name: "Chris M.",
    email: "chris.m@campus.edu",
    campus: "South Campus",
    major: "Kinesiology & Sports Management",
    gradYear: "Class of '25",
    bio: "Varsity athlete and cyclist. Selling sports gear, gym equipment, and commuter bikes. All bike components serviced before listing.",
    rating: 4.9,
    reviewCount: 14,
    responseTime: "⚡ Replies in ~30 mins",
    verifiedStudent: true,
    joinedDate: "Fall 2023",
    meetupLocations: [
      "South Campus Athletics Complex",
      "Intramural Sports Building",
      "State Street Station",
    ],
    reviews: [
      {
        id: "r9",
        author: "Noah G.",
        rating: 5,
        date: "1 week ago",
        comment: "Brought bike pump and helped adjust seat height. Incredible guy!",
      },
    ],
  },
  "Elena V.": {
    id: "seller-elena",
    name: "Elena V.",
    email: "elena.v@campus.edu",
    campus: "College Town",
    major: "Ross School of Business MBA",
    gradYear: "Class of '25",
    bio: "MBA student specializing in real estate. Managing verified student summer sublets and apartment decor. Seamless lease coordination and quick responses.",
    rating: 4.8,
    reviewCount: 18,
    responseTime: "⚡ Replies in ~20 mins",
    verifiedStudent: true,
    joinedDate: "Summer 2023",
    meetupLocations: [
      "Ross School Winter Garden",
      "College Town Starbucks",
      "Law Quadrangle",
    ],
    reviews: [
      {
        id: "r10",
        author: "Emily Z.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Sublet walk-through was super clear. Everything in contract was honored.",
      },
    ],
  },
  "David L.": {
    id: "seller-david",
    name: "David L.",
    email: "david.l@campus.edu",
    campus: "Fine Arts Center",
    major: "Fine Arts & Graphic Design",
    gradYear: "Class of '26",
    bio: "Visual arts junior. Selling excess studio supplies, high-grade canvases, and design markers from semester projects.",
    rating: 5.0,
    reviewCount: 7,
    responseTime: "⚡ Replies within 1 hour",
    verifiedStudent: true,
    joinedDate: "Spring 2024",
    meetupLocations: [
      "Stamps School of Art & Design",
      "Duderstadt Atrium",
      "North Campus Cafe",
    ],
    reviews: [
      {
        id: "r11",
        author: "Chloe H.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Canvases were untouched in plastic wrap. Saved me 50% vs bookstore!",
      },
    ],
  },
};

export function getSellerProfile(
  sellerNameOrId: string,
  currentUser?: {
    displayName?: string | null;
    email?: string | null;
    uid?: string;
    photoURL?: string | null;
  } | null,
  currentListings: Listing[] = seedListings,
): SellerProfile {
  // If the seller matches the current logged-in user
  const isCurrentUser =
    currentUser &&
    (sellerNameOrId === currentUser.displayName ||
      sellerNameOrId === currentUser.email ||
      sellerNameOrId === currentUser.uid ||
      sellerNameOrId === "You");

  if (isCurrentUser) {
    const userDisplayName =
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "Campus Student";
    const userItems = currentListings.filter(
      (item) =>
        item.sellerId === currentUser.uid ||
        item.seller === userDisplayName ||
        item.seller === "You",
    );
    const soldCount = userItems.filter((i) => i.status === "sold").length;

    return {
      id: currentUser.uid || "current-user",
      name: userDisplayName,
      email: currentUser.email || "",
      photoURL: currentUser.photoURL || undefined,
      campus: "North Campus",
      major: "Student",
      gradYear: "Class of '26",
      bio: "Active campus marketplace member. Prompt communicator and happy to meet at convenient campus locations!",
      rating: 5.0,
      reviewCount: 3 + soldCount,
      responseTime: "⚡ Replies in ~15 mins",
      verifiedStudent: true,
      joinedDate: "Fall 2024",
      meetupLocations: [
        "North Campus Shapiro Library",
        "Student Union Plaza",
        "Campus Recreation Center",
      ],
      reviews: [
        {
          id: "r-user-1",
          author: "Taylor S.",
          rating: 5,
          date: "3 days ago",
          comment: "Punctual meetup and item was in mint condition. Great seller!",
        },
        {
          id: "r-user-2",
          author: "Morgan B.",
          rating: 5,
          date: "2 weeks ago",
          comment: "Super friendly, communicated quickly and clearly throughout.",
        },
      ],
    };
  }

  // Look in predefined profiles
  const profile = seedSellerProfiles[sellerNameOrId];
  if (profile) return profile;

  // Search by partial match (e.g., if full email or first name was passed)
  const matchingKey = Object.keys(seedSellerProfiles).find(
    (key) =>
      key.toLowerCase() === sellerNameOrId.toLowerCase() ||
      sellerNameOrId.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(sellerNameOrId.toLowerCase()),
  );
  if (matchingKey && seedSellerProfiles[matchingKey]) {
    return seedSellerProfiles[matchingKey];
  }

  // Generic fallback for any newly published seller
  return {
    id: `seller-${sellerNameOrId.replace(/\s+/g, "-").toLowerCase()}`,
    name: sellerNameOrId,
    campus: "Campus Area",
    major: "Student",
    gradYear: "Class of '26",
    bio: "Campus student selling items within the university community. Verified email and safe meetup preference.",
    rating: 4.9,
    reviewCount: 5,
    responseTime: "⚡ Replies within 1 hour",
    verifiedStudent: true,
    joinedDate: "Spring 2024",
    meetupLocations: ["Campus Student Union", "Main University Library"],
    reviews: [
      {
        id: `r-gen-${sellerNameOrId}`,
        author: "Campus Peer",
        rating: 5,
        date: "1 week ago",
        comment: "Great communication, item was exactly as described.",
      },
    ],
  };
}

