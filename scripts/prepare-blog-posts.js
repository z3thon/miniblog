#!/usr/bin/env node

/**
 * Script to prepare blog posts data for manual import or API upload
 * Since Blogs-For-Vercel API doesn't support POST, this prepares the data
 * in the correct format for manual entry or future API support
 */

const fs = require('fs');
const path = require('path');

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to extract subtitle/excerpt from markdown
function extractExcerpt(content) {
  const plainText = content
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/---/g, '')
    .trim();
  
  const firstParagraph = plainText.split('\n\n')[0] || plainText;
  return firstParagraph.substring(0, 200).trim();
}

// Helper function to extract tags from content
function extractTags(content, filename) {
  const tags = [];
  
  const filenameLower = filename.toLowerCase();
  if (filenameLower.includes('college')) tags.push('college');
  if (filenameLower.includes('depression')) tags.push('depression');
  if (filenameLower.includes('trap-card')) tags.push('trap-cards', 'strategies');
  if (filenameLower.includes('gratitude')) tags.push('gratitude', 'mindset');
  if (filenameLower.includes('ghosting')) tags.push('relationships', 'friendship');
  if (filenameLower.includes('bed-rotting')) tags.push('habits', 'productivity');
  
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
  
  tags.push('mental-health', 'self-help');
  
  return [...new Set(tags)];
}

// Main function to process all blog posts
function prepareBlogPosts() {
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
  
  const posts = [];
  
  for (const file of files) {
    const filePath = path.join(blogPostsDir, file);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (!titleMatch) {
      console.error(`Could not extract title from ${file}`);
      continue;
    }
    
    const title = titleMatch[1].trim();
    const slug = createSlug(title);
    const excerpt = extractExcerpt(content);
    const tags = extractTags(content, file);
    
    // Extract subtitle if present
    const subtitleMatch = content.match(/^#\s+.+\n\n\*(.+)\*/m);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : excerpt.substring(0, 100);
    
    posts.push({
      title,
      slug,
      content_markdown: content,
      tags,
      excerpt,
      subtitle,
      published: true,
    });
  }
  
  return posts;
}

// Generate output files
const posts = prepareBlogPosts();

// Save as JSON for potential API use
fs.writeFileSync(
  path.join(__dirname, '..', 'blog-posts-data.json'),
  JSON.stringify(posts, null, 2)
);

// Save as formatted text for manual entry
const formattedText = posts.map((post, index) => {
  return `
${'='.repeat(80)}
POST ${index + 1}: ${post.title}
${'='.repeat(80)}

Title: ${post.title}
Slug: ${post.slug}
Tags: ${post.tags.join(', ')}
Subtitle: ${post.subtitle || 'N/A'}

Content (Markdown):
${post.content_markdown}

---
`.trim();
}).join('\n\n');

fs.writeFileSync(
  path.join(__dirname, '..', 'blog-posts-formatted.txt'),
  formattedText
);

console.log(`✅ Prepared ${posts.length} blog posts:`);
console.log(`   - blog-posts-data.json (JSON format for API)`);
console.log(`   - blog-posts-formatted.txt (Formatted text for manual entry)`);
console.log(`\n📝 Note: Blogs-For-Vercel API currently only supports GET requests.`);
console.log(`   Posts must be created through the dashboard at:`);
console.log(`   https://blogsforvercel.com/dashboard/posts`);
console.log(`\n💡 You can use the formatted text file to copy-paste into the dashboard,`);
console.log(`   or wait for API POST support to be added.`);

