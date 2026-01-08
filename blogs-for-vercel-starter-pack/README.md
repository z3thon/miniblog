# Blogs-For-Vercel Starter Pack

Complete guide for integrating Blogs-For-Vercel into your Next.js application using the official SDK.

## 📚 Table of Contents

- [What is Blogs-For-Vercel?](#what-is-blogs-for-vercel)
- [Quick Start](#quick-start)
- [Getting Your API Key](#getting-your-api-key)
- [Installation](#installation)
- [Server Components (Recommended)](#server-components-recommended)
- [Client Components](#client-components)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## What is Blogs-For-Vercel?

Blogs-For-Vercel is a headless CMS API service designed specifically for Next.js applications hosted on Vercel. It provides:

- ✅ **Simple API** - RESTful endpoints for blog post management
- ✅ **Markdown Support** - Write posts in Markdown, get HTML output
- ✅ **Tag System** - Organize posts with tags
- ✅ **SDK Integration** - Official SDK for seamless Next.js integration
- ✅ **ISR Support** - Built-in Incremental Static Regeneration
- ✅ **Edge Compatible** - Works with Edge Runtime
- ✅ **TypeScript** - Full TypeScript support

## Quick Start

### 1. Get Your API Key

1. Sign up at [https://blogsforvercel.com](https://blogsforvercel.com)
2. Navigate to **API Keys** in your dashboard
3. Create a new API key
4. Copy the key (you'll need it in the next step)

### 2. Install the SDK

```bash
npm install @lztek/blogs-for-vercel-sdk
```

### 3. Set Environment Variables

Create a `.env.local` file in your project root:

```env
# For Server Components (recommended)
BLOGS_FOR_VERCEL_API_KEY=your_api_key_here

# Optional: Custom base URL (defaults to https://blogsforvercel.com)
BLOGS_FOR_VERCEL_BASE_URL=https://blogsforvercel.com
```

### 4. Create Your First Blog Page

**App Router** (`app/blog/page.tsx`):

```tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import Link from 'next/link';

export default async function BlogPage() {
  const { posts } = await getBlogPosts({ revalidate: 3600 });
  
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
        </article>
      ))}
    </div>
  );
}
```

**That's it!** Your blog is now integrated. 🎉

## Getting Your API Key

### Step 1: Sign Up

1. Visit [https://blogsforvercel.com](https://blogsforvercel.com)
2. Click **Sign Up** or **Get Started**
3. Complete the registration process

### Step 2: Create an Organization

1. After signing up, you'll be prompted to create an organization
2. Enter your organization name (e.g., "My Blog")
3. Complete the onboarding process

### Step 3: Generate API Key

1. Navigate to **Dashboard** → **API Keys**
2. Click **Create New API Key**
3. Give it a descriptive name (e.g., "Production Blog")
4. Copy the API key immediately (it won't be shown again)

### Step 4: Create Your First Post

1. Go to **Dashboard** → **Posts**
2. Click **New Post**
3. Write your content in Markdown
4. Add tags (optional)
5. Click **Publish** when ready

## Installation

### NPM

```bash
npm install @lztek/blogs-for-vercel-sdk
```

### Yarn

```bash
yarn add @lztek/blogs-for-vercel-sdk
```

### PNPM

```bash
pnpm add @lztek/blogs-for-vercel-sdk
```

### Requirements

- **Next.js**: 14+ (App Router) or 13+ (Pages Router)
- **React**: 18+ or 19+
- **TypeScript**: 5.0+ (recommended)

## Server Components (Recommended)

Server Components are the recommended approach because they provide:

- ✅ Better performance (server-side rendering)
- ✅ Automatic request deduplication
- ✅ Built-in caching and ISR support
- ✅ SEO-friendly
- ✅ Secure (API key stays on server)

### Basic Blog List

```tsx
// app/blog/page.tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function BlogPage() {
  const { posts, count } = await getBlogPosts({ revalidate: 3600 });
  
  return (
    <div>
      <h1>Blog Posts ({count})</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
        </article>
      ))}
    </div>
  );
}
```

### Single Blog Post

```tsx
// app/blog/[slug]/page.tsx
import { getBlogPost } from '@lztek/blogs-for-vercel-sdk/server';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const post = await getBlogPost(params.slug, { revalidate: 3600 });
    
    return (
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
        {post.tags.length > 0 && (
          <div>
            Tags: {post.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}
```

### Filter by Tags

```tsx
// app/blog/tag/[tag]/page.tsx
import { getBlogPostsByTag } from '@lztek/blogs-for-vercel-sdk/server';

export default async function TagPage({ 
  params 
}: { 
  params: { tag: string } 
}) {
  const { posts } = await getBlogPostsByTag(params.tag, { revalidate: 3600 });
  
  return (
    <div>
      <h1>Posts tagged: {params.tag}</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

### Advanced Options

```tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function BlogPage() {
  const { posts } = await getBlogPosts({
    // Filter by tags
    tags: ['tutorial', 'nextjs'],
    tagLogic: 'and', // 'and' or 'or'
    
    // Pagination
    limit: 10,
    offset: 0,
    
    // Search
    search: 'react',
    
    // ISR revalidation (seconds)
    revalidate: 3600, // Revalidate every hour
  });
  
  return <BlogList posts={posts} />;
}
```

## Client Components

Use Client Components when you need:

- Real-time updates
- User interactions
- Client-side filtering/sorting
- Dynamic content

⚠️ **Security Note**: Client Components require `NEXT_PUBLIC_` prefixed environment variables, which exposes your API key in the browser. Only use this approach if you're comfortable with this trade-off.

### Environment Setup

```env
# For Client Components
NEXT_PUBLIC_BLOGS_FOR_VERCEL_API_KEY=your_api_key_here
NEXT_PUBLIC_BLOGS_FOR_VERCEL_BASE_URL=https://blogsforvercel.com
```

### Basic Hook Usage

```tsx
'use client';
import { useBlogPosts } from '@lztek/blogs-for-vercel-sdk/hooks';

export default function BlogList() {
  const { posts, isLoading, error, mutate } = useBlogPosts();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <button onClick={() => mutate()}>Refresh</button>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

### Single Post Hook

```tsx
'use client';
import { useBlogPost } from '@lztek/blogs-for-vercel-sdk/hooks';

export default function BlogPostPage({ slug }: { slug: string }) {
  const { post, isLoading, error } = useBlogPost(slug);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
    </article>
  );
}
```

### Hook Options

```tsx
const { posts, isLoading } = useBlogPosts({
  tags: ['tutorial'],
  tagLogic: 'and',
  search: 'react',
  limit: 10,
  offset: 0,
  revalidate: true, // Enable auto-refresh
  refreshInterval: 30, // Refresh every 30 seconds
});
```

## Advanced Usage

### Incremental Static Regeneration (ISR)

ISR allows you to update static pages without rebuilding your entire site:

```tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function BlogPage() {
  // Revalidate every hour
  const { posts } = await getBlogPosts({ revalidate: 3600 });
  
  return <BlogList posts={posts} />;
}
```

### On-Demand Revalidation

Create a Route Handler to trigger cache refresh:

```tsx
// app/api/revalidate/route.ts
import { revalidateBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();
    
    // Revalidate all posts
    await revalidateBlogPosts();
    
    // Or revalidate posts with a specific tag
    if (tag) {
      await revalidateBlogPosts(tag);
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error revalidating' }, 
      { status: 500 }
    );
  }
}
```

Then call it from your CMS webhook or manually:

```bash
curl -X POST https://your-site.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"tag": "blog-posts"}'
```

### Edge Runtime

The SDK works seamlessly with Edge Runtime:

```tsx
// app/api/posts/route.ts
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const { posts } = await getBlogPosts();
  return NextResponse.json({ posts });
}
```

### Route Handlers (API Proxies)

Create API endpoints that proxy blog posts:

```tsx
// app/api/blog/route.ts
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags')?.split(',');
    
    const { posts, count } = await getBlogPosts({
      tags,
      revalidate: 3600,
    });
    
    return NextResponse.json({ 
      posts,
      count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
```

### Search Functionality

```tsx
import { searchBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q: string } 
}) {
  const { posts } = await searchBlogPosts(searchParams.q, {
    revalidate: 3600,
  });
  
  return (
    <div>
      <h1>Search Results</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

### Multiple Tags with AND Logic

```tsx
import { getBlogPostsByTags } from '@lztek/blogs-for-vercel-sdk/server';

export default async function TagsPage({ 
  params 
}: { 
  params: { tags: string[] } 
}) {
  const { posts } = await getBlogPostsByTags(params.tags, {
    revalidate: 3600,
  });
  
  return <BlogList posts={posts} />;
}
```

## Examples

### Complete Blog List Page

```tsx
// app/blog/page.tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';
import Link from 'next/link';

export default async function BlogPage() {
  const { posts, count } = await getBlogPosts({ revalidate: 3600 });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog ({count} posts)</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article 
            key={post.id} 
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            
            <div 
              className="text-gray-600 line-clamp-3 mb-4"
              dangerouslySetInnerHTML={{ __html: post.content_html }} 
            />
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {post.published_at && (
              <time className="text-sm text-gray-500 mt-4 block">
                {new Date(post.published_at).toLocaleDateString()}
              </time>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
```

### Complete Blog Post Page

```tsx
// app/blog/[slug]/page.tsx
import { getBlogPost } from '@lztek/blogs-for-vercel-sdk/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPost(params.slug, { revalidate: 3600 });
    return {
      title: post.title,
      description: post.content_html.substring(0, 160),
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const post = await getBlogPost(params.slug, { revalidate: 3600 });
    
    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/blog"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Blog
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        {post.published_at && (
          <time className="text-gray-500 mb-6 block">
            {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content_html }} 
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
```

### Client Component with Search

```tsx
'use client';
import { useState } from 'react';
import { useBlogPosts } from '@lztek/blogs-for-vercel-sdk/hooks';

export default function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, isLoading } = useBlogPosts({
    search: searchQuery || undefined,
    revalidate: true,
    refreshInterval: 60,
  });
  
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
      
      {isLoading && <div>Loading...</div>}
      
      <div className="mt-4">
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
```

## Deployment

### Vercel

1. **Add Environment Variables**:
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add `BLOGS_FOR_VERCEL_API_KEY` with your API key
   - Optionally add `BLOGS_FOR_VERCEL_BASE_URL` if using a custom domain

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Up On-Demand Revalidation** (Optional):
   - Create the `/api/revalidate` route handler (see Advanced Usage)
   - Add webhook URL in Blogs-For-Vercel dashboard
   - Point to `https://your-site.com/api/revalidate`

### Other Platforms

The SDK works with any platform that supports Next.js:

- **Netlify**: Add environment variables in Netlify dashboard
- **Cloudflare Pages**: Add environment variables in Cloudflare dashboard
- **AWS Amplify**: Add environment variables in Amplify console
- **Self-hosted**: Set environment variables in your hosting environment

## Troubleshooting

### "API key is required" Error

**Problem**: You're getting an error that the API key is required.

**Solution**:
- For Server Components: Ensure `BLOGS_FOR_VERCEL_API_KEY` is set
- For Client Components: Ensure `NEXT_PUBLIC_BLOGS_FOR_VERCEL_API_KEY` is set
- Restart your development server after adding environment variables
- Check that `.env.local` is in your `.gitignore` file

### Posts Not Updating

**Problem**: Your posts aren't updating after publishing new content.

**Solutions**:
- Check your `revalidate` settings (lower values = more frequent updates)
- Use on-demand revalidation for immediate updates
- Verify your API key has access to the posts
- Clear your Next.js cache: `.next` folder

### Build Errors

**Problem**: Build fails with TypeScript or import errors.

**Solutions**:
- Ensure you're using the correct import path:
  - Server Components: `@lztek/blogs-for-vercel-sdk/server`
  - Client Components: `@lztek/blogs-for-vercel-sdk/hooks`
- Check TypeScript version (5.0+ recommended)
- Verify React version (18+ or 19+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### CORS Errors

**Problem**: Getting CORS errors when fetching posts.

**Solution**: This shouldn't happen with the SDK, but if it does:
- Ensure you're using the SDK functions, not direct API calls
- Check that your `BLOGS_FOR_VERCEL_BASE_URL` is correct
- Verify your API key is valid

### Slow Performance

**Problem**: Blog pages are loading slowly.

**Solutions**:
- Use Server Components instead of Client Components
- Implement ISR with appropriate `revalidate` values
- Use Edge Runtime for API routes
- Consider implementing pagination with `limit` and `offset`

## Best Practices

### 1. Use Server Components by Default

Server Components provide better performance, SEO, and security. Only use Client Components when you need interactivity.

### 2. Implement ISR

Use Incremental Static Regeneration to balance freshness and performance:

```tsx
// Revalidate every hour
const { posts } = await getBlogPosts({ revalidate: 3600 });
```

### 3. Set Up On-Demand Revalidation

For immediate updates after publishing, set up on-demand revalidation:

```tsx
// In your webhook handler
await revalidateBlogPosts();
```

### 4. Handle Errors Gracefully

Always handle errors and provide fallbacks:

```tsx
try {
  const post = await getBlogPost(slug);
  return <BlogPost post={post} />;
} catch (error) {
  notFound(); // or show error message
}
```

### 5. Use TypeScript

The SDK provides full TypeScript support. Use it for better developer experience:

```tsx
import type { BlogPost } from '@lztek/blogs-for-vercel-sdk/types';
```

### 6. Sanitize HTML Content

When rendering HTML content, consider using a sanitization library:

```bash
npm install dompurify isomorphic-dompurify
```

```tsx
import DOMPurify from 'isomorphic-dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(post.content_html) 
}} />
```

### 7. Implement Pagination

For large blogs, implement pagination:

```tsx
const { posts, hasMore, limit, offset } = await getBlogPosts({
  limit: 10,
  offset: page * 10,
});
```

### 8. Cache Strategically

- Use longer `revalidate` times for stable content
- Use shorter times or on-demand revalidation for frequently updated content
- Consider using Edge Runtime for global distribution

## Additional Resources

- **SDK Documentation**: [NPM Package](https://www.npmjs.com/package/@lztek/blogs-for-vercel-sdk)
- **API Documentation**: [https://blogsforvercel.com/docs](https://blogsforvercel.com/docs)
- **GitHub Repository**: [https://github.com/z3thon/blogs-for-vercel](https://github.com/z3thon/blogs-for-vercel)
- **Support**: [https://blogsforvercel.com/support](https://blogsforvercel.com/support)

## License

MIT

