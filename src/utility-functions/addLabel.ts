import { addDoc, collection, type DocumentReference } from 'firebase/firestore';
import { db } from 'src/lib/firebase';
import type { UserType } from '../../functions/types/userTypes';
import type { ILabel } from 'functions/types/leadType';

type AddLabelInput = Omit<ILabel, 'created' | 'createdBy'>;

interface CreatedBy {
    displayName?: string;
    email: string;
}

interface LabelWithMetadata extends AddLabelInput {
    created: Date;
    createdBy: CreatedBy;
}

export default async function addLabel(
    user: UserType,
    label: AddLabelInput
): Promise<DocumentReference | null> {
    try {
        const collectionRef = collection(db, 'users', user.id, 'labels');
        const newLabel: LabelWithMetadata = {
            ...label,
            created: new Date(),
            createdBy: { displayName: user.displayName, email: user.id },
        };
        const refId = await addDoc(collectionRef, newLabel);
        console.log(refId.id, 'successfully added');
        return refId;
    } catch (error) {
        console.log(error);
        return null;
    }
}
