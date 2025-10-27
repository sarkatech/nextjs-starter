"use client";

import {
  signInWithPopup,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

import { useState } from 'react';
import { useAuthContext } from '@/app/context/AuthContext';
import { auth, googleProvider } from '@/app/lib/firebase';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
  const { user, loading, isAuthenticated } = useAuthContext();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<UserCredential | null> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      console.log('User signed up with email:', result.user.email);
      return result;
    } catch (error) {
      console.error('Error signing up with email:', error);
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already registered. Please login instead.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please use at least 6 characters.');
            break;
          default:
            setError('Failed to create account. Please try again.');
        }
      } else {
        setError('Failed to create account. Please try again.');
      }
      
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with email and password
  const loginWithEmail = async (email: string, password: string): Promise<UserCredential | null> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in with email:', result.user.email);
      
      return result;
    } catch (error) {
      console.error('Error logging in with email:', error);
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('Invalid email or password.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled.');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Please try again later.');
            break;
          default:
            setError('Failed to login. Please try again.');
        }
      } else {
        setError('Failed to login. Please try again.');
      }
      
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign up/Sign in with Google
  const signUpWithGoogle = async (): Promise<UserCredential | null> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Google:', result.user.email);
      
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

  // Login with Google (alias for signUpWithGoogle)
  const loginWithGoogle = signUpWithGoogle;

  // Reset password
  /*const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setAuthLoading(true);
      setError(null);
      
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent to:', email);
      
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('No account found with this email.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          default:
            setError('Failed to send reset email. Please try again.');
        }
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      
      return false;
    } finally {
      setAuthLoading(false);
    }
  };*/

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
    signUpWithEmail,
    loginWithEmail,
    signUpWithGoogle,
    loginWithGoogle,
    //resetPassword,
    logout,
    clearError,
  };
};
