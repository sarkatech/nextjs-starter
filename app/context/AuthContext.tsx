"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, UserInfo, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims';

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get the ID token result to access custom claims
        const idTokenResult = await firebaseUser.getIdTokenResult();
        
        // Transform Firebase user to your custom User type
        const customUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          providerId: firebaseUser.providerId,
          emailVerified: firebaseUser.emailVerified,
          customClaims: idTokenResult.claims as Claims,
        };
        
        setUser(customUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
