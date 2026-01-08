# Quick Start Guide

Get up and running with Blogs-For-Vercel in 5 minutes.

## Step 1: Install the SDK

```bash
npm install @lztek/blogs-for-vercel-sdk
```

## Step 2: Get Your API Key

1. Sign up at [https://blogsforvercel.com](https://blogsforvercel.com)
2. Go to **Dashboard** → **API Keys**
3. Create a new API key
4. Copy it

## Step 3: Set Environment Variable

Create `.env.local`:

```env
BLOGS_FOR_VERCEL_API_KEY=your_api_key_here
```

## Step 4: Create Blog Page

**App Router** (`app/blog/page.tsx`):

```tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function BlogPage() {
  const { posts } = await getBlogPosts({ revalidate: 3600 });
  
  return (
    <div>
      <h1>My Blog</h1>
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

## Step 5: Create Post Page

**App Router** (`app/blog/[slug]/page.tsx`):

```tsx
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
      </article>
    );
  } catch {
    notFound();
  }
}
```

## Step 6: Create Your First Post

1. Go to [https://blogsforvercel.com/dashboard/posts](https://blogsforvercel.com/dashboard/posts)
2. Click **New Post**
3. Write your content
4. Click **Publish**

## Done! 🎉

Visit `/blog` to see your posts.

## Next Steps

- Read the [full documentation](./README.md)
- Check out [examples](../examples/)
- Set up [on-demand revalidation](./README.md#on-demand-revalidation)

