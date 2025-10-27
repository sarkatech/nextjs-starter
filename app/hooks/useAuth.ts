"use client";

import { signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { useState } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';
import { auth, googleProvider } from '@/app/lib/firebase';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
  const { user, loading, isAuthenticated } = useAuthContext();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign up/Sign in with Google (same function for both)
  const signUpWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User signed in:', result.user.email);
      
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      
      // Handle specific error cases
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          setError('Sign-in was cancelled. Please try again.');
        } else if (error.code === 'auth/popup-blocked') {
          setError('Popup was blocked. Please allow popups and try again.');
        } else {
          setError('Failed to sign in with Google. Please try again.');
        }
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
      
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with Google (alias for signUpWithGoogle)
  const loginWithGoogle = signUpWithGoogle;

  // Logout function
  const logout = async (): Promise<boolean> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      await signOut(auth);
      console.log('User signed out successfully');
      
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Clear error function
  const clearError = () => setError(null);

  return {
    // User state
    user,
    loading: loading || authLoading,
    isAuthenticated,
    error,
    
    // Auth functions
    signUpWithGoogle,
    loginWithGoogle,
    logout,
    clearError,
  };
};
