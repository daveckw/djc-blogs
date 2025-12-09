import type React from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { UserType } from 'functions/types/userTypes';

export type UserTypeDefault = Record<string, any> | null;

export type AuthState = {
  user: UserTypeDefault;
  loading: boolean;
};

export type AuthContextValue = {
  user: UserType | null;
  authUser: FirebaseUser | null;
  signInAsUser: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setAuthUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
  setSignInAsUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  // Authentication status checking properties
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  // Session management (optional - not all auth providers support this)
  checkUserSession?: () => Promise<void>;
};
