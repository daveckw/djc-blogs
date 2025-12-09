import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  getDocs,
  getDoc,
  query,
  where,
  orderBy as firestoreOrderBy,
  limit,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { kebabCase } from 'es-toolkit';
import { db } from 'src/lib/firebase';
import type { IPostItem } from 'src/types/blog';

// ----------------------------------------------------------------------

/**
 * Generate a slug from a title
 * @param title - The post title
 * @returns A kebab-case slug
 */
function generateSlug(title: string): string {
  return kebabCase(title);
}

// ----------------------------------------------------------------------

/**
 * Upload cover image to Firebase Storage
 * @param file - The image file to upload
 * @param postId - Optional post ID for organizing files
 * @returns The download URL of the uploaded image
 */
export async function uploadPostCover(file: File, postId?: string): Promise<string> {
  try {
    const storage = getStorage();
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storagePath = postId
      ? `posts/${postId}/cover/${fileName}`
      : `posts/temp/${fileName}`;

    const storageRef = ref(storage, storagePath);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Cover image uploaded successfully');

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading cover image:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Add a new blog post to Firestore
 * @param postData - The post data from the form
 * @param author - The author information
 * @returns The ID of the newly created post
 */
export async function addPost(
  postData: {
    title: string;
    description: string;
    content: string;
    coverUrl: File | string | null;
    tags: string[];
    metaKeywords: string[];
    metaTitle: string;
    metaDescription: string;
  },
  author: {
    name: string;
    email: string;
    avatarUrl?: string;
  },
  publish: boolean = true
): Promise<string> {
  try {
    // First, create the post document to get an ID
    const postsCollection = collection(db, 'posts');

    // Prepare the post data
    const slug = generateSlug(postData.title);
    const newPostData = {
      title: postData.title,
      slug: slug,
      description: postData.description,
      content: postData.content,
      coverUrl: '', // Will be updated after upload
      tags: postData.tags,
      metaKeywords: postData.metaKeywords,
      metaTitle: postData.metaTitle || postData.title,
      metaDescription: postData.metaDescription || postData.description,
      publish: publish ? 'published' : 'draft',
      author: {
        name: author.name,
        email: author.email,
        avatarUrl: author.avatarUrl || '',
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      totalViews: 0,
      totalShares: 0,
      totalComments: 0,
      totalFavorites: 0,
      comments: [],
      favoritePerson: [],
    };

    // Add the post document
    const docRef = await addDoc(postsCollection, newPostData);
    console.log('Post created with ID:', docRef.id);

    // Handle cover image upload if it's a File object
    let coverUrl = '';
    if (postData.coverUrl instanceof File) {
      coverUrl = await uploadPostCover(postData.coverUrl, docRef.id);

      // Update the post document with the cover URL
      await updateDoc(doc(db, 'posts', docRef.id), {
        coverUrl: coverUrl,
      });
      console.log('Cover URL updated in post document');
    } else if (typeof postData.coverUrl === 'string') {
      // If coverUrl is already a string (URL), use it directly
      coverUrl = postData.coverUrl;
      await updateDoc(doc(db, 'posts', docRef.id), {
        coverUrl: coverUrl,
      });
    }

    console.log('Post added successfully to Firestore');
    return docRef.id;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Update an existing blog post in Firestore
 * @param postId - The ID of the post to update
 * @param postData - The updated post data
 * @param author - The author information (optional, only if changing author)
 * @returns void
 */
export async function updatePost(
  postId: string,
  postData: {
    title?: string;
    description?: string;
    content?: string;
    coverUrl?: File | string | null;
    tags?: string[];
    metaKeywords?: string[];
    metaTitle?: string;
    metaDescription?: string;
  },
  publish?: boolean
): Promise<void> {
  try {
    const postRef = doc(db, 'posts', postId);

    // Prepare update data
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };

    // Add fields that are provided
    if (postData.title !== undefined) {
      updateData.title = postData.title;
      updateData.slug = generateSlug(postData.title);
    }
    if (postData.description !== undefined) updateData.description = postData.description;
    if (postData.content !== undefined) updateData.content = postData.content;
    if (postData.tags !== undefined) updateData.tags = postData.tags;
    if (postData.metaKeywords !== undefined) updateData.metaKeywords = postData.metaKeywords;
    if (postData.metaTitle !== undefined) updateData.metaTitle = postData.metaTitle;
    if (postData.metaDescription !== undefined) updateData.metaDescription = postData.metaDescription;
    if (publish !== undefined) updateData.publish = publish ? 'published' : 'draft';

    // Handle cover image upload if it's a File object
    if (postData.coverUrl instanceof File) {
      const coverUrl = await uploadPostCover(postData.coverUrl, postId);
      updateData.coverUrl = coverUrl;
    } else if (typeof postData.coverUrl === 'string') {
      updateData.coverUrl = postData.coverUrl;
    }

    // Update the document
    await updateDoc(postRef, updateData);
    console.log('Post updated successfully:', postId);
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Increment view count for a post
 * @param postId - The ID of the post
 * @returns void
 */
export async function incrementPostViews(postId: string): Promise<void> {
  try {
    const postRef = doc(db, 'posts', postId);
    const currentData = await import('firebase/firestore').then(m => m.getDoc(postRef));

    if (currentData.exists()) {
      const currentViews = currentData.data().totalViews || 0;
      await updateDoc(postRef, {
        totalViews: currentViews + 1,
      });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Increment share count for a post
 * @param postId - The ID of the post
 * @returns void
 */
export async function incrementPostShares(postId: string): Promise<void> {
  try {
    const postRef = doc(db, 'posts', postId);
    const currentData = await import('firebase/firestore').then(m => m.getDoc(postRef));

    if (currentData.exists()) {
      const currentShares = currentData.data().totalShares || 0;
      await updateDoc(postRef, {
        totalShares: currentShares + 1,
      });
    }
  } catch (error) {
    console.error('Error incrementing shares:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Convert Firestore document to IPostItem
 * @param doc - Firestore document snapshot
 * @returns IPostItem object
 */
function convertDocToPost(docSnapshot: any): IPostItem {
  const data = docSnapshot.data();

  // Generate slug if it doesn't exist (for backward compatibility)
  const slug = data.slug || generateSlug(data.title || '');

  return {
    id: docSnapshot.id,
    title: data.title || '',
    slug: slug,
    description: data.description || '',
    content: data.content || '',
    coverUrl: data.coverUrl || '',
    tags: data.tags || [],
    metaKeywords: data.metaKeywords || [],
    metaTitle: data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    publish: data.publish || 'draft',
    author: data.author || { name: 'Anonymous', avatarUrl: '' },
    createdAt: data.createdAt?.toDate?.() || new Date(),
    totalViews: data.totalViews || 0,
    totalShares: data.totalShares || 0,
    totalComments: data.totalComments || 0,
    totalFavorites: data.totalFavorites || 0,
    comments: data.comments || [],
    favoritePerson: data.favoritePerson || [],
  } as IPostItem;
}

// ----------------------------------------------------------------------

/**
 * Get all posts from Firestore
 * @returns Array of posts
 */
export async function getPosts(): Promise<IPostItem[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, firestoreOrderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const posts: IPostItem[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(convertDocToPost(doc));
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Get a single post by ID
 * @param postId - The ID of the post
 * @returns The post data
 */
export async function getPost(postId: string): Promise<IPostItem | null> {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      return convertDocToPost(postSnap);
    }

    return null;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Get a single post by title or slug
 * @param titleOrSlug - The title or slug of the post
 * @returns The post data
 */
export async function getPostByTitle(titleOrSlug: string): Promise<IPostItem | null> {
  try {
    const postsCollection = collection(db, 'posts');

    // First try to find by slug (since URLs use slugs)
    let q = query(postsCollection, where('slug', '==', titleOrSlug), limit(1));
    let querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return convertDocToPost(querySnapshot.docs[0]);
    }

    // If not found by slug, try by exact title match
    q = query(postsCollection, where('title', '==', titleOrSlug), limit(1));
    querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return convertDocToPost(querySnapshot.docs[0]);
    }

    return null;
  } catch (error) {
    console.error('Error fetching post by title:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Get latest posts (excluding a specific post)
 * @param excludePostId - Optional post ID to exclude
 * @param limitCount - Number of posts to return
 * @returns Array of latest posts
 */
export async function getLatestPosts(
  excludePostId?: string,
  limitCount: number = 5
): Promise<IPostItem[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(
      postsCollection,
      where('publish', '==', 'published'),
      firestoreOrderBy('createdAt', 'desc'),
      limit(limitCount + (excludePostId ? 1 : 0))
    );

    const querySnapshot = await getDocs(q);
    const posts: IPostItem[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== excludePostId) {
        posts.push(convertDocToPost(doc));
      }
    });

    return posts.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Search posts by title or content
 * @param searchQuery - The search query
 * @returns Array of matching posts
 */
export async function searchPosts(searchQuery: string): Promise<IPostItem[]> {
  try {
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);

    const posts: IPostItem[] = [];
    const searchLower = searchQuery.toLowerCase();

    querySnapshot.forEach((doc) => {
      const post = convertDocToPost(doc);
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const descriptionMatch = post.description.toLowerCase().includes(searchLower);
      const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      if (titleMatch || descriptionMatch || tagsMatch) {
        posts.push(post);
      }
    });

    return posts;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Subscribe to real-time posts updates
 * @param callback - Callback function to handle posts updates
 * @returns Unsubscribe function
 */
export function subscribeToPost(callback: (posts: IPostItem[]) => void): () => void {
  const postsCollection = collection(db, 'posts');
  const q = query(postsCollection, firestoreOrderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
    const posts: IPostItem[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(convertDocToPost(doc));
    });
    callback(posts);
  });

  return unsubscribe;
}

// ----------------------------------------------------------------------

/**
 * Delete a post from Firestore
 * @param postId - The ID of the post to delete
 * @returns void
 */
export async function deletePost(postId: string): Promise<void> {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    console.log('Post deleted successfully:', postId);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

/**
 * Utility function to add slugs to existing posts that don't have them
 * Run this once to migrate existing posts
 * @returns Number of posts updated
 */
export async function addSlugsToExistingPosts(): Promise<number> {
  try {
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);

    let updatedCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();

      // Check if slug doesn't exist
      if (!data.slug && data.title) {
        const slug = generateSlug(data.title);
        const postRef = doc(db, 'posts', docSnapshot.id);

        await updateDoc(postRef, {
          slug: slug,
        });

        console.log(`Added slug "${slug}" to post "${data.title}"`);
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} posts with slugs`);
    return updatedCount;
  } catch (error) {
    console.error('Error adding slugs to existing posts:', error);
    throw error;
  }
}
