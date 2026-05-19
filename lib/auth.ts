import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return firebaseSignOut(auth);
};

// Optional: register if needed
export const register = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};