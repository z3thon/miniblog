import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import GlassCard from './components/GlassCard';
import GlassButton from './components/GlassButton';
import BlogList from './components/BlogList';
import { decodeHtmlEntities } from './utils/htmlEntities';
import Link from 'next/link';

export default async function Home() {
  let posts: any[] = [];
  let count = 0;
  let error: string | null = null;

  try {
    const result = await getBlogPosts({ revalidate: 3600 });
    posts = result.posts || [];
    count = result.count || 0;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch blog posts';
    console.error('Error fetching blog posts:', err);
  }

  // Decode titles before passing to client component
  const postsWithDecodedTitles = posts.map((post) => {
    let decodedTitle: string;
    try {
      decodedTitle = decodeHtmlEntities(post.title);
    } catch (error) {
      decodedTitle = post.title || '';
    }
    return { ...post, title: decodedTitle };
  });

  return (
    <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">
            Mini Blog
          </h1>
          <p className="text-gray-600 mb-4">
            A beautiful blog powered by Blogs-For-Vercel
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/example">
              <GlassButton variant="primary">
                View Example Blog
              </GlassButton>
            </Link>
            <Link href="/preview">
              <GlassButton variant="outline">
                Preview Your Blog
              </GlassButton>
            </Link>
          </div>
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

        {posts.length > 0 && <BlogList posts={postsWithDecodedTitles} />}
      </div>
    </main>
  );
}

