import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'src/lib/firebase';
import mapSnapshot from 'src/utility-functions/mapSnapshot';

type User = {
    id?: string;
    [key: string]: any;
};

export default function loadFoldersRT(user: User, setFolders: any) {
    if (!user.id) {
        return null;
    }

    try {
        const collectionRef = collection(db, 'users', user.id, 'folders');
        const q = query(collectionRef, orderBy('updated', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const folders = mapSnapshot(snapshot);
            setFolders(folders);
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function loadFolders(user: User) {
    try {
        if (!user.id) {
            return [];
        }

        const collectionRef = collection(db, 'users', user.id, 'folders');
        const q = query(collectionRef, orderBy('updated', 'desc'));
        const snapshot = await getDocs(q);
        const folders = mapSnapshot(snapshot);
        return folders;
    } catch (error) {
        console.log(error);
        return [];
    }
}
