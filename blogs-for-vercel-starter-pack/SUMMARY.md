# Blogs-For-Vercel Starter Pack Summary

## What You Get

A complete starter pack for integrating Blogs-For-Vercel into your Next.js application.

## Files Included

- **README.md** - Complete integration guide with examples
- **QUICK_START.md** - 5-minute getting started guide
- **SUMMARY.md** - This file

## Key Features

✅ **Server Components** - Recommended approach with ISR support  
✅ **Client Components** - React hooks for dynamic content  
✅ **TypeScript** - Full type safety  
✅ **Edge Runtime** - Works with Edge Runtime  
✅ **ISR Support** - Incremental Static Regeneration  
✅ **On-Demand Revalidation** - Instant cache updates  

## Quick Reference

### Installation

```bash
npm install @lztek/blogs-for-vercel-sdk
```

### Environment Variables

```env
BLOGS_FOR_VERCEL_API_KEY=your_api_key_here
```

### Server Component

```tsx
import { getBlogPosts } from '@lztek/blogs-for-vercel-sdk/server';

export default async function BlogPage() {
  const { posts } = await getBlogPosts({ revalidate: 3600 });
  return <BlogList posts={posts} />;
}
```

### Client Component

```tsx
'use client';
import { useBlogPosts } from '@lztek/blogs-for-vercel-sdk/hooks';

export default function BlogList() {
  const { posts, isLoading } = useBlogPosts();
  if (isLoading) return <div>Loading...</div>;
  return <BlogList posts={posts} />;
}
```

## Common Use Cases

1. **Blog List Page** - Display all posts
2. **Single Post Page** - Show individual post
3. **Tag Pages** - Filter posts by tag
4. **Search** - Search posts by content
5. **API Proxy** - Create custom API endpoints

## Documentation

- [Full Guide](./README.md)
- [Quick Start](./QUICK_START.md)
- [SDK Documentation](https://www.npmjs.com/package/@lztek/blogs-for-vercel-sdk)

## Support

- **Website**: [https://blogsforvercel.com](https://blogsforvercel.com)
- **GitHub**: [https://github.com/z3thon/blogs-for-vercel](https://github.com/z3thon/blogs-for-vercel)

