import { doc, setDoc } from 'firebase/firestore';
import type { ILead } from 'functions/types/leadType';
import { db } from 'src/lib/firebase';

export default async function updateLead(lead: ILead) {
    console.log(lead);
    try {
        const docRef = doc(db, 'leads', lead.id || '');
        await setDoc(docRef, lead, { merge: true });
        console.log(lead.id, ' updated in Database');
    } catch (error) {
        console.log(error);
    }
}
