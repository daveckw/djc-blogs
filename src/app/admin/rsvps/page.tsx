import type { Metadata } from 'next';

import { RSVPDatagridView } from 'src/sections/admin/view/rsvp-datagrid-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Ting Xuan's Birthday Party - Join Us for a Special Celebration!",
  description:
    "You're invited to celebrate Ting Xi's special day! Join us for an unforgettable birthday party filled with fun, games, and memories. RSVP and get all the party details here.",
};

export default function RSVPsPage() {
  return <RSVPDatagridView />;
}
