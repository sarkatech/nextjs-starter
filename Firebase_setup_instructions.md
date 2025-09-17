# Firebase Authentication Setup Guide

## Prerequisites
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google Authentication in the Firebase console

## Firebase Console Setup

### 1. Create Firebase Project
- Go to Firebase Console
- Click "Create a project"
- Enter project name
- Follow the setup wizard

### 2. Enable Google Authentication
- In your Firebase project, go to "Authentication" → "Sign-in method"
- Click on "Google" provider
- Toggle "Enable"
- Enter your project's support email
- Click "Save"

### 3. Add Web App
- In Project Overview, click the web icon (</>)
- Register your app with a nickname
- Copy the Firebase configuration object

### 4. Configure Environment Variables
- Replace the values in `.env.local` with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5. Configure Authorized Domains
- In Firebase Console → Authentication → Settings → Authorized domains
- Add your domain (localhost:3000 for development)
- Add your production domain when deploying

## Testing the Authentication

1. Start your development server: `npm run dev`
2. Click "Login" or "Sign Up" in the navbar
3. A Google sign-in popup should appear
4. After signing in, you should see your profile in the navbar
5. Access the dashboard at `/dashboard`

## Features Implemented

✅ Google Sign-In/Sign-Up
✅ User state management with React Context
✅ Protected routes (Dashboard)
✅ User profile display in navbar
✅ Automatic authentication state persistence
✅ Error handling for authentication
✅ Loading states
✅ Logout functionality

## Next Steps

- Add email/password authentication
- Implement user profile editing
- Add Firestore for user data storage
- Create protected API routes
- Add role-based access control
