# How to Create Blog Articles for DJC Blogs

This guide explains how to create new blog articles for the DJC Blogs website. Articles are stored as React components instead of in a database, making it easy to write and manage content with AI assistance.

## File Structure

```
src/
├── sections/
│   └── articles/
│       ├── index.ts                           # Barrel export file
│       └── [article-slug].tsx                 # Article component files
├── app/
│   └── blogs/
│       ├── layout.tsx                         # Shared layout for all blog pages
│       └── [article-slug]/
│           └── page.tsx                       # Next.js page for each article
```

## Step 1: Create the Article Component

Create a new file in `src/sections/articles/` with the article slug as the filename.

**File:** `src/sections/articles/[your-article-slug].tsx`

```tsx
'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostDetailsHero } from '../blog/post-details-hero';

// ----------------------------------------------------------------------

const TITLE = 'Your Article Title Here';
const DESCRIPTION = 'A brief description of the article (1-2 sentences) for previews.';
const TAGS = ['Tag1', 'Tag2', 'Tag3'];
const COVER_URL = '/assets/images/blog/blog-1.jpg';
const CREATED_AT = '2025-01-15';
const AUTHOR = {
  name: 'DJC Team',
  avatarUrl: '/assets/images/avatar/avatar-1.webp',
};

// ----------------------------------------------------------------------

export function YourArticleView() {
  return (
    <>
      <PostDetailsHero title={TITLE} author={AUTHOR} coverUrl={COVER_URL} createdAt={CREATED_AT} />

      <Container
        maxWidth={false}
        sx={[(theme) => ({ py: 3, mb: 5, borderBottom: `solid 1px ${theme.vars.palette.divider}` })]}
      >
        <CustomBreadcrumbs
          links={[{ name: 'Home', href: '/' }, { name: 'Blogs', href: '/#blogs' }, { name: TITLE }]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {DESCRIPTION}
          </Typography>

          {/* Article Content */}
          <Typography component="div" sx={{ '& h3': { mt: 4, mb: 2 }, '& h4': { mt: 3, mb: 1.5 }, '& p': { mb: 2, lineHeight: 1.8 }, '& ul, & ol': { mb: 2, pl: 3 }, '& li': { mb: 1 } }}>
            <p>
              Your first paragraph goes here. You can use <strong>bold</strong> and <em>italic</em> text.
            </p>

            <h3>Section Heading</h3>

            <p>
              More paragraph content here. Write naturally as JSX.
            </p>

            <ul>
              <li>Bullet point 1</li>
              <li>Bullet point 2</li>
              <li>Bullet point 3</li>
            </ul>

            <h3>Another Section</h3>

            <p>
              Continue writing your article content directly in JSX.
            </p>

            <ol>
              <li><strong>First item</strong> - with description</li>
              <li><strong>Second item</strong> - with description</li>
              <li><strong>Third item</strong> - with description</li>
            </ol>

            <h3>Conclusion</h3>

            <p>
              Final thoughts and call to action.
            </p>
          </Typography>

          <Box
            sx={[
              (theme) => ({
                py: 3,
                mt: 5,
                gap: 1,
                display: 'flex',
                flexWrap: 'wrap',
                borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              }),
            ]}
          >
            {TAGS.map((tag) => (
              <Chip key={tag} label={tag} variant="soft" />
            ))}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

// Export metadata for the page
export const META = {
  title: `${TITLE} | DJC Blogs`,
  description: DESCRIPTION,
};
```

## Step 2: Export from Index

Add the export to `src/sections/articles/index.ts`:

```ts
export * from './why-djc-chooses-systems-over-talent-hero-worship';
export * from './your-new-article-slug'; // Add this line
```

## Step 3: Create the Next.js Page

Create a folder and page file in `src/app/blogs/`:

**File:** `src/app/blogs/[your-article-slug]/page.tsx`

```tsx
import type { Metadata } from 'next';

import { META, YourArticleView } from 'src/sections/articles';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function Page() {
  return <YourArticleView />;
}
```

## Step 4: Add to Home Page (Optional)

To feature the article on the home page, add it to the `BLOG_POSTS` array in `src/sections/home/view/home-view.tsx`:

```tsx
const BLOG_POSTS = [
  // ... existing posts
  {
    tag: 'Your Tag',
    title: 'Your Article Title',
    excerpt: 'Brief excerpt for the card preview...',
    readTime: 'X min read',
    audience: 'Target audience',
    href: '/blogs/your-article-slug',
  },
];
```

## Article Constants Reference

| Constant | Type | Description |
|----------|------|-------------|
| `TITLE` | string | Full article title |
| `DESCRIPTION` | string | Short description for previews |
| `TAGS` | string[] | Category tags for the article |
| `COVER_URL` | string | Path to cover image |
| `CREATED_AT` | string | Date in 'YYYY-MM-DD' format |
| `AUTHOR` | object | Author name and avatar |

## JSX Content Guidelines

Write content directly in JSX using standard HTML elements:

### Headings
```tsx
<h3>Main Section Heading</h3>
<h4>Subsection Heading</h4>
```

### Paragraphs
```tsx
<p>Regular paragraph text.</p>
<p>Text with <strong>bold</strong> and <em>italic</em> formatting.</p>
```

### Lists
```tsx
<ul>
  <li>Unordered list item</li>
</ul>

<ol>
  <li>Ordered list item</li>
</ol>
```

### Links
```tsx
<p>Check out <a href="/blogs/another-article">this article</a>.</p>
```

## Naming Conventions

1. **File names:** Use kebab-case (lowercase with hyphens)
   - `my-awesome-article.tsx`

2. **Export names:** Use PascalCase for view components
   - `export function MyAwesomeArticleView()`

3. **URL slugs:** Match the file name
   - File: `my-awesome-article.tsx`
   - URL: `/blogs/my-awesome-article`

## Example: Quick AI Prompt

When asking AI to create a new article, provide:

```
Create a new blog article for DJC Blogs:

Topic: [Your topic]
Slug: [url-friendly-slug]
Tags: [Tag1, Tag2]
Target audience: [Who is this for]

Key points to cover:
1. [Point 1]
2. [Point 2]
3. [Point 3]

Follow the guide in src/guides/how-to-create-blog-articles.md
```

## Checklist for New Articles

- [ ] Create article component in `src/sections/articles/[slug].tsx`
- [ ] Add export to `src/sections/articles/index.ts`
- [ ] Create page in `src/app/blogs/[slug]/page.tsx`
- [ ] (Optional) Add to `BLOG_POSTS` in home-view.tsx
- [ ] Verify article loads at `/blogs/[slug]`
