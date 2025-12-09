import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

export default function mapSnapshotTS<T>(
    snapshot: QuerySnapshot<DocumentData>
): (T & { id: string })[] {
    if (!snapshot.empty) {
        const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as (T & { id: string })[];

        return data;
    }

    return [];
}
