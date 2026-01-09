'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from './GlassCard';
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

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
    <>
      {/* Search Input */}
      <div className="mb-8">
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => {
          // Extract excerpt from content_html and decode HTML entities
          let excerpt = '';
          if (post.content_html) {
            const rawExcerpt = post.content_html.replace(/<[^>]*>/g, '').substring(0, 150).trim();
            excerpt = decodeHtmlEntities(rawExcerpt);
          }

          return (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="glass-card rounded-3xl h-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden p-0">
                {/* Featured Image */}
                {post.featured_image ? (
                  <div className="relative w-full h-48 mb-0 rounded-t-3xl overflow-hidden" style={{ width: '100%', position: 'relative' }}>
                    <Image
                      src={post.featured_image}
                      alt={post.featured_image_alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[var(--glass-primary)]/10 to-[var(--glass-primary)]/5 rounded-t-3xl mb-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[var(--glass-primary)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                <div className="flex-1 flex flex-col p-8">
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
              </div>
            </Link>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <GlassCard>
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found matching "{searchQuery}"</p>
          </div>
        </GlassCard>
      )}
    </>
  );
}

