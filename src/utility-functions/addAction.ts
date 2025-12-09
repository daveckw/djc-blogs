import { doc, addDoc, updateDoc, arrayUnion, collection } from 'firebase/firestore';

import { db } from 'src/lib/firebase';

export async function addAction(
  lead: any,
  action: string,
  remark: string,
  user: any,
  files?: any,
  apptm?: any,
  others: any = {}
) {
  console.log(apptm);
  console.log(others);
  try {
    const actionData = {
      ...others,
      created: new Date(),
      user: user.email,
      action,
      remark,
      files: files ? files : null,
      apptm: apptm || null,
      userName: user.displayName,
      leadId: lead.id,
    };

    // Adding the action into the actions subcollection inside leads collection
    // The Firebase Function (leadsActionsOnWritten) will automatically sync this to the parent document's actions array
    const collecionRef = collection(db, 'leads', lead.id, 'actions');

    const ref = await addDoc(collecionRef, actionData);
    console.log('Action ' + action + ' added into Firestore');

    // Handle split leads - add to source lead as well
    if (lead.id.includes(':')) {
      const sourceLeadId = lead?.id?.split(':')[0];
      if (sourceLeadId) {
        const sourceLeadActionsRef = collection(db, 'leads', sourceLeadId, 'actions');
        await addDoc(sourceLeadActionsRef, { ...actionData, refId: ref.id });
      }
    }

    // Update lead document with additional metadata
    // Note: actions array and lastAction are automatically synced by Firebase Function
    const docRef = doc(db, 'leads', lead.id);
    let leadUpdateTemplate: any = {
      actionedIds: arrayUnion(user.id),
    };

    // If there is no firstAction, then add one to it, else don't touch the firstAction
    if (!('firstAction' in lead)) {
      console.log('This lead doesnt have first action');
      leadUpdateTemplate = {
        ...leadUpdateTemplate,
        firstAction: actionData,
      };
    }

    if (apptm) {
      await updateDoc(docRef, {
        ...leadUpdateTemplate,
        appointments: arrayUnion(apptm),
      });

      console.log('Updated with appointment');
      console.log(actionData);
    } else if (action === 'Booked Sale') {
      await updateDoc(docRef, {
        ...leadUpdateTemplate,
        bookedSales: arrayUnion(others),
      });

      console.log('Updated with booked sale');
      console.log(actionData);
    } else {
      await updateDoc(docRef, leadUpdateTemplate);

      console.log('Updated lead metadata');
      console.log(actionData);
    }

    return ref.id;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
