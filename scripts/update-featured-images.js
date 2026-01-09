#!/usr/bin/env node

/**
 * Script to update blog posts with featured images
 * Usage: node scripts/update-featured-images.js
 */

require('dotenv').config({ path: '.env.local' });

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

// Map of slugs to featured image URLs
// Using carefully selected Unsplash images that are more relevant to each post's content
const featuredImages = {
  'lightbulbs-vs-sunrises-why-depression-recovery-takes-time-and-that-s-okay': {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
    alt: 'Beautiful sunrise over mountains representing gradual recovery and hope',
  },
  'the-false-belief-behind-your-depression-and-how-to-find-it': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    alt: 'Person in thoughtful reflection, representing self-discovery and introspection',
  },
  'how-long-does-a-depressive-episode-last-and-how-to-make-it-shorter': {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=630&fit=crop',
    alt: 'Path through nature representing the journey of recovery and healing',
  },
  'depression-trap-cards-what-they-are-and-how-to-build-yours': {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
    alt: 'Strategic planning and organization tools representing trap card strategies',
  },
  'the-who-is-in-charge-of-your-day-challenge-a-30-day-depression-recovery-practice': {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop',
    alt: 'Early morning sunrise representing new beginnings and taking charge of your day',
  },
  'how-to-stop-ghosting-your-friends-when-depression-hits': {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
    alt: 'Friends connecting and supporting each other through difficult times',
  },
  'what-is-bed-rotting-and-why-you-can-t-stop-doing-it': {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
    alt: 'Person in bed during daytime, representing the struggle with bed-rotting',
  },
  'the-college-student-s-guide-to-managing-depression-when-school-makes-it-worse': {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
    alt: 'College student studying and managing academic stress',
  },
  'why-do-i-feel-like-a-different-person-when-i-m-depressed': {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=630&fit=crop',
    alt: 'Person looking at their reflection in water, representing identity confusion and self-awareness',
  },
  'test-with-userid': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    alt: 'Generic test image',
  },
  'testing-the-syntax-for-everything': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    alt: 'Generic test image',
  },
  'test-1': {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
    alt: 'Generic test image',
  },
};

async function updateFeaturedImages() {
  const slugs = Object.keys(featuredImages);
  const results = [];

  for (const slug of slugs) {
    const imageData = featuredImages[slug];
    
    console.log(`\nUpdating: ${slug}`);
    console.log(`  Featured image: ${imageData.url}`);

    try {
      const updatedPost = await client.updatePost(slug, {
        featured_image: imageData.url,
        featured_image_alt: imageData.alt,
      });

      console.log(`  ✅ Successfully updated post: ${updatedPost.id || slug}`);
      results.push({ slug, success: true, post: updatedPost });
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      const errorMsg = error.message || String(error);
      console.error(`  ❌ Error updating ${slug}:`, errorMsg);
      results.push({ slug, success: false, error: errorMsg });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✅ Successfully updated: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed updates:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.slug}: ${r.error}`);
    });
  }

  return results;
}

// Run the script
if (require.main === module) {
  updateFeaturedImages()
    .then(() => {
      console.log('\n✅ Script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { updateFeaturedImages };

