#!/usr/bin/env node

/**
 * Script to add blog posts to Blogs-For-Vercel via API
 * Usage: node scripts/add-blog-posts.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Use the SDK instead of raw fetch
const { BlogsForVercelClient } = require('@lztek/blogs-for-vercel-sdk');

const API_KEY = process.env.BLOGS_FOR_VERCEL_API_KEY;
const BASE_URL = process.env.BLOGS_FOR_VERCEL_BASE_URL || 'https://blogsforvercel.com';

if (!API_KEY) {
  console.error('Error: BLOGS_FOR_VERCEL_API_KEY not found in .env.local');
  process.exit(1);
}

// Initialize the SDK client
const client = new BlogsForVercelClient({
  apiKey: API_KEY,
  baseUrl: BASE_URL,
});

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to extract subtitle/excerpt from markdown
function extractExcerpt(content) {
  // Remove markdown formatting
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
    .replace(/---/g, '') // Remove horizontal rules
    .trim();
  
  // Get first 200 characters
  const firstParagraph = plainText.split('\n\n')[0] || plainText;
  return firstParagraph.substring(0, 200).trim();
}

// Helper function to extract tags from content
function extractTags(content, filename) {
  const tags = [];
  
  // Common depression-related tags
  const commonTags = [
    'depression',
    'mental-health',
    'self-help',
    'recovery',
    'college',
    'wellness',
    'personal-growth'
  ];
  
  // Extract from filename
  const filenameLower = filename.toLowerCase();
  if (filenameLower.includes('college')) tags.push('college');
  if (filenameLower.includes('depression')) tags.push('depression');
  if (filenameLower.includes('trap-card')) tags.push('trap-cards', 'strategies');
  if (filenameLower.includes('gratitude')) tags.push('gratitude', 'mindset');
  if (filenameLower.includes('ghosting')) tags.push('relationships', 'friendship');
  if (filenameLower.includes('bed-rotting')) tags.push('habits', 'productivity');
  
  // Extract from content
  const contentLower = content.toLowerCase();
  if (contentLower.includes('evil doppelgänger') || contentLower.includes('doppelganger')) {
    tags.push('identity', 'self-awareness');
  }
  if (contentLower.includes('trap card')) {
    tags.push('trap-cards', 'strategies');
  }
  if (contentLower.includes('cycle time') || contentLower.includes('episode')) {
    tags.push('cycle-management', 'recovery');
  }
  
  // Add common tags
  tags.push('mental-health', 'self-help');
  
  // Remove duplicates and return
  return [...new Set(tags)];
}

// Function to create a blog post via API using the SDK
async function createBlogPost(postData) {
  try {
    // Use the SDK's createPost method
    return await client.createPost(postData);
  } catch (error) {
    // Log full error for debugging
    console.error('  Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    // Provide more detailed error information
    const errorMessage = error.message || error.toString() || 'Unknown error';
    throw new Error(`Failed to create post: ${errorMessage}`);
  }
}

// Main function to process all blog posts
async function addBlogPosts() {
  const blogPostsDir = path.join(__dirname, '..', 'blog-posts');
  const files = [
    '01-why-do-i-feel-like-different-person-when-depressed.md',
    '02-college-student-guide-managing-depression.md',
    '03-what-is-bed-rotting-why-cant-stop-doing-it.md',
    '04-how-to-stop-ghosting-friends-when-depressed.md',
    '05-who-is-in-charge-of-your-day-challenge.md',
    '06-depression-trap-cards-what-they-are-how-to-build.md',
    '07-how-long-depressive-episode-last-make-shorter.md',
    '08-false-belief-behind-depression-how-to-find.md',
    '09-lightbulbs-vs-sunrises-depression-recovery-takes-time.md',
    '10-why-gratitude-isnt-toxic-positivity.md',
  ];
  
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(blogPostsDir, file);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    
    console.log(`\nProcessing: ${file}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract title (first line after removing #)
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (!titleMatch) {
        console.error(`  ❌ Could not extract title from ${file}`);
        continue;
      }
      
      const title = titleMatch[1].trim();
      const slug = createSlug(title);
      const excerpt = extractExcerpt(content);
      const tags = extractTags(content, file);
      
      // Extract subtitle if present (italic text after title)
      const subtitleMatch = content.match(/^#\s+.+\n\n\*(.+)\*/m);
      const subtitle = subtitleMatch ? subtitleMatch[1].trim() : excerpt.substring(0, 100);
      
      // Prepare post data according to API documentation
      // Required: title, content_markdown
      // Optional: slug, tags, status, subtitle, excerpt, etc.
      const postData = {
        title: title,
        content_markdown: content,
        slug: slug,
        tags: tags,
        status: 'published', // 'draft' or 'published'
        subtitle: subtitle,
        excerpt: excerpt,
      };
      
      console.log(`  Title: ${title}`);
      console.log(`  Slug: ${slug}`);
      console.log(`  Tags: ${tags.join(', ')}`);
      
      // Create the post
      const result = await createBlogPost(postData);
      console.log(`  ✅ Successfully created post: ${result.id || result.slug || 'created'}`);
      
      results.push({ file, success: true, result });
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      const errorMsg = error.message || String(error);
      console.error(`  ❌ Error processing ${file}:`, errorMsg);
      // Log full error for debugging
      if (error.stack) {
        console.error(`  Error details:`, error.stack.split('\n').slice(0, 3).join('\n'));
      }
      results.push({ file, success: false, error: errorMsg });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✅ Successfully created: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed posts:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.file}: ${r.error}`);
    });
  }
  
  return results;
}

// Run the script
if (require.main === module) {
  addBlogPosts()
    .then(() => {
      console.log('\n✅ Script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { addBlogPosts, createBlogPost };

