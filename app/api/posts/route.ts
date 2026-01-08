import { NextRequest, NextResponse } from 'next/server';
import { BlogsForVercelClient } from '@lztek/blogs-for-vercel-sdk';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get('apiKey');

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is required' },
      { status: 400 }
    );
  }

  try {
    const client = new BlogsForVercelClient({
      apiKey: apiKey,
      baseUrl: process.env.BLOGS_FOR_VERCEL_BASE_URL || 'https://blogsforvercel.com',
    });

    const result = await client.getBlogPosts();
    
    return NextResponse.json({
      posts: result.posts || [],
      count: result.count || 0,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog posts';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

