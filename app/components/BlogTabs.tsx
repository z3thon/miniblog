'use client';

import { useState } from 'react';
import GlassCard from './GlassCard';
import GlassButton from './GlassButton';
import BlogList from './BlogList';
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

interface BlogTabsProps {
  examplePosts: Post[];
  exampleCount: number;
  exampleError: string | null;
}

export default function BlogTabs({ examplePosts, exampleCount, exampleError }: BlogTabsProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'example'>('preview');
  const [apiKey, setApiKey] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      {/* Tab Buttons */}
      <div className="mb-8">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'preview'
                ? 'border-[var(--glass-primary)] text-[var(--glass-primary)]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Preview Your Blog
          </button>
          <button
            onClick={() => setActiveTab('example')}
            className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
              activeTab === 'example'
                ? 'border-[var(--glass-primary)] text-[var(--glass-primary)]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            View Example Blog
          </button>
        </div>
      </div>

      {/* Preview Tab Content */}
      {activeTab === 'preview' && (
        <>
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
            <BlogList posts={posts} />
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
              </div>
            </GlassCard>
          )}
        </>
      )}

      {/* Example Tab Content */}
      {activeTab === 'example' && (
        <>
          {exampleError && (
            <GlassCard className="mb-8 border-red-200">
              <div className="text-red-600">
                <h2 className="text-xl font-semibold mb-2">Error Loading Posts</h2>
                <p>{exampleError}</p>
                <p className="mt-4 text-sm">
                  Make sure you've set your <code className="bg-gray-100 px-2 py-1 rounded">BLOGS_FOR_VERCEL_API_KEY</code> in your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file.
                </p>
              </div>
            </GlassCard>
          )}

          {examplePosts.length === 0 && !exampleError && (
            <GlassCard>
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--glass-black-dark)]">
                  No posts yet
                </h2>
                <p className="text-[var(--glass-gray-dark)] mb-6">
                  Start creating content in your Blogs-For-Vercel dashboard!
                </p>
                <GlassButton
                  href="https://blogsforvercel.com/dashboard/posts"
                  variant="primary"
                >
                  Create Your First Post
                </GlassButton>
              </div>
            </GlassCard>
          )}

          {examplePosts.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Showing {exampleCount} post{exampleCount !== 1 ? 's' : ''} from the example API key
                </p>
              </div>
              <BlogList posts={examplePosts} />
            </>
          )}
        </>
      )}
    </>
  );
}
