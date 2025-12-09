import type { Metadata } from 'next';

import { leadingInTheAgeOfAiMeta, LeadingInTheAgeOfAiView } from 'src/sections/articles';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: leadingInTheAgeOfAiMeta.title,
  description: leadingInTheAgeOfAiMeta.description,
};

export default function Page() {
  return <LeadingInTheAgeOfAiView />;
}
