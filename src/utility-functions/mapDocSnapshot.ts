import type { DocumentData, DocumentSnapshot } from 'firebase/firestore';

export default function mapDocSnapshot<T>(
    snapshot: DocumentSnapshot<DocumentData, DocumentData>
): (T & { id: string }) | null {
    if (snapshot.exists()) {
        const data = {
            ...snapshot.data(),
            id: snapshot.id,
        } as T & { id: string };

        return data;
    }

    return null;
}
