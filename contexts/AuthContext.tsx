'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from '@/types';
import { mapFirebaseUser } from '@/lib/utils';
import Loader from '@/components/Loader';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      setUser(mapFirebaseUser(firebaseUser));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <Loader fullScreen />;
  }

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};