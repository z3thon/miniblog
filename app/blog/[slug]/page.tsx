import { getBlogPost } from '@lztek/blogs-for-vercel-sdk/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '../../components/GlassCard';
import GlassButton from '../../components/GlassButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug, { revalidate: 3600 });
    
    // Extract description from content (will be improved when API supports excerpt)
    const description = post.content_html 
      ? post.content_html.replace(/<[^>]*>/g, '').substring(0, 160).trim()
      : '';
    
    return {
      title: post.title,
      description: post.excerpt || post.subtitle || description,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.subtitle || description,
        images: post.featured_image ? [{ url: post.featured_image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.subtitle || description,
        images: post.featured_image ? [post.featured_image] : [],
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug, { revalidate: 3600 });

    return (
      <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-6">
            <GlassButton variant="outline">
              ← Back to Blog
            </GlassButton>
          </Link>

            <GlassCard className="mb-8 overflow-hidden">
              {/* Featured Image Hero */}
              {post.featured_image && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 -mx-8 -mt-8">
                  <Image
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                </div>
              )}
              
              {/* Hero Section */}
              <header className="mb-8 pb-8 border-b border-gray-200">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 leading-tight">
                  {post.title}
                </h1>
                
                {/* Subtitle/Excerpt */}
                {(post.subtitle || post.excerpt) ? (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.subtitle || post.excerpt}
                  </p>
                ) : post.content_html ? (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.content_html.replace(/<[^>]*>/g, '').substring(0, 200).trim()}
                    {post.content_html.replace(/<[^>]*>/g, '').length > 200 ? '...' : ''}
                  </p>
                ) : null}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  {post.published_at && (
                    <time 
                      dateTime={post.published_at}
                      className="flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </time>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--glass-primary)]/10 text-[var(--glass-primary-dark)] border border-[var(--glass-primary)]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              {/* Content */}
              <div
                className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[var(--glass-primary)] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-[var(--glass-primary-dark)] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:text-gray-600 prose-blockquote:border-[var(--glass-primary)] prose-blockquote:pl-6 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
              />
            </GlassCard>
          </div>
        </main>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

