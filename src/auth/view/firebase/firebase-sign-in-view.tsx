'use client';

import type { UserType } from 'functions/types/userTypes';
import type { SignUpReferralType } from '../../context/firebase';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { db } from 'src/lib/firebase';
import { useTranslate } from 'src/locales';
import mapDocSnapshot from 'src/utility-functions/mapDocSnapshot';
import { checkIfReferralExist } from 'src/functions/authFunctions/checkIfReferralExist';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { getErrorMessage } from '../../utils';
import { FormHead } from '../../components/form-head';
import { signInWithGoogle, signInWithPassword } from '../../context/firebase';

export function FirebaseSignInView() {
  const router = useRouter();

  const { setUser, setAuthUser } = useAuthContext();

  const showPassword = useBoolean();

  const { t } = useTranslate('auth/signIn');
  const { t: tGeneral } = useTranslate('auth/generalAuthentication');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Referral state
  const [signUpReferral, setSignUpReferral] = useState<SignUpReferralType>({
    shortId: '',
    fullId: '',
  });

  /* Sign in form schema */
  type SignInSchemaType = zod.infer<typeof SignInSchema>;

  const SignInSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: `${t('emailRequired')}` })
      .email({ message: t('emailInvalid') }),
    password: zod
      .string()
      .min(1, { message: t('passwordRequired') })
      .min(6, { message: t('passwordMin') }),
  });
  /* Sign in form schema */

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Handle sign in form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      // Normalize email
      const normalizedEmail = data.email.toLowerCase().trim();

      // Fetch user doc from Firestore
      const docRef = doc(db, 'users', normalizedEmail);
      const userSnap = await getDoc(docRef);
      const userInFs = mapDocSnapshot<UserType>(userSnap);

      // Check if user exists
      if (!userInFs) {
        throw new Error(tGeneral('userNotFound'));
      }

      // Hostname/domain/permission checks
      const hostname = window.location.hostname;
      if (hostname === 'simplynice.ai') {
        const allowedEmails = [
          'davechong@eliteone.com.my',
          'daveckw@gmail.com',
          'djcventure6@gmail.com',
        ];
        if (!allowedEmails.includes(data.email)) {
          throw new Error(tGeneral('notAuthorized'));
        }
      }

      // Check for user's hostname and permissions (from previous project)
      if (userInFs.hostname) {
        const userHostname = userInFs.hostname;

        // eslint-disable-next-line default-case
        switch (userHostname) {
          case 'explosoftai.com':
          case 'my-aibizbot.com': {
            if (userHostname !== hostname) {
              if (userInFs.canAccessDjc) {
                break; // Allow access
              } else {
                throw new Error(tGeneral('invalidCredentials'));
              }
            }
          }
        }
      }

      // Sign in with Firebase Auth
      const user = await signInWithPassword(
        { email: data.email, password: data.password },
        setUser,
        setAuthUser
      );

      if (user) {
        // Navigate to dashboard
        router.push(paths.dashboard.root);
      }
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    } finally {
      setLoading(false);
    }
  });

  // Handle sign in with Google
  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const user = await signInWithGoogle(setUser, setAuthUser, signUpReferral);

      if (user) {
        // Navigate to dashboard
        router.push(paths.dashboard.root);
      }
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    } finally {
      setLoading(false);
    }
  };

  /* Use effect section */
  // Check referral code validity
  useEffect(() => {
    // Get the referral code from the local storage
    const referralCode = localStorage.getItem('referralCode');

    if (referralCode) {
      // Check if the referral exists in the system
      checkIfReferralExist({ referralCode, setSignUpReferral });
    }
  }, []);
  /* Use effect section */

  // Sign in form
  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      {/* Email address */}
      <Field.Text
        name="email"
        label={t('emailAddress')}
        placeholder={t('emailAddressPlaceholder')}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      {/* Password container */}
      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        {/* Password */}
        <Field.Text
          name="password"
          label={t('password')}
          placeholder={t('passwordPlaceholder')}
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Forgot password */}
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          {t('forgotPassword')}
        </Link>
      </Box>

      {/* Signin button */}
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting || loading}
        loadingIndicator="Sign in..."
      >
        {t('signIn')}
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title={t('formTitle')}
        description={t('formDescription')}
        sx={{ textAlign: { xs: 'center' } }}
      />
      {/* !!!!!!!! Yet to implement translation !!!!!!!! */}
      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      {/* Sign in with Google */}
      <Divider sx={{ mt: 3, fontSize: 12 }}>ALTERNATIVELY</Divider>
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleSignInWithGoogle}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            gap: 2,
          }}
        >
          <Iconify icon="socials:google" width={22} />
          {t('continueWithGoogle')}
        </Button>
      </Stack>

      {/* Sign up section */}
      <Stack spacing={2} alignItems="center" justifyContent="center" direction="row" sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {t('signUpQuestion')}
        </Typography>
        <Button
          component={RouterLink}
          href={paths.auth.firebase.signUp}
          variant="outlined"
          color="primary"
          size="small"
        >
          {t('signUp')}
        </Button>
      </Stack>
    </>
  );
}
