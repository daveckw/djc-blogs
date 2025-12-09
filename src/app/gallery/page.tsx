import type { Metadata } from 'next';

import { GalleryView } from 'src/sections/gallery/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Ting Xi's Photo Gallery - Beautiful Memories",
  description:
    "Explore beautiful photos and memories from Ting Xi's special moments. A gallery showcasing precious family moments and celebrations.",
};

export default function Page() {
  return <GalleryView />;
}
