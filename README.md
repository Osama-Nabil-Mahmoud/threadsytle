# THREAD - Next.js + Firebase E-commerce

## Firebase Console Setup Instructions

1. **Create Project**: Go to [Firebase Console](https://console.firebase.google.com/), click "Add Project", and name it "THREAD".
2. **Enable Authentication**:
   - Enable "Email/Password" provider.
   - Enable "Google" provider (optional).
3. **Firestore Database**:
   - Create database in "Production mode".
   - Select your preferred region.
4. **Firebase Storage**:
   - Enable Storage.
5. **Project Credentials**:
   - Click Project Settings (Gear icon) -> General.
   - Add a Web App.
   - Copy the `firebaseConfig` values.
6. **Environment Variables**:
   Add the following to your Vercel/Local `.env` file:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```
7. **Security Rules**:
   - Paste the provided Firestore & Storage rules in their respective tabs in Firebase Console.
8. **Admin Setup**:
   - Create a collection named `admins`.
   - Add a document with ID = Your User UID (from Auth tab).
   - Set field `role` = `"admin"`.

## Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admins/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    match /orders/{orderId} {
      allow create: if true;
      allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      allow update, delete: if false;
    }
    match /newsletter/{entryId} {
      allow create: if true;
      allow read: if request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
  }
}
```

## Storage Security Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /product-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && firestore.exists(/databases/(default)/documents/admins/$(request.auth.uid));
    }
  }
}
```
