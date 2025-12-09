import type { IPostItem } from 'src/types/blog';

import { useState, useEffect, useMemo } from 'react';

import {
  getPosts,
  getPost,
  getPostByTitle,
  getLatestPosts,
  searchPosts,
  subscribeToPost,
} from 'src/functions/blogFunctions';

// ----------------------------------------------------------------------

export function useGetPosts() {
  const [posts, setPosts] = useState<IPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToPost((updatedPosts) => {
      setPosts(updatedPosts);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      posts,
      postsLoading: isLoading,
      postsError: error,
      postsValidating: false,
      postsEmpty: !isLoading && !posts.length,
    }),
    [posts, error, isLoading]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPost(title: string) {
  const [post, setPost] = useState<IPostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!title) {
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const postData = await getPostByTitle(title);
        setPost(postData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [title]);

  const memoizedValue = useMemo(
    () => ({
      post,
      postLoading: isLoading,
      postError: error,
      postValidating: false,
    }),
    [post, error, isLoading]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const [latestPosts, setLatestPosts] = useState<IPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setIsLoading(true);
        // First, get the current post ID by title if provided
        let excludePostId: string | undefined;
        if (title) {
          const currentPost = await getPostByTitle(title);
          excludePostId = currentPost?.id;
        }

        const posts = await getLatestPosts(excludePostId, 5);
        setLatestPosts(posts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPosts();
  }, [title]);

  const memoizedValue = useMemo(
    () => ({
      latestPosts,
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: false,
      latestPostsEmpty: !isLoading && !latestPosts.length,
    }),
    [latestPosts, error, isLoading]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const [searchResults, setSearchResults] = useState<IPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const performSearch = async () => {
      try {
        setIsLoading(true);
        const results = await searchPosts(query);
        setSearchResults(results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const memoizedValue = useMemo(
    () => ({
      searchResults,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: false,
      searchEmpty: !isLoading && !searchResults.length && !!query,
    }),
    [searchResults, error, isLoading, query]
  );

  return memoizedValue;
}
