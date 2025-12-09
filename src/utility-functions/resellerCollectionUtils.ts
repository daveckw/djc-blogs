import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

import type {
    IReseller,
    ResellerFeatures,
    ResellerProduct,
} from '../../functions/types/resellerTypes';
import type { UserType } from '../../functions/types/userTypes';

export const getResellerProducts = async (resellerId: string): Promise<ResellerProduct[]> => {
    try {
        const productsCollection = collection(db, 'resellers', resellerId, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const products = productsSnapshot.docs.map((doc) => doc.data() as ResellerProduct);
        return products;
    } catch (error) {
        console.error('Error getting reseller products', error);
        return [];
    }
};

export const getResellerProductsByHostname = async (
    resellerHostname: string
): Promise<ResellerProduct[]> => {
    const resellersCollection = collection(db, 'resellers');
    const q = query(resellersCollection, where('hostname', '==', resellerHostname));
    const resellersSnapshot = await getDocs(q);
    const resellerId = resellersSnapshot.docs[0].id;

    if (!resellersSnapshot?.docs?.length) {
        console.log('No reseller found for hostname', resellerHostname);
        return [];
    }
    const productsSnapshot = await getResellerProducts(resellerId);
    const products = productsSnapshot.map((product) => ({
        ...product,
        id: product.id,
    }));
    return products;
};

export const getResellerCustomers = async (resellerHostname: string): Promise<UserType[]> => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('hostname', '==', resellerHostname));
    const customersSnapshot = await getDocs(q);
    const customers = customersSnapshot.docs.map((doc) => doc.data() as UserType);
    return customers;
};

export const getUserFeatures = (user: UserType, productFeatures: ResellerFeatures[]) => {
    let userFeatures = [...(user?.whitelistedFeatures || []), ...productFeatures];
    if (user.blacklistedFeatures?.length) {
        userFeatures = userFeatures.filter(
            (feature) => !user.blacklistedFeatures?.includes(feature as ResellerFeatures)
        );
    }
    return userFeatures;
};

export const updateUserDoc = async (userId: string, updateData: any) => {
    const userRef = doc(db, 'users', userId);
    try {
        await updateDoc(userRef, updateData);
        console.log('User doc updated successfully');
    } catch (error) {
        console.error('Error updating user doc', error);
    }
};

export const getResellerAdminStatus = async (userId: string): Promise<boolean> => {
    const resellersCollection = collection(db, 'resellers');
    const q = query(resellersCollection, where('admins', 'array-contains', userId));
    const resellersSnapshot = await getDocs(q);
    const reseller = resellersSnapshot.docs[0].data() as IReseller;
    return reseller.admins?.includes(userId) || false;
};
