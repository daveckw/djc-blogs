import formatDate from './common-functions/formatDate';
import convertDate from './common-functions/convertDate';
import { type QuerySnapshot } from 'firebase/firestore';

export default function mapSnapshotWithDate<T>(snapshot: QuerySnapshot, date: string): T[] {
    if (!snapshot.empty) {
        const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            path: doc.ref.path,
        })) as Array<Record<string, any> & { id: string; path: string }>;

        data.forEach((item) => {
            item[date] = formatDate(convertDate(item[date]), true);
        });
        return data as T[];
    } else {
        return [] as T[];
    }
}
