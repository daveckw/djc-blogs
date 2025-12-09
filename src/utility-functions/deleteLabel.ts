import { deleteDoc, doc } from 'firebase/firestore';
import type { ILabel } from 'functions/types/leadType';
import type { UserType } from 'functions/types/userTypes';
import { db } from 'src/lib/firebase';

export default async function deleteLabel(user: UserType, label: ILabel & { id: string }) {
    console.log(label, user);
    try {
        const docRef = doc(db, 'users', user.id, 'labels', label.id);
        await deleteDoc(docRef);
        console.log('Deleted label: ' + label.name);
    } catch (error) {
        console.log(error);
    }
}
