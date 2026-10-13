const fs = require('fs');
const path = require('path');

// Dynamically read blog data using Node ES module import / require
async function runValidation() {
  console.log('=== VALIDATING LANDSCAPING & OUTDOOR DESIGN BLOG SYSTEM ===\n');
  let errors = 0;

  // 1. Categories Schema Check
  const categoriesFile = path.join(__dirname, '..', 'src', 'data', 'blogCategories.js');
  if (!fs.existsSync(categoriesFile)) {
    console.error('❌ FAIL: blogCategories.js is missing');
    process.exit(1);
  }

  const { blogCategories } = await import('../src/data/blogCategories.js');
  const requiredCategories = [
    'Landscape Design & Architecture',
    'Hardscaping & Outdoor Living',
    'Plant Selection & Horticulture',
    'Seasonal Care & Maintenance',
    'Smart Irrigation & Drainage',
    'Hydroponics & Modern Cultivation',
    'Sustainable & Eco Landscaping'
  ];

  console.log(`Checking Categories Schema (found ${blogCategories.length} categories)...`);
  for (const rc of requiredCategories) {
    const found = blogCategories.find(c => c.name === rc);
    if (!found) {
      console.error(`❌ FAIL: Missing required category: "${rc}"`);
      errors++;
    } else {
      console.log(`  ✓ Validated category: "${rc}" (${found.slug})`);
    }
  }

  // 2. Posts Schema & Cadence Check
  const postsFile = path.join(__dirname, '..', 'src', 'data', 'blogPosts.js');
  if (!fs.existsSync(postsFile)) {
    console.error('❌ FAIL: blogPosts.js is missing');
    process.exit(1);
  }

  const { blogPosts } = await import('../src/data/blogPosts.js');
  console.log(`\nChecking Blog Posts (found ${blogPosts.length} posts)...`);

  const requiredFields = ['title', 'slug', 'excerpt', 'author', 'date', 'publishDate', 'category', 'tags', 'coverImage', 'status'];
  const seenSlugs = new Set();
  let publishedCount = 0;
  let scheduledCount = 0;

  for (const post of blogPosts) {
    // A. Check required fields
    for (const f of requiredFields) {
      if (post[f] === undefined || post[f] === null || post[f] === '') {
        console.error(`❌ FAIL: Post "${post.slug || 'unknown'}" missing required field: "${f}"`);
        errors++;
      }
    }

    // B. Check slug uniqueness & format
    if (seenSlugs.has(post.slug)) {
      console.error(`❌ FAIL: Duplicate slug found: "${post.slug}"`);
      errors++;
    }
    seenSlugs.add(post.slug);

    if (!/^[a-z0-9-]+$/.test(post.slug)) {
      console.error(`❌ FAIL: Slug "${post.slug}" is not valid kebab-case`);
      errors++;
    }

    // C. Check author structure
    if (!post.author || !post.author.name || !post.author.role) {
      console.error(`❌ FAIL: Post "${post.slug}" has invalid author structure`);
      errors++;
    }

    // D. Check category matches allowed list
    if (!requiredCategories.includes(post.category)) {
      console.error(`❌ FAIL: Post "${post.slug}" has invalid category: "${post.category}"`);
      errors++;
    }

    // E. Check status and count
    if (post.status === 'published') {
      publishedCount++;
    } else if (post.status === 'scheduled') {
      scheduledCount++;

      // Check date is on Mon (1), Wed (3), or Fri (5)
      const d = new Date(post.publishDate + 'T12:00:00Z');
      const dayOfWeek = d.getUTCDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
      if (![1, 3, 5].includes(dayOfWeek)) {
        console.error(`❌ FAIL: Scheduled post "${post.slug}" (${post.publishDate}) is on day ${dayOfWeek}, expected Mon(1), Wed(3), or Fri(5)`);
        errors++;
      }
    } else {
      console.error(`❌ FAIL: Post "${post.slug}" has invalid status: "${post.status}"`);
      errors++;
    }
  }

  console.log(`\nPublishing Breakdown:`);
  console.log(`  - Live Published Posts: ${publishedCount} (Target: 4)`);
  console.log(`  - Scheduled Editorial Queue: ${scheduledCount} (Target: 20)`);

  if (publishedCount !== 4) {
    console.error(`❌ FAIL: Expected exactly 4 published posts, found ${publishedCount}`);
    errors++;
  } else {
    console.log(`  ✓ Exactly 4 live pillar posts verified`);
  }

  if (scheduledCount !== 20) {
    console.error(`❌ FAIL: Expected exactly 20 scheduled posts, found ${scheduledCount}`);
    errors++;
  } else {
    console.log(`  ✓ Exactly 20 scheduled editorial queue posts verified on Mon/Wed/Fri cadence`);
  }

  // 3. Auto-Publishing Engine Simulation Check
  const { isPostLive, getLivePosts } = await import('../src/utils/blogEngine.js');
  const now = new Date('2026-10-13T12:00:00Z');
  const initialLive = getLivePosts(now);

  if (initialLive.length !== 4) {
    console.error(`❌ FAIL: Auto-publishing engine returned ${initialLive.length} live posts on launch date, expected 4`);
    errors++;
  } else {
    console.log(`  ✓ Auto-publishing engine correctly serves 4 live posts as of today`);
  }

  // Simulate advancing clock to 2026-10-22 (after Fri Oct 16, Mon Oct 19, Wed Oct 21)
  const futureDate = new Date('2026-10-22T12:00:00Z');
  const futureLive = getLivePosts(futureDate);
  if (futureLive.length !== 7) { // 4 initial + 3 released
    console.error(`❌ FAIL: Auto-publishing simulation for 2026-10-22 returned ${futureLive.length} posts, expected 7`);
    errors++;
  } else {
    console.log(`  ✓ Auto-publishing time-travel simulation verified: 3 scheduled posts auto-transitioned to live by Oct 22`);
  }

  console.log('\n=======================================');
  if (errors === 0) {
    console.log('🎉 BLOG SYSTEM AUDIT PASSED WITH 0 ERRORS!');
  } else {
    console.error(`⚠️ BLOG SYSTEM AUDIT FAILED WITH ${errors} ERRORS`);
    process.exit(1);
  }
  console.log('=======================================');
}

runValidation().catch(err => {
  console.error('Unhandled validation error:', err);
  process.exit(1);
});
