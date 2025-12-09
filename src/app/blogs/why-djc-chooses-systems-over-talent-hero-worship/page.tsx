import type { Metadata } from 'next';

import { ARTICLE_DATA, ArticleSystemsOverHeroesView } from 'src/sections/articles';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: ARTICLE_DATA.metaTitle,
  description: ARTICLE_DATA.metaDescription,
  keywords: ARTICLE_DATA.metaKeywords,
};

export default function Page() {
  return <ArticleSystemsOverHeroesView />;
}
