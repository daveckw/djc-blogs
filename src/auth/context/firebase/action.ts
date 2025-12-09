'use client';

import type { UserCredential, User as FirebaseUser } from 'firebase/auth';

import i18next from 'i18next';
import { formatPhoneNumber } from 'react-phone-number-input';
import {
    doc,
    query,
    where,
    setDoc,
    getDoc,
    getDocs,
    collection,
    getCountFromServer,
} from 'firebase/firestore';
import {
    updateProfile,
    signOut as _signOut,
    signInWithPopup as _signInWithPopup,
    GoogleAuthProvider as _GoogleAuthProvider,
    GithubAuthProvider as _GithubAuthProvider,
    TwitterAuthProvider as _TwitterAuthProvider,
    sendPasswordResetEmail as _sendPasswordResetEmail,
    signInWithEmailAndPassword as _signInWithEmailAndPassword,
    createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
} from 'firebase/auth';

import capitalizeFirstLetter from 'src/utility-functions/format-first-letter';
import removeSpecialChars from 'src/utility-functions/removeSpecialCharacters';

import { CONFIG } from 'src/global-config';
import { db, auth } from 'src/lib/firebase';
import isIQI from 'src/utility-functions/common-functions/isIQI';
import type { UserType } from 'functions/types/userTypes';

// ----------------------------------------------------------------------

/* Type definitions */
export type SignInParams = {
    email: string;
    password: string;
};

export type SignUpParams = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    setUser: (user: UserType | null) => void;
    setAuthUser: (user: (FirebaseUser & { loginType: string }) | null) => void;
    signUpReferral: SignUpReferralType;
};

export type ForgotPasswordParams = {
    email: string;
};

export type CreateNewUserInDBParams = {
    displayName: string;
    email: string;
    phone: string;
    authUser: FirebaseUser;
    signUpReferral: SignUpReferralType;
};

// Sign up referral type
export type SignUpReferralType = {
    shortId: string;
    fullId: string;
};

interface ExtendedUser extends FirebaseUser {
    accessToken?: string;
}

interface ExtendedUserCredential extends UserCredential {
    user: ExtendedUser;
    _tokenResponse?: {
        email?: string;
    };
}
/* Type definitions */

/* Utility functions */
// Load user from Firestore
export const loadUser = async (email: string): Promise<UserType | null> => {
    try {
        const userRef = doc(db, 'users', email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userInFs = { ...userSnap.data(), id: userSnap.id };
            return userInFs;
        }
        return null;
    } catch (error) {
        console.log('Error during loading user: ', error);
        return null;
    }
};

// Create new user document record
export const createNewUserInDb = async ({
    displayName,
    email,
    phone,
    authUser,
    signUpReferral,
}: CreateNewUserInDBParams) => {
    let userId = 0;

    try {
        const collectionRef = collection(db, 'users');
        const snapshot = await getCountFromServer(collectionRef);
        const count = snapshot.data().count;
        userId = count + 1;

        const userRef = doc(db, 'users', email);

        // Format client ID
        let clientId = removeSpecialChars(email);

        if (isIQI()) {
            clientId = removeSpecialChars(email) + '_iqi';
        }

        if (CONFIG.environment === 'stage') {
            clientId = clientId + '_staging';
        }

        // Check for duplicate client ID
        const q = query(collectionRef, where('clientId', '==', clientId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            clientId = clientId + userId;
        }

        const hostname = window.location.hostname;

        const userData = {
            date: new Date(),
            email,
            phone,
            displayName,
            id: email,
            uid: authUser.uid,
            clientId,
            referral: signUpReferral.fullId,
            referralId: signUpReferral.shortId,
            userId,
            imageGenerationCredit: 10,
            hostname,
        };

        await setDoc(userRef, userData, { merge: true });

        // Logging
        console.log('New user document created: ', userData);

        return userData;
    } catch (error) {
        console.error('Error during creating new user: ', error);
        return null;
    }
};
/* Utility functions */

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async (
    { email, password }: SignInParams,
    setUser: (user: UserType | null) => void,
    setAuthUser: (user: (FirebaseUser & { loginType: string }) | null) => void
): Promise<UserType | null> => {
    try {
        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Authenticate with Firebase Auth
        const { user } = await _signInWithEmailAndPassword(auth, normalizedEmail, password);

        // Load user data from Firestore
        const userInFs = await loadUser(user.email!);

        if (userInFs) {
            const authUser = {
                ...user,
                loginType: 'email',
            };

            // Update context and localStorage
            setUser(userInFs);
            setAuthUser(authUser);
            localStorage.setItem('user', JSON.stringify(userInFs));
            localStorage.setItem('authUser', JSON.stringify(authUser));
            return userInFs;
        }

        return null;
    } catch (error: any) {
        console.error('Error during sign in with password: ', error);

        const newError = error as { code?: string; message?: string };

        // Format the error message
        if (newError.code === 'auth/user-not-found') {
            newError.message = i18next.t('auth/generalAuthentication:invalidEmail');
        } else if (newError.code === 'auth/wrong-password') {
            newError.message = i18next.t('auth/generalAuthentication:invalidPassword');
        }

        throw newError;
    }
};

export const signInWithGoogle = async (
    setUser: (user: UserType | null) => void,
    setAuthUser: (user: (FirebaseUser & { loginType: string }) | null) => void,
    signUpReferral: SignUpReferralType
): Promise<UserType | null> => {
    const provider = new _GoogleAuthProvider();

    provider.addScope('email');

    try {
        const response = (await _signInWithPopup(auth, provider)) as ExtendedUserCredential;

        // Logging
        console.log('Response from sign in with Google: ', response);

        const email = response._tokenResponse?.email;

        if (email) {
            // Logging
            console.log('Email from sign in with Google: ', email);

            const authUser = {
                ...response.user,
                email,
                emailVerified: true,
                loginType: 'google',
                displayName: response.user.displayName ?? '',
            };

            // Check if the user exists in Firestore
            const userInFs = await loadUser(email);

            // If the user exists in Firestore, update the context and localStorage
            if (userInFs) {
                setUser(userInFs);
                setAuthUser(authUser);
                localStorage.setItem('user', JSON.stringify(userInFs));
                localStorage.setItem('authUser', JSON.stringify(authUser));
                return userInFs;
            } else {
                // If the user does not exist in Firestore, create a new user document record

                try {
                    const newUserData = {
                        displayName: response.user.displayName ?? '',
                        email,
                        phone: '',
                        authUser,
                        signUpReferral,
                    };

                    const newUser = await createNewUserInDb(newUserData);

                    if (!newUser) {
                        throw new Error('Failed to create new user');
                    }

                    setUser(newUser);
                    setAuthUser(authUser);
                    localStorage.setItem('user', JSON.stringify(newUser));
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    return newUser;
                } catch (error) {
                    console.error('Error during creating new user: ', error);
                }
            }
        }

        return null;
    } catch (error) {
        console.error('Error during sign in with Google: ', error);

        throw error;
    }
};

export const signInWithGithub = async (): Promise<void> => {
    const provider = new _GithubAuthProvider();
    await _signInWithPopup(auth, provider);
};

export const signInWithTwitter = async (): Promise<void> => {
    const provider = new _TwitterAuthProvider();
    await _signInWithPopup(auth, provider);
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
    fullName,
    email,
    phone,
    password,
    setUser,
    setAuthUser,
    signUpReferral,
}: SignUpParams): Promise<void> => {
    try {
        // Format the form data
        const formattedPhone = formatPhoneNumber(phone);
        const formattedEmail = email.toLowerCase().trim();

        const userCredential = await _createUserWithEmailAndPassword(auth, email, password);
        const displayName = capitalizeFirstLetter(fullName);

        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName });

            // Logging
            console.log("User's display name has been updated");
        }

        const authUser = {
            ...userCredential.user,
            loginType: 'email',
        };

        // Logging
        console.log("User's profile: ", authUser);

        // Create new user document data
        const createUserData = {
            displayName,
            email: formattedEmail,
            phone: formattedPhone,
            setUser,
            authUser,
            signUpReferral,
        };

        const user = await createNewUserInDb(createUserData);

        setAuthUser(authUser);
        setUser(user);

        //# The user is already set in the on snapshot function in auth provider
        // Set the auth user to local storage
        localStorage.setItem('authUser', JSON.stringify(authUser));
    } catch (error) {
        console.error('Error during sign up:', error);

        const newError = error as { code?: string; message?: string };

        // Format the error message
        if (newError.code === 'auth/email-already-in-use') {
            newError.message = i18next.t('auth/generalAuthentication:emailAlreadyInUse');
        }

        throw newError;
    }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
    await _signOut(auth);
};

// Sign out with cleanup
export const signOutWithCleanup = async (
    setUser: (user: UserType | null) => void,
    setAuthUser: (user: FirebaseUser | null) => void
): Promise<void> => {
    try {
        // Sign out from Firebase Auth
        await _signOut(auth);

        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('authUser');

        // Clear context
        setUser(null);
        setAuthUser(null);

        // Clear axios authorization header
        delete (window as any).axios?.defaults?.headers?.common?.Authorization;
    } catch (error) {
        console.error('Error during sign out:', error);
        throw error;
    }
};

/** **************************************
 * Reset password
 *************************************** */
export const sendPasswordResetEmail = async ({ email }: ForgotPasswordParams): Promise<void> => {
    await _sendPasswordResetEmail(auth, email);
};
