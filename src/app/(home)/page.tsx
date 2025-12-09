import type { Metadata } from 'next';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'DJC Blogs | AI, Systems & Future of Work',
  description:
    'DJC Blogs – ideas, experiments and stories about AI, systems thinking, sales, and building the future of business.',
};

export default function Page() {
  return <HomeView />;
}
