# Technical Architecture: Securing the Realm

**Version:** 1.1
**Last Updated:** 2025-01-22
**Status:** Active
**Owner:** Chris Lloyd-Jones & Josh McDonald

---

## Overview

This document describes the technical architecture and implementation details for the Securing the Realm static website. For product requirements and business context, see `prd.md`.

**Deployment:** https://securing.quest (GitHub Pages Static)

---

## Technical Stack

### Core Technologies

**Framework:** Astro 5.14.1
- Static Site Generation (SSG)
- File-based routing
- Content collections with Zod validation
- MDX support for rich content

**Language:** TypeScript 5.9.3
- Strict mode enabled
- Explicit type annotations required
- No `any` types allowed

**Styling:** Custom CSS
- CSS variables for theming
- No CSS-in-JS frameworks
- Design tokens in `src/styles/tokens.css`
- Global styles in `src/styles/global.css`

**Linting/Formatting:** Biome
- Replaces ESLint and Prettier
- Import organization
- Formatting enforcement
- Configuration in `biome.json`

**Deployment:** GitHub Pages
- Static HTML/CSS/JS output
- Custom domain: https://securing.quest
- Automated via GitHub Actions (see `.github/workflows/publish.yml` for details)

### System Architecture

**Build Pipeline:**
```
Content (Markdown/JSON)
    ↓
Zod Schema Validation
    ↓
Astro SSG Processing
    ↓
TypeScript Type Checking
    ↓
Biome Linting
    ↓
Static HTML/CSS/JS Output
    ↓
GitHub Actions Deployment
    ↓
GitHub Pages (Production)
```

**Content Flow:**
```
YouTube RSS Feed → Parser → Episode Data → Static Generation
Content Collections → Zod Schemas → Type-Safe Data → Static Pages
```

### Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Seo.astro       # SEO meta tags, OpenGraph, JSON-LD
│   └── ...
├── content/            # Type-safe content collections
│   ├── blog/           # Markdown/MDX blog posts
│   ├── talks/          # JSON talk metadata
│   ├── projects/       # JSON project metadata
│   └── config.ts       # Zod schemas for validation
├── layouts/
│   └── Base.astro      # HTML scaffold, header, footer
├── pages/              # File-based routing
│   ├── index.astro     # Homepage (video list)
│   ├── about.astro     # About page
│   ├── 404.astro       # Custom error page
│   ├── blog/           # Blog routes
│   │   ├── index.astro         # Blog list
│   │   ├── [slug].astro        # Blog post template
│   │   └── rss.xml.ts          # RSS feed generator
│   ├── talks/index.astro       # Talks list
│   ├── forge/index.astro       # Projects list
│   └── newsletter/index.astro  # Newsletter signup
└── styles/
    ├── tokens.css      # Design tokens (colors, spacing)
    └── global.css      # Global styles, animations
```

### Data Flow

**Content Authoring → Build → Deployment**

1. **Author:** Create/edit Markdown or JSON in `src/content/`
2. **Validate:** Zod schemas check structure at build time
3. **Generate:** Astro creates static HTML from content
4. **Deploy:** GitHub Actions pushes `dist/` to GitHub Pages

**YouTube Feed Integration**

1. **Cron Trigger:** Daily GitHub Actions run
2. **Fetch:** HTTP request to YouTube RSS feed
3. **Parse:** XML parser extracts video metadata
4. **Render:** Episode list generated from parsed data
5. **Cache:** Browser caches for 1 hour (Next.js revalidate pattern ported to Astro)

### API & External Integrations

**YouTube RSS Feed:**
- Endpoint: `https://www.youtube.com/feeds/videos.xml?channel_id=...`
- No authentication required
- Fetched daily via GitHub Actions cron
- Parsed with XML parser
- No rate limiting concerns (RSS-based, not API)

**Giscus Comments:**
- Service: GitHub Discussions-based commenting system
- Repository: `SecuringTheRealm/securing.quest`
- Authentication: GitHub OAuth (managed by Giscus)
- Integration: Lazy-loaded component on blog posts
- Theme: Gruvbox Dark (matches site aesthetic)
- Security: GitHub's OAuth 2.0, no credential storage
- Privacy: No tracking cookies, explicit user consent required
- No separate backend or database required
- See ADR-0002 for decision rationale

**Plausible Analytics:**
- Service: Privacy-first web analytics (managed service)
- Instance: plausible.io with custom endpoint
- Script ID: `pa-EUZMXoBFB9OR9p1BrnWMh`
- Privacy: No cookies, no personal data collection
- GDPR/CCPA compliant by default (no consent banner needed)
- Performance: <1KB async script, non-blocking load
- Metrics: Page views, referrers, country, device type (all anonymized)
- See ADR-0003 for decision rationale

**GitHub Pages:**
- Static file hosting
- HTTPS enforced
- Custom domain via CNAME
- No server-side processing

### Performance Architecture

**Build Time (~1.8s for 9 pages):**
- Static generation (no runtime overhead)
- Tree-shaking unused CSS/JS
- Type checking at build time
- Content validation via Zod

**Runtime:**
- Minimal JavaScript (<80KB)
- CSS-only theming (no JS required)
- Lazy-load YouTube embeds
- Efficient SVG rendering

**Performance Budgets:**
- JavaScript: <80KB (compressed)
- CSS: <50KB (compressed)
- Fonts: <100KB (Press Start 2P + Georgia subset)
- Images: Optimized but unoptimized for GitHub Pages

**Core Web Vitals Targets:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

### Security Architecture

**Static Site Security:**
- No server-side code (no injection vulnerabilities)
- No database (no SQL injection)
- No user authentication (no credential theft)
- HTTPS enforced (GitHub Pages default)

**Content Security Policy:**
- GitHub Pages default CSP
- Restrict inline scripts
- Whitelist trusted domains (YouTube, Google Fonts)

**Privacy:**
- **Minimal Data Collection:** Privacy-first by design
- **Analytics:** Plausible (no cookies, no personal data, GDPR compliant)
- **Comments:** Giscus (GitHub OAuth consent required, no tracking)
- **YouTube Embeds:** Click-to-load (no auto-tracking until user interaction)
- **No Third-Party Tracking:** No advertising pixels, no user profiling
- **Data Ownership:** Analytics data owned by us, never sold or shared
- **Transparency:** Open source analytics, auditable comment system

### Accessibility Architecture

**WCAG AA Compliance:**
- Semantic HTML5 structure
- ARIA labels for all interactive elements
- Color contrast ≥4.5:1 (validated)
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader support (tested with VoiceOver/NVDA)

**Progressive Enhancement:**
- Core content accessible without JavaScript
- CSS-only animations (disabled with `prefers-reduced-motion`)
- No JavaScript required for navigation

**Assistive Technology Support:**
- Skip-to-content link (first focusable element)
- Focus indicators on all interactive elements
- Alt text for all images
- SVG `<title>` and `<desc>` elements

### Monitoring & Observability

**Build Monitoring:**
- GitHub Actions logs
- Email notifications on failure
- Build duration tracking

**Performance Monitoring:**
- Lighthouse CI (periodic audits)
- PageSpeed Insights
- Core Web Vitals tracking

**Error Monitoring:**
- Build failures logged in GitHub Actions
- Type errors caught at build time
- Content validation errors caught by Zod

### Scalability Considerations

**Content Scaling:**
- Static generation scales linearly with content
- Build time: ~0.2s per page (Astro fast build)
- GitHub Pages: 1GB site limit (well within budget)

**Traffic Scaling:**
- CDN-backed (GitHub Pages uses Fastly)
- No server-side processing (no bottleneck)
- Static files cached aggressively

**Content Volume:**
- Current: 9 pages, ~15 talks, 2 blog posts, 1 project
- Projected: 100+ pages by end of 2025
- Build time projection: <20s for 100 pages

### Deployment Architecture

**CI/CD Pipeline (GitHub Actions):**
- **Trigger:** Push to `main` or daily cron
- **Build:** Node.js 20.x, npm ci, npm run build
- **Deploy:** GitHub Pages (automatic)
- **Rollback:** Redeploy previous commit

**Environments:**
- **Development:** Local (`npm run dev`)
- **Preview:** PR preview builds (via GitHub Actions artifacts)
- **Production:** GitHub Pages (https://securing.quest)

**Deployment Strategy:**
- Zero-downtime deployments (GitHub Pages atomic)
- Immutable builds (new commit = new build)
- Rollback via Git revert + redeploy

### Development Architecture

**Type Safety:**
- TypeScript strict mode (no `any` types)
- Zod schemas for content validation
- Astro content collections (type-safe)
- Compile-time error checking

**Code Quality:**
- Biome for linting and formatting
- Pre-commit hooks (lint + type check)
- PR checks (build + lint + accessibility)

**Testing Strategy:**
- Type checking (TypeScript + Zod)
- Build validation (Astro compile)
- Manual testing (keyboard nav, screen readers)
- Lighthouse CI (performance + accessibility)

---

## Implementation Patterns

## Implementation Patterns

### Content Collection Pattern

**Defining a Collection:**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, talks, projects };
```

**Using a Collection:**
```typescript
// src/pages/blog/index.astro
---
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const posts = await getCollection('blog',
  (entry: CollectionEntry<'blog'>) => !entry.data.draft
);
const sorted = posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

{sorted.map((post: CollectionEntry<'blog'>) => (
  <article>
    <h2>{post.data.title}</h2>
    <p>{post.data.description}</p>
  </article>
))}
```

### Component Pattern

**Astro Component Structure:**
```astro
---
// Frontmatter (TypeScript)
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- Template (HTML + Astro syntax) -->
<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  /* Scoped CSS */
  .component {
    padding: var(--space-4);
    background: var(--colour-teal-bg);
  }
</style>
```

### Layout Pattern

**Base Layout:**
```astro
---
// src/layouts/Base.astro
import Seo from '../components/Seo.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <Seo title={title} description={description} />
</head>
<body>
  <header>
    <nav><!-- Navigation --></nav>
  </header>
  <main>
    <slot />
  </main>
  <footer><!-- Footer --></footer>
</body>
</html>
```

### Styling Pattern

**Design Tokens (CSS Variables):**
```css
/* src/styles/tokens.css */
:root {
  /* Colors */
  --colour-teal-bg: #0f3c46;
  --colour-gold: #d5a425;
  --colour-stone: #8a877f;
  --colour-parchment: #f3e9d2;

  /* Spacing (8px base) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-4: 1rem;     /* 16px */
  --space-8: 2rem;     /* 32px */

  /* Typography */
  --font-display: 'Press Start 2P', monospace;
  --font-body: Georgia, serif;
  --font-code: 'Courier New', monospace;
}
```

**Usage:**
```css
/* Always use variables, never hardcode */
.button {
  background: var(--colour-gold);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-display);
}

/* BAD: Never do this */
.button-bad {
  background: #d5a425; /* Hardcoded color */
  padding: 8px 16px;   /* Hardcoded spacing */
}
```

### SVG Pattern (Retro Pixel Art)

**Reusable Symbols:**
```astro
---
// Generate unique IDs to avoid collisions
const uid = Math.random().toString(36).slice(2);
---

<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Define reusable elements -->
    <symbol id={`${uid}-window`} viewBox="0 0 32 40">
      <rect width="32" height="40" fill="#000" opacity="0.25" />
      <rect x="2" y="2" width="28" height="36" fill="var(--colour-gold)" />
    </symbol>
  </defs>

  <!-- Use symbols -->
  <use href={`#${uid}-window`} x="100" y="200" />
  <use href={`#${uid}-window`} x="150" y="200" />
</svg>

<style>
  svg {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    shape-rendering: crispEdges;
  }
</style>
```

### Accessibility Pattern

**Semantic HTML + ARIA:**
```astro
<nav aria-label="Main navigation">
  <a href="#main-content" class="skip-link">Skip to content</a>
  <ul role="list">
    <li>
      <a href="/talks/" aria-label="View technical talks and presentations">
        <svg aria-hidden="true"><!-- Icon --></svg>
        <span>Talks</span>
      </a>
    </li>
  </ul>
</nav>

<main id="main-content" tabindex="-1">
  <!-- Content -->
</main>
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### SEO Pattern

**Metadata Component:**
```astro
---
// src/components/Seo.astro
interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<title>{title} - Securing the Realm</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- OpenGraph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image || '/str-logo.png'} />

<!-- JSON-LD -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description
})} />
```

---

## Technical Decisions

### Why Astro?

**Chosen:** Astro 5.14.1
**Alternatives Considered:** Next.js, Gatsby, Hugo

**Rationale:**
- **Zero JavaScript by default** (aligns with performance goals)
- **Content Collections** (type-safe content management)
- **Static Site Generation** (perfect for GitHub Pages)
- **Island Architecture** (add interactivity only where needed)
- **Fast builds** (~1.8s for 9 pages)
- **TypeScript first-class support**

**Tradeoffs:**
- Smaller ecosystem than Next.js
- Less mature than Hugo
- Requires Node.js for builds

### Why TypeScript Strict Mode?

**Chosen:** TypeScript 5.9.3 with strict mode
**Alternatives Considered:** JavaScript, TypeScript with loose mode

**Rationale:**
- **Type safety** catches errors at build time
- **Better IDE support** (autocomplete, refactoring)
- **Self-documenting code** (types as documentation)
- **Content validation** (Zod schemas + TypeScript)

**Tradeoffs:**
- More verbose (explicit type annotations)
- Steeper learning curve for contributors
- Longer build times (type checking)

### Why Biome?

**Chosen:** Biome
**Alternatives Considered:** ESLint + Prettier, Deno

**Rationale:**
- **Unified tool** (linting + formatting in one)
- **10-100x faster** than ESLint + Prettier
- **Zero config** for common patterns
- **Import organization** built-in

**Tradeoffs:**
- Newer ecosystem (less mature)
- Fewer plugins than ESLint
- Migration from ESLint requires changes

### Why GitHub Pages?

**Chosen:** GitHub Pages
**Alternatives Considered:** Netlify, Vercel, Cloudflare Pages

**Rationale:**
- **Free** for public repos
- **Custom domain** support (securing.quest)
- **GitHub Actions integration** (built-in CI/CD)
- **HTTPS enforced** by default
- **CDN-backed** (Fastly)

**Tradeoffs:**
- No server-side rendering
- No build-time secrets (all public)
- Limited to static files
- No custom headers/redirects

### Why Content Collections?

**Chosen:** Astro Content Collections
**Alternatives Considered:** CMS (Contentful, Sanity), File-based (raw Markdown)

**Rationale:**
- **Type safety** (Zod schemas validate at build time)
- **Git-based** (no external dependencies)
- **Local development** (no API calls)
- **Version control** (content is code)

**Tradeoffs:**
- No GUI for non-technical editors
- No real-time preview
- Requires Git knowledge

---

## Technical Constraints

### Browser Support

**Desktop:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

**Mobile:**
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

**Graceful Degradation:**
- Core content accessible without JavaScript
- Animations disabled for older browsers
- Fallback fonts for Press Start 2P

### GitHub Pages Limitations

**Site Size:**
- 1GB maximum (current: <10MB)
- No file size limits

**Build Limits:**
- 10 builds per hour (rarely hit)
- 10 minutes build timeout (current: <2 minutes)

**No Server-Side:**
- No Node.js at runtime
- No environment variables
- No custom headers

### Performance Budgets

**JavaScript:** <80KB (compressed)
**CSS:** <50KB (compressed)
**Fonts:** <100KB (Press Start 2P + Georgia)
**Images:** Unoptimized (GitHub Pages limitation)

### Accessibility Standards

**WCAG AA Compliance:**
- Color contrast ≥4.5:1
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML

---

## Future Technical Enhancements

### Phase 2: Search ✅ COMPLETED
- ✅ Client-side search with Fuse.js
- ✅ Indexed content (blog posts, talks, projects)
- ✅ No backend required

### Phase 3: Analytics & Community ✅ COMPLETED (Early)
- ✅ Privacy-focused analytics (Plausible)
- ✅ No cookies required
- ✅ GDPR/CCPA compliant by default
- ✅ Comment system (Giscus - GitHub Discussions)
- ✅ GitHub OAuth authentication
- ✅ No separate backend infrastructure

### Phase 4: Content Enhancements (Q2 2025)
- Newsletter integration (ConvertKit/Mailchimp)
- RSS feed enhancements
- Content series/collections
- Related posts recommendations

### Phase 5: i18n (2026)
- Multi-language support
- Astro i18n integration
- Translated content collections

---

## Appendices

### A. Technical Glossary

**Astro:** Static site generator with island architecture
**Content Collection:** Type-safe content management in Astro
**Island Architecture:** Partial hydration (JavaScript only where needed)
**SSG:** Static Site Generation (pre-rendered at build time)
**Zod:** TypeScript-first schema validation library
**MDX:** Markdown with embedded JSX components

### B. External Resources

**Documentation:**
- Astro: https://docs.astro.build
- TypeScript: https://www.typescriptlang.org/docs
- Biome: https://biomejs.dev

**Tools:**
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- Zod: https://zod.dev
- GitHub Actions: https://docs.github.com/en/actions

---

**Document History:**

| Version | Date       | Author             | Changes                    |
| ------- | ---------- | ------------------ | -------------------------- |
| 1.0     | 2025-01-15 | Chris Lloyd-Jones  | Initial architecture doc   |