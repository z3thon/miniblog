import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import Link from 'next/link';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

export default async function BlogPage() {
  let posts: any[] = [];
  let count = 0;
  let error: string | null = null;

  try {
    const result = await getBlogPosts({ revalidate: 3600 });
    posts = result.posts || [];
    count = result.count || 0;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load blog posts';
    console.error('Error fetching blog posts:', err);
  }

  return (
    <>
      <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
              Blog Posts {count > 0 && `(${count})`}
            </h1>
            <p className="text-gray-600">Discover our latest articles and stories</p>
          </div>

          {error && (
            <GlassCard className="mb-8 border-red-200">
              <div className="text-red-600">
                <h2 className="text-xl font-semibold mb-2">Error Loading Posts</h2>
                <p>{error}</p>
                <p className="mt-4 text-sm">
                  Make sure you've set your <code className="bg-gray-100 px-2 py-1 rounded">BLOGS_FOR_VERCEL_API_KEY</code> in your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file.
                </p>
              </div>
            </GlassCard>
          )}

          {posts.length === 0 && !error && (
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <GlassCard className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-3 text-[var(--glass-black-dark)] line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div
                    className="text-[var(--glass-gray-dark)] mb-4 line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: post.content_html?.substring(0, 150) + '...' || '',
                    }}
                  />
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--glass-primary)]/20 text-[var(--glass-primary-dark)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {post.published_at && (
                    <time 
                      className="text-sm text-[var(--glass-gray-medium)]"
                      dateTime={post.published_at}
                    >
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </time>
                  )}
                  
                  <div className="mt-4">
                    <span className="text-[var(--glass-primary)] font-semibold text-sm">
                      Read more →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
