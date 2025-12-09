import {
  getPosts as getPostsFromFirestore,
  getPostByTitle,
  getLatestPosts as getLatestPostsFromFirestore,
} from 'src/functions/blogFunctions';

// ----------------------------------------------------------------------

export async function getPosts() {
  const posts = await getPostsFromFirestore();

  return { posts };
}

// ----------------------------------------------------------------------

export async function getPost(title: string) {
  const post = await getPostByTitle(title);

  return { post };
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title: string) {
  // First, get the current post to exclude it
  let excludePostId: string | undefined;
  if (title) {
    const currentPost = await getPostByTitle(title);
    excludePostId = currentPost?.id;
  }

  const latestPosts = await getLatestPostsFromFirestore(excludePostId, 5);

  return { latestPosts };
}
