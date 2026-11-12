import React, {createContext, useContext, useMemo, useState} from 'react';
import {loginUser, User} from '../services/authService';

type AuthState = {
  user: User | null;
  signIn: (identifier: string, password: string) => Promise<void>;
  signOut: () => void;
};
const AuthContext = createContext<AuthState | undefined>(undefined);
export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const signIn = async (identifier: string, password: string) => {
    const result = await loginUser(identifier, password);
    // Demo starter: token is intentionally NOT persisted. Implement secure
    // token handling and session restoration before production use.
    setUser(result.user);
  };
  const signOut = () => setUser(null);
  const value = useMemo(() => ({user, signIn, signOut}), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
