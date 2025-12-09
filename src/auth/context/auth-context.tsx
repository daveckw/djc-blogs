'use client';

import type { AuthContextValue } from '../types';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  authUser: null,
  signInAsUser: null,
  setUser: () => {},
  setAuthUser: () => {},
  setSignInAsUser: () => {},
  loading: false,
  authenticated: false,
  unauthenticated: false,
});
