import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/lib/firebase';
import mapSnapshot from 'src/utility-functions/mapSnapshot';

export default async function loadLabels(user, type) {
    try {
        const collectionRef = collection(db, 'users', user.id, 'labels');

        let snapshot;
        if (!type) {
            snapshot = await getDocs(collectionRef);
        } else {
            const q = query(collectionRef, where('type', '==', type));
            snapshot = await getDocs(q);
        }
        const labels = mapSnapshot(snapshot);

        return labels;
    } catch (err) {
        console.log(err);
        return [];
    }
}
