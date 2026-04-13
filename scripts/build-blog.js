/**
 * WhenWillIMakeAMillion.com — Blog Build Script
 * Reads Markdown files from content/blog/, compiles to static HTML
 * Usage: node scripts/build-blog.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const CONTENT_DIR = path.join(__dirname, '../content/blog');
const OUTPUT_DIR = path.join(__dirname, '../blog');
const SITE_URL = 'https://whenwillimakeamillion.com';
const ADSENSE_PUB = 'ca-pub-4785900830813173';

// ─── Configure marked ─────────────────────────────────────────────────────
marked.setOptions({
  breaks: false,
  gfm: true,
});

// ─── HTML Template ────────────────────────────────────────────────────────
function buildPostHTML(frontmatter, htmlContent, relatedArticles) {
  const { title, description, date, tag, readTime, slug } = frontmatter;
  const canonicalUrl = `${SITE_URL}/blog/${slug}/`;
  const pubDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const relatedHTML = relatedArticles.map(a => `
    <a class="blog-list-item" href="/blog/${a.slug}/">
      <div class="post-tag">${a.tag}</div>
      <div class="post-title-sm">${a.title}</div>
      <div class="post-date">${a.readTime}</div>
    </a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — WhenWillIMakeAMillion.com</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_URL}/assets/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">

  <!-- Article schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
    "description": "${description.replace(/"/g, '\\"')}",
    "datePublished": "${date}",
    "author": {"@type": "Organization", "name": "WhenWillIMakeAMillion.com"},
    "publisher": {"@type": "Organization", "name": "WhenWillIMakeAMillion.com", "url": "${SITE_URL}"}
  }
  </script>

  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB}" crossorigin="anonymous"></script>
</head>
<body>

  <nav class="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo"><span class="logo-icon">🚀</span> WhenWillIMakeAMillion</a>
      <ul class="nav-links">
        <li><a href="/">Calculator</a></li>
        <li><a href="/blog/">Articles</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
    </div>
  </nav>

  <header class="post-header">
    <div class="post-tag">${tag}</div>
    <h1 class="post-title">${title}</h1>
    <div class="post-meta">
      <span>${pubDate}</span>
      <span>${readTime}</span>
    </div>
  </header>

  <!-- Ad unit — top of post -->
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px;">
    <div class="ad-unit">
      <div class="ad-unit-label">Advertisement</div>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="${ADSENSE_PUB}"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>

  <article class="post-body">
    ${htmlContent}

    <div class="post-cta">
      <h3>🚀 Find your millionaire date</h3>
      <p>Plug in your numbers and get your exact timeline — with roasts, badges, and a shareable result card.</p>
      <a href="/" class="btn-cta">Use the Calculator →</a>
    </div>
  </article>

  <!-- Ad unit — end of post -->
  <div style="max-width: 720px; margin: 0 auto; padding: 0 24px;">
    <div class="ad-unit">
      <div class="ad-unit-label">Advertisement</div>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="${ADSENSE_PUB}"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>

  ${relatedHTML ? `
  <section class="related-section">
    <h2>Related articles</h2>
    <div class="related-grid">
      ${relatedHTML}
    </div>
  </section>` : ''}

  <footer class="footer">
    <div class="footer-inner">
      <ul class="footer-links">
        <li><a href="/">Calculator</a></li>
        <li><a href="/blog/">Articles</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
      <p class="footer-copy">© 2025 WhenWillIMakeAMillion.com — For informational purposes only. Not financial advice.</p>
    </div>
  </footer>

</body>
</html>`;
}

// ─── Main Build Function ──────────────────────────────────────────────────
function buildBlog() {
  console.log('🚀 Building blog...');

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const allPosts = [];

  // First pass: parse all frontmatter
  files.forEach(file => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    if (data.slug) {
      allPosts.push(data);
    }
  });

  // Sort by date descending
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  let built = 0;

  // Second pass: build each post
  files.forEach(file => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data: frontmatter, content: mdContent } = matter(raw);

    if (!frontmatter.slug) {
      console.warn(`  ⚠ Skipping ${file} — no slug in frontmatter`);
      return;
    }

    // Convert markdown to HTML
    const htmlContent = marked(mdContent);

    // Pick 2 related posts (different slug)
    const related = allPosts
      .filter(p => p.slug !== frontmatter.slug)
      .slice(0, 2);

    // Build HTML
    const html = buildPostHTML(frontmatter, htmlContent, related);

    // Write to output dir
    const postDir = path.join(OUTPUT_DIR, frontmatter.slug);
    fs.mkdirSync(postDir, { recursive: true });
    fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf8');
    console.log(`  ✓ /blog/${frontmatter.slug}/`);
    built++;
  });

  console.log(`\n✅ Built ${built} posts`);

  // Return all posts metadata for sitemap generation
  return allPosts;
}

// ─── Sitemap Generation ───────────────────────────────────────────────────
function buildSitemap(posts) {
  const staticPages = ['', '/blog/', '/about/'];

  const staticEntries = staticPages.map(path => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  const postEntries = posts.map(post => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}/</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`;

  const sitemapPath = path.join(__dirname, '../sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap.trim(), 'utf8');
  console.log('📄 sitemap.xml generated');
}

// ─── Run ──────────────────────────────────────────────────────────────────
const posts = buildBlog();
buildSitemap(posts);
