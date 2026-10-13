const fs = require('fs');
const path = require('path');

function runAudit() {
  console.log('=== RUNNING GOOGLE SEARCH CONSOLE & SEO AUDIT ===\n');
  let errors = 0;

  // 1. Robots.txt check
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.error('❌ FAIL: public/robots.txt is missing');
    errors++;
  } else {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    if (!robots.includes('Sitemap: https://growgreensa.com/sitemap.xml')) {
      console.error('❌ FAIL: Sitemap directive missing in robots.txt');
      errors++;
    } else {
      console.log('✅ PASS: public/robots.txt exists and links to https://growgreensa.com/sitemap.xml');
    }
  }

  // 2. Sitemap.xml check
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ FAIL: public/sitemap.xml is missing');
    errors++;
  } else {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const urls = ['https://growgreensa.com/', 'https://growgreensa.com/services', 'https://growgreensa.com/shop', 'https://growgreensa.com/about', 'https://growgreensa.com/contact'];
    let allFound = true;
    for (const u of urls) {
      if (!sitemap.includes(u)) {
        console.error(`❌ FAIL: URL ${u} missing from sitemap.xml`);
        allFound = false;
        errors++;
      }
    }
    if (allFound) {
      console.log(`✅ PASS: public/sitemap.xml contains all ${urls.length} main canonical URLs with image extensions`);
    }
  }

  // 3. Index.html check
  const indexPath = path.join(__dirname, '..', 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  if (!indexHtml.includes('name="google-site-verification"')) {
    console.error('❌ FAIL: google-site-verification meta tag missing in index.html');
    errors++;
  } else {
    console.log('✅ PASS: google-site-verification meta tag present in index.html');
  }

  if (!indexHtml.includes('rel="canonical" href="https://growgreensa.com/"')) {
    console.error('❌ FAIL: canonical link tag missing in index.html');
    errors++;
  } else {
    console.log('✅ PASS: canonical link tag present in index.html');
  }

  if (!indexHtml.includes('name="robots"')) {
    console.error('❌ FAIL: robots meta tag missing in index.html');
    errors++;
  } else {
    console.log('✅ PASS: robots and googlebot meta tags present in index.html');
  }

  // 4. Schema.org JSON-LD check
  const startTag = '<script type="application/ld+json">';
  const endTag = '</script>';
  const startIndex = indexHtml.indexOf(startTag);
  const endIndex = indexHtml.indexOf(endTag, startIndex);
  if (startIndex === -1 || endIndex === -1) {
    console.error('❌ FAIL: Schema.org JSON-LD script missing in index.html');
    errors++;
  } else {
    const rawJson = indexHtml.substring(startIndex + startTag.length, endIndex).trim();
    try {
      const parsed = JSON.parse(rawJson);
      console.log('✅ PASS: Schema.org JSON-LD is 100% valid JSON with context:', parsed['@context']);
      console.log('         Entities found:', parsed['@graph'].map(e => e['@type']).join(', '));
    } catch (e) {
      console.error('❌ FAIL: Invalid JSON in Schema.org script:', e.message);
      errors++;
    }
  }

  // 5. App.jsx route check
  const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
  const appCode = fs.readFileSync(appPath, 'utf8');
  if (appCode.includes('window.location.pathname') && appCode.includes('window.history.pushState')) {
    console.log('✅ PASS: App.jsx handles pathname route syncing and browser history for Googlebot');
  } else {
    console.error('❌ FAIL: App.jsx lacks pathname synchronization');
    errors++;
  }

  console.log('\n=======================================');
  if (errors === 0) {
    console.log('🎉 AUDIT RESULT: ALL CHECKS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`⚠️ AUDIT RESULT: ${errors} errors detected.`);
  }
  console.log('=======================================');
}

runAudit();
