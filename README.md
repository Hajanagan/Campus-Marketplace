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

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a **Web app** and copy the config values.
3. Enable **Google Authentication** under *Authentication → Sign-in method*.
   *(Anonymous auth is also available as a native fallback.)*
4. Create a **Cloud Firestore** database (start in production mode).
5. Populate your `.env` file using `.env.example` as a template:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

6. Deploy Firestore security rules:

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools

firebase login
firebase deploy --only firestore:rules
```

---

## 🔐 Firestore Security Rules

| Collection | Read | Write |
|---|---|---|
| `listings` | Anyone (public) | Authenticated seller who owns the listing |
| `users/{uid}` | Owner only | Owner only |
| `users/{uid}/saved/{listingId}` | Owner only | Owner only |
| `conversations` | Members only | Members only |
| `conversations/{id}/messages` | Members only | Members only (create) |

> The client Firebase config is **intentionally public**. All access control lives in Authentication, Firestore Rules, and (optionally) App Check. Never expose Admin SDK credentials on the client.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) 0.86 |
| Build Tooling | [Expo SDK 57](https://docs.expo.dev/) |
| Web Support | [react-native-web](https://necolas.github.io/react-native-web/) |
| Language | TypeScript 6 |
| Backend | [Firebase](https://firebase.google.com/) (Firestore + Auth) |
| Auth | Google Sign-In / Anonymous |

---

## 📱 Platform Support

| Platform | Command | Status |
|---|---|---|
| Web | `npm run web` | ✅ Supported |
| Android | `npm run android` | ✅ Supported |
| iOS | `npm run ios` | ✅ Supported |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file included in this repository.

---

<p align="center">Made with ❤️ for campus communities</p>

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

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Register a **Web app** and copy the config values.
3. Enable **Google Authentication** under *Authentication → Sign-in method*.
   *(Anonymous auth is also available as a native fallback.)*
4. Create a **Cloud Firestore** database (start in production mode).
5. Populate your `.env` file using `.env.example` as a template:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

6. Deploy Firestore security rules:

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools

firebase login
firebase deploy --only firestore:rules
```

---

## 🔐 Firestore Security Rules

| Collection | Read | Write |
|---|---|---|
| `listings` | Anyone (public) | Authenticated seller who owns the listing |
| `users/{uid}` | Owner only | Owner only |
| `users/{uid}/saved/{listingId}` | Owner only | Owner only |
| `conversations` | Members only | Members only |
| `conversations/{id}/messages` | Members only | Members only (create) |

> The client Firebase config is **intentionally public**. All access control lives in Authentication, Firestore Rules, and (optionally) App Check. Never expose Admin SDK credentials on the client.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) 0.86 |
| Build Tooling | [Expo SDK 57](https://docs.expo.dev/) |
| Web Support | [react-native-web](https://necolas.github.io/react-native-web/) |
| Language | TypeScript 6 |
| Backend | [Firebase](https://firebase.google.com/) (Firestore + Auth) |
| Auth | Google Sign-In / Anonymous |

---

## 📱 Platform Support

| Platform | Command | Status |
|---|---|---|
| Web | `npm run web` | ✅ Supported |
| Android | `npm run android` | ✅ Supported |
| iOS | `npm run ios` | ✅ Supported |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file included in this repository.

---

<p align="center">Made with ❤️ for campus communities</p>

