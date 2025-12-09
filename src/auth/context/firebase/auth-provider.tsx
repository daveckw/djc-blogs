'use client';

import type { User as FirebaseUser } from 'firebase/auth';
import type { UserType } from 'functions/types/userTypes';
import type { DocumentSnapshot } from 'firebase/firestore';

import { doc, onSnapshot } from 'firebase/firestore';
import { useMemo, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { db } from 'src/lib/firebase';
import mapDocSnapshot from 'src/utility-functions/mapDocSnapshot';

import { AuthContext } from '../auth-context';

type Props = {
  children: React.ReactNode;
};

/* Utility functions */
// Clear local user data
const clearLocalUser = (setUser: (user: UserType | null) => void) => {
  setUser(null);
  localStorage.removeItem('user');
  localStorage.removeItem('authUser');
};
/* Utility functions */

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [signInAsUser, setSignInAsUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  /* Use effect section */
  useEffect(() => {
    // Get user data from local storage
    const userLocal = JSON.parse(localStorage.getItem('user') || 'null') as UserType | null;

    // Get auth user from local storage
    const authUserLocal = JSON.parse(localStorage.getItem('authUser') || 'null') as
      | (FirebaseUser & { loginType: string })
      | null;

    // Set user data from local storage
    if (userLocal) {
      setUser(userLocal);
    }

    console.log('AuthProvider: Setting up onAuthStateChanged listener');

    const auth = getAuth();
    let unsubscribe = () => {};
    onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        console.log('firebaseUser detected in onAuthStateChanged: ', firebaseUser);
        // Set authUser
        setAuthUser(firebaseUser);

        let email = firebaseUser.email;

        /* Google login section only */
        //# By right when login with google, the email will be null
        if (authUserLocal && authUserLocal.loginType === 'google' && !email) {
          email = firebaseUser.providerData[0].email;
        }

        console.log('Determined email for Firestore lookup: ', email);
        // If the email is still not found, then return
        if (!email) return;
        /* Google login section only */

        const userRef = doc(db, 'users', email);

        unsubscribe = onSnapshot(userRef, async (userSnap: DocumentSnapshot) => {
          if (userSnap.exists()) {
            const userData = {
              ...userSnap.data(),
              id: userSnap.id,
              uid: firebaseUser.uid,
            } as UserType;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            clearLocalUser(setUser);
            return;
          }
          setLoading(false);
        });
      } else {
        clearLocalUser(setUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [authUser]);

  useEffect(() => {
    if (signInAsUser && signInAsUser.id) {
      // Logging
      console.log('Sign in as user id: ', signInAsUser?.id);
      console.log('Sign in as user data: ', signInAsUser);

      const docRef = doc(db, 'users', signInAsUser?.id);
      const unsubscribe = onSnapshot(docRef, (snapshot: DocumentSnapshot) => {
        const userData = mapDocSnapshot(snapshot) as UserType | null;
        if (userData) {
          setUser(userData);
        }
      });
      return unsubscribe;
    }

    return undefined;
  }, [signInAsUser]);
  /* Use effect section */

  // Calculate authentication status
  const authenticated = !!user && !!authUser;
  const unauthenticated = !loading && !authenticated;

  const memoizedValue = useMemo(
    () => ({
      user,
      authUser,
      signInAsUser,
      setUser,
      setAuthUser,
      setSignInAsUser,
      // Add authentication status checking properties
      loading,
      authenticated,
      unauthenticated,
    }),
    [user, authUser, signInAsUser, loading, authenticated, unauthenticated]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
