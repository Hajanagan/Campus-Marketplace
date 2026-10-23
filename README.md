# 🎓 Campus Marketplace

> A mobile-first marketplace for students to **buy, sell, and discover** items within their campus community.

Built with **React Native + Expo SDK 57**, backed by **Firebase** (Firestore + Google Auth).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Explore** | Browse and search listings with category filters |
| 📌 **Save Listings** | Bookmark items to revisit later |
| 💬 **Messaging** | Start conversations directly with sellers |
| 📦 **Sell** | Publish listings with title, price, category, condition & image |
| 👤 **Profile** | View your profile and manage your listings |
| 🔒 **Auth** | Google Sign-In (anonymous fallback for frictionless access) |

---

## 🗂️ Project Structure

```
campus-marketplace/
├── src/
│   ├── App.tsx              # Root navigation & tab layout
│   ├── firebase.ts          # Firebase initialisation
│   ├── types.ts             # Shared TypeScript types
│   ├── data.ts              # Static seed / demo data
│   ├── pages/
│   │   ├── ExplorePage.tsx      # Listing feed + search + filters
│   │   ├── SavedPage.tsx        # Saved/bookmarked listings
│   │   ├── MessagesPage.tsx     # Inbox / conversations
│   │   ├── MyListingsPage.tsx   # Seller's own listings
│   │   └── ProfilePage.tsx      # User profile & settings
│   └── components/
│       ├── ListingCard.tsx      # Reusable listing tile
│       ├── EmptyState.tsx       # Empty-screen placeholder
│       └── PageTitle.tsx        # Shared page header
├── assets/                  # Icons & images
├── firestore.rules          # Firestore security rules
├── firebase.json            # Firebase CLI config
├── app.json                 # Expo app config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22.13
- **npm** ≥ 10 (comes with Node 22)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — installed automatically via `npx`

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Hajanagan/Campus-Marketplace.git
cd Campus-Marketplace

# 2. Copy environment template
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Start the development server
npm run web        # Web browser
npm start          # Expo Go (scan QR with phone)
npm run android    # Android emulator
npm run ios        # iOS simulator (macOS only)
```

> **Demo mode**: The app works out of the box with local seed data until Firebase credentials are added to `.env`.

---

## 🔥 Firebase Setup

1. Create a Firebase project and register a Web app.
2. Enable Google Authentication under Authentication > Sign-in method. Anonymous Authentication remains available for native fallback.
3. Create a Cloud Firestore database.
4. Copy the Web app configuration into `.env` using `.env.example`.
5. Deploy `firestore.rules` with the Firebase CLI or paste them into the Firestore Rules tab.

The app uses:

- `listings`: public reads, authenticated seller-owned creates and edits.
- `users/{uid}` and `users/{uid}/saved/{listingId}`: owner-only access.
- `conversations`: members-only access, with messages in a subcollection.

The client Firebase configuration is intentionally public. Access control belongs in Authentication, Firestore Rules, and App Check; never put Admin SDK credentials in this app.

## Current product flows

- Explore listings with search and category filters.
- Browse and search without signing in; Google sign-in is required to contact sellers or publish listings.
- Save and unsave listings.
- Open a listing detail view and start a seller conversation.
- Publish a basic listing through the Sell flow.
- Sign in anonymously for a frictionless student account.
- View Saved, Messages, and Profile pages.
