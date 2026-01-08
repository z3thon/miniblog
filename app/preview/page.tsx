'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { decodeHtmlEntities } from '../utils/htmlEntities';

interface Post {
  id: string;
  slug: string;
  title: string;
  content_html?: string;
  featured_image?: string;
  featured_image_alt?: string;
  tags?: string[];
  published_at?: string;
}

export default function PreviewPage() {
  const [apiKey, setApiKey] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFetchPosts = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPosts([]);
    setCount(0);

    try {
      const response = await fetch(`/api/posts?apiKey=${encodeURIComponent(apiKey)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch posts');
      }

      // Decode titles before setting posts
      const postsWithDecodedTitles = (data.posts || []).map((post: Post) => {
        let decodedTitle: string;
        try {
          decodedTitle = decodeHtmlEntities(post.title);
        } catch (err) {
          decodedTitle = post.title || '';
        }
        return { ...post, title: decodedTitle };
      });

      setPosts(postsWithDecodedTitles);
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content_html?.toLowerCase().includes(query) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
                Blog Preview
              </h1>
              <p className="text-gray-600">
                Enter your own Blogs-For-Vercel API key to preview your blog posts
              </p>
            </div>
            <Link href="/example">
              <GlassButton variant="outline" className="whitespace-nowrap">
                View Example →
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* API Key Input */}
        <GlassCard className="mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <div className="flex gap-4">
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFetchPosts();
                    }
                  }}
                  placeholder="Enter your Blogs-For-Vercel API key"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--glass-primary)] focus:border-transparent"
                />
                <GlassButton
                  onClick={handleFetchPosts}
                  variant="primary"
                  disabled={isLoading}
                  className="whitespace-nowrap"
                >
                  {isLoading ? 'Loading...' : 'Load Posts'}
                </GlassButton>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your API key is never saved or stored. It's only used to fetch your posts. 
                <Link href="/example" className="text-[var(--glass-primary)] hover:underline ml-1">
                  See example using .env.local API key
                </Link>
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Error Display */}
        {error && (
          <GlassCard className="mb-8 border-red-200">
            <div className="text-red-600">
              <h2 className="text-xl font-semibold mb-2">Error Loading Posts</h2>
              <p>{error}</p>
              <p className="mt-4 text-sm">
                Make sure your API key is correct and you have posts published in your{' '}
                <a
                  href="https://blogsforvercel.com/dashboard/posts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-700"
                >
                  Blogs-For-Vercel dashboard
                </a>
                .
              </p>
            </div>
          </GlassCard>
        )}

        {/* Loading State */}
        {isLoading && (
          <GlassCard>
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--glass-primary)]"></div>
              <p className="mt-4 text-gray-600">Loading your blog posts...</p>
            </div>
          </GlassCard>
        )}

        {/* Posts Display */}
        {posts.length > 0 && !isLoading && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Posts {count > 0 && `(${count})`}
                </h2>
              </div>

              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blog posts..."
                  className="w-full px-4 py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--glass-primary)] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => {
                  // Extract excerpt from content_html and decode HTML entities
                  let excerpt = '';
                  if (post.content_html) {
                    const rawExcerpt = post.content_html.replace(/<[^>]*>/g, '').substring(0, 150).trim();
                    excerpt = decodeHtmlEntities(rawExcerpt);
                  }

                  return (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <GlassCard className="h-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden">
                        {/* Featured Image */}
                        {post.featured_image ? (
                          <div className="relative w-full h-48 mb-4 -mx-8 -mt-8">
                            <Image
                              src={post.featured_image}
                              alt={post.featured_image_alt || post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-[var(--glass-primary)]/10 to-[var(--glass-primary)]/5 rounded-t-lg mb-4 flex items-center justify-center">
                            <svg className="w-16 h-16 text-[var(--glass-primary)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1 flex flex-col">
                          <h2
                            className="text-2xl font-bold mb-2 text-gray-900 line-clamp-2 leading-tight"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />

                          {excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                              {excerpt}...
                            </p>
                          )}

                          <div className="mt-auto">
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--glass-primary)]/10 text-[var(--glass-primary-dark)] border border-[var(--glass-primary)]/20"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              {post.published_at && (
                                <time
                                  className="text-xs text-gray-500"
                                  dateTime={post.published_at}
                                >
                                  {new Date(post.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    timeZone: 'UTC',
                                  })}
                                </time>
                              )}

                              <span className="text-[var(--glass-primary)] font-semibold text-sm flex items-center gap-1">
                                Read more
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <GlassCard>
                <div className="text-center py-12">
                  <p className="text-gray-600">No posts found matching "{searchQuery}"</p>
                </div>
              </GlassCard>
            )}
          </>
        )}

        {/* Empty State */}
        {posts.length === 0 && !error && !isLoading && (
          <GlassCard>
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4 text-[var(--glass-black-dark)]">
                No posts loaded yet
              </h2>
              <p className="text-[var(--glass-gray-dark)] mb-6">
                Enter your API key above to preview your blog posts
              </p>
              <Link href="/example">
                <GlassButton variant="outline" className="mt-4">
                  Or view example blog →
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        )}
      </div>
    </main>
  );
}

