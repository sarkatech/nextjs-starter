"use client";

import { signInWithPopup, signOut, UserCredential } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';
import { auth, googleProvider } from '@/app/lib/firebase';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
  const { user, loading, isAuthenticated } = useAuthContext();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUpWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User signed in:', result.user.email);
      
      // Redirect to /app after successful sign-in
      router.push('/app');
      
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      
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

  const loginWithGoogle = signUpWithGoogle;

  const logout = async (): Promise<boolean> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      await signOut(auth);
      console.log('User signed out successfully');
      
      // Redirect to home after logout
      router.push('/');
      
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    loading: loading || authLoading,
    isAuthenticated,
    error,
    signUpWithGoogle,
    loginWithGoogle,
    logout,
    clearError,
  };
};
