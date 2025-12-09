import { collection, doc, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import mapSnapshotTS from '../mapSnapshotTS';

import type { IReseller } from 'functions/types/resellerTypes';
import type { DocumentReference } from 'firebase/firestore';
import type { UserType } from 'functions/types/userTypes';

export type IExtendedReseller = IReseller & {
    id: string;
    isReseller: boolean;
    resellerRef: DocumentReference;
    isAdmin: boolean;
};

//Get the reseller from the database if the user is a reseller
const getReseller = async ({ user }: { user?: UserType }) => {
    let hostname = window.location.hostname;
    if (user?.hostname) {
        hostname = user.hostname;
    }
    const resellersRef = collection(db, 'resellers');
    const queryRef = query(resellersRef, where('hostname', '==', hostname), limit(1));
    const snapshot = await getDocs(queryRef);
    const resellers = mapSnapshotTS<IReseller>(snapshot);
    const reseller = resellers[0] || null;

    if (reseller) {
        const resellerRef = doc(db, 'resellers', reseller.id);

        //Check if the user is an admin of the reseller
        const isAdmin = Boolean(user && reseller.admins && reseller.admins.includes(user.id));

        const extendedReseller: IExtendedReseller = {
            //If the user is a reseller, return the reseller data
            ...reseller,
            isReseller: true,
            resellerRef, //Returns the reseller document reference (not the actual document itself)
            isAdmin,
            admins: reseller.admins || [], // Ensure admins is always an array
        };

        return extendedReseller;
    } else {
        //If the user is not a reseller, return false
        return null;
    }
};

export default getReseller;
