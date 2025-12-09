import type { SignUpReferralType } from 'src/auth/context/firebase';

import { doc, limit, query, where, getDoc, getDocs, collection } from 'firebase/firestore';

import { db } from 'src/lib/firebase';
import mapDocSnapshot from 'src/utility-functions/mapDocSnapshot';

/* Type definitions */
export type CheckIfReferralExistProps = {
  referralCode: string | undefined;
  setSignUpReferral: (referral: SignUpReferralType) => void;
};
/* Type definitions */

export const checkIfReferralExist = async ({
  referralCode,
  setSignUpReferral,
}: CheckIfReferralExistProps): Promise<void> => {
  if (!referralCode) return;

  // Logging
  console.log('Checking validity for the referral code: ', referralCode);

  // First checking - mainstream way with referralCode field
  const usersColRef = collection(db, 'users');
  const q = query(usersColRef, where('referralCode', '==', referralCode), limit(1));
  const usersDocRef = doc(db, 'users', referralCode);

  try {
    const usersSnapshot = await getDocs(q);

    if (!usersSnapshot.empty && usersSnapshot.size === 1) {
      // Logging
      console.log('checkIfReferralExist: User= ', usersSnapshot.docs[0].data());

      const referralObj = { ...usersSnapshot.docs[0].data(), id: usersSnapshot.docs[0].id };
      const shortId = (referralObj as { id: string; referralCode: string }).referralCode;
      setSignUpReferral({
        shortId,
        fullId: referralObj.id,
      });

      // Logging
      console.log(
        `checkIfReferralExist: Referral code "${referralCode}" is valid, the id is ${referralObj.id}`
      );
    } else {
      // Legacy checking where initially the param used for referral code in URL is the user's id
      const usersSnapshot2 = await getDoc(usersDocRef);
      const referralObj = mapDocSnapshot(usersSnapshot2);

      if (usersSnapshot2.exists()) {
        // Logging
        console.log('checkIfReferralExist: Legacy User= ', referralObj);

        if (!referralObj) return;
        const shortId = referralObj.id;
        setSignUpReferral({
          shortId,
          fullId: referralObj.id,
        });

        // Logging
        console.log(
          `checkIfReferralExist: Referral code "${referralCode}" is valid, the id is ${referralObj.id}`
        );
      } else {
        // Logging
        console.log(`checkIfReferralExist: Referral code "${referralCode}" is not valid.`);
      }
    }
  } catch (err: any) {
    console.log('checkIfReferralExist: Error= ', err.message);
  }
};
