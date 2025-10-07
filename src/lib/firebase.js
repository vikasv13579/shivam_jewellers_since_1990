// Firebase client initialization and helpers
// This module is safe to import in client components only

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app once per browser session
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth singleton and providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Store the recaptcha verifier instance
let recaptchaVerifier = null;

// Helper to get or create invisible reCAPTCHA verifier (completely hidden from user)
export function getRecaptchaVerifier(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null;

  // Return existing verifier if already initialized
  if (recaptchaVerifier) {
    return recaptchaVerifier;
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error('reCAPTCHA container not found');
    return null;
  }

  try {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved automatically
        console.log('reCAPTCHA verified successfully');
      },
      'expired-callback': () => {
        // Reset verifier on expiration
        console.log('reCAPTCHA expired, resetting...');
        recaptchaVerifier = null;
      }
    });

    return recaptchaVerifier;
  } catch (error) {
    console.error('Error creating reCAPTCHA verifier:', error);
    return null;
  }
}

// Clear the recaptcha verifier (useful for cleanup)
export function clearRecaptchaVerifier() {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch (error) {
      console.error('Error clearing reCAPTCHA:', error);
    }
    recaptchaVerifier = null;
  }
}

// Helper to save user profile to Firestore
export async function saveUserProfile(userId, profileData) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const userDocRef = doc(db, "users", userId);

    // Check if this is a new user or update
    const timestamp = serverTimestamp();
    const dataToSave = {
      ...profileData,
      updatedAt: timestamp,
    };

    // Only set createdAt if it's a new document
    if (!profileData.createdAt) {
      dataToSave.createdAt = timestamp;
    }

    await setDoc(userDocRef, dataToSave, { merge: true });

    console.log("✅ User profile saved successfully to Firestore");
    console.log("📊 User ID:", userId);
    console.log("📧 Email:", profileData.email);

    return true;
  } catch (error) {
    console.error("❌ Error saving user profile:", error);
    throw error;
  }
}

// Export Firebase auth methods
export {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  app
};
