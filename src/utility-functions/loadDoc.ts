import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/lib/firebase';
import mapDocSnapshot from './mapDocSnapshot';

export default async function loadDoc(collection: string, docId: string) {
    try {
        const docRef = doc(db, collection, docId);
        const snapshot = await getDoc(docRef);
        const data = mapDocSnapshot(snapshot);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
