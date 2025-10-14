# Product Requirements Document: Securing the Realm

**Version:** 1.0
**Last Updated:** 2025-01-15
**Status:** Active
**Owner:** Chris Lloyd-Jones & Josh McDonald

---

## Executive Summary

Securing the Realm is a static website that transforms complex cybersecurity, Azure, and AI content into an engaging 8-bit fantasy castle-themed experience. The site serves as the digital home for the "Securing the Realm" YouTube channel and podcast, making technical content accessible through epic storytelling and gaming metaphors.

**Target Deployment:** https://securing.quest (GitHub Pages Static)

---

## Product Vision

### Mission Statement
To make cybersecurity, cloud architecture, and AI accessible and engaging by blending technical depth with fantasy gaming aesthetics, creating a unique learning experience that appeals to both seasoned professionals and curious newcomers.

### Core Values
- **Accessibility:** Complex topics presented through relatable gaming metaphors
- **Technical Depth:** Real-world architecture and best practices
- **Performance:** Fast, lightweight static site (<80KB JS, <2.5s LCP)
- **Inclusivity:** WCAG AA compliant, keyboard navigation, screen reader support

---

## Target Audience

### Primary Personas

**1. The Cloud Adventurer**
- **Role:** Azure developers, cloud architects
- **Goals:** Learn practical Azure patterns, AI implementation strategies
- **Pain Points:** Dry technical documentation, lack of real-world examples
- **Engagement:** Video tutorials, blog posts, architectural diagrams

**2. The Security Guardian**
- **Role:** Cybersecurity professionals, DevSecOps engineers
- **Goals:** Stay current with security practices, learn Azure security features
- **Pain Points:** Information overload, difficulty connecting theory to practice
- **Engagement:** Security-focused content, case studies, code examples

**3. The Curious Newcomer**
- **Role:** Students, career changers, hobbyists
- **Goals:** Understand cloud/AI concepts, explore career paths
- **Pain Points:** Intimidating jargon, unclear learning paths
- **Engagement:** Beginner-friendly explanations, guided learning quests

---

## Product Goals

### Business Objectives
1. **Content Distribution:** Centralized hub for all Securing the Realm content
2. **Community Building:** Grow audience across YouTube, podcasts, social media
3. **Brand Identity:** Establish unique voice blending tech and gaming
4. **Newsletter Growth:** Capture email subscribers for "Arcane Scrolls" newsletter

### Technical Objectives
1. **Performance:** Lighthouse score >90, LCP <2.5s
2. **SEO:** Optimized metadata, sitemap, structured data
3. **Accessibility:** WCAG AA compliance, keyboard navigation
4. **Maintainability:** Type-safe content management, automated deployments

### User Experience Objectives
1. **Discovery:** Easy navigation between video content, blog posts, projects
2. **Engagement:** Immersive 8-bit castle theme maintains attention
3. **Learning:** Progressive disclosure of complex topics
4. **Action:** Clear CTAs for newsletter signup, social follows

---

## Core Features

### 1. Content Hub (Priority: P0)

**YouTube Video Integration**
- Automated RSS feed parsing from YouTube channel
- Episode list with metadata (title, date, description)
- Privacy-focused YouTube embed (click-to-load)
- Markdown rendering for episode descriptions
- Chapter markers as collapsible sections

**Blog Posts**
- Markdown/MDX authoring with frontmatter
- Tags, categories, publish dates
- Draft mode for unpublished content
- RSS feed generation
- Syntax highlighting for code blocks

**Technical Talks**
- JSON-based metadata storage
- Video URLs, slide decks, event information
- Tag-based filtering
- Archive of past presentations

**Code Projects (Forge)**
- JSON-based project metadata
- GitHub repository links
- Technology stack tags
- Active/archived status indicators

### 2. Navigation & Discovery (Priority: P0)

**Castle Metaphor Navigation**
- **Tower** → Talks (Video presentations)
- **Library** → Blog (Written content)
- **Forge** → Projects (Code repositories)
- **Arcane Scrolls** → Newsletter

**Navigation Components**
- Fixed sidebar (desktop) with castle illustration
- Responsive mobile menu
- "Elsewhere" social links section
- Host information panel

### 3. Design System (Priority: P0)

**8-Bit Pixel Art Theme**
- SVG castle scene with retro aesthetic
- Consistent 8px grid system
- 2px stroke width for all outlines
- Press Start 2P font for headings
- Georgia serif for body text

**Color Palette** (CSS variables only)
- `--colour-teal-bg` (#0f3c46) - Primary background
- `--colour-gold` (#d5a425) - Accents, CTAs
- `--colour-stone` (#8a877f) - Secondary text
- `--colour-parchment` (#f3e9d2) - Light backgrounds

**Animation Standards**
- Subtle animations (0.8-4s duration)
- `ease-in-out` easing only
- Respects `prefers-reduced-motion`
- No jarring visual effects

### 4. Performance Optimizations (Priority: P0)

**Build-Time Optimization**
- Static site generation (SSG) with Astro
- Type-checked content collections
- Tree-shaking unused CSS/JS
- Image optimization (unoptimized for GitHub Pages)

**Runtime Performance**
- Minimal JavaScript (<80KB total)
- CSS variables for theming (no JS required)
- Lazy-load YouTube embeds
- Efficient SVG rendering

### 5. Accessibility (Priority: P0)

**WCAG AA Compliance**
- Semantic HTML5 (header, nav, main, footer, article)
- ARIA labels for all interactive elements
- Color contrast ≥4.5:1
- Keyboard navigation (Tab, Enter, Escape)
- Skip-to-content link
- Screen reader friendly

**Inclusive Design**
- Alt text for all images
- SVG `<title>` and `<desc>` elements
- Focus indicators on interactive elements
- No animations for `prefers-reduced-motion`

### 6. SEO & Metadata (Priority: P1)

**Page-Level SEO**
- Unique title tags (template: `%s - Securing the Realm`)
- Meta descriptions
- OpenGraph tags for social sharing
- Twitter Card metadata
- Canonical URLs

**Structured Data**
- JSON-LD for blog posts
- Episode schema for video content
- Organization schema
- Breadcrumb markup

**Sitemaps & Feeds**
- XML sitemap (`/sitemap.xml`)
- RSS feed for blog (`/blog/rss.xml`)
- `robots.txt` for crawler directives

### 7. Content Management (Priority: P1)

**Type-Safe Content Collections**
- Zod schemas for validation (blog, talks, projects)
- Frontmatter type checking at build time
- Compile-time error for invalid content

**Content Authoring Workflow**
1. Create Markdown/JSON file in appropriate collection
2. Run `npm run dev` for local preview
3. Run `npm run build` for type validation
4. Commit and push (triggers CI/CD)

### 8. CI/CD Pipeline (Priority: P0)

**GitHub Actions Workflow** (`.github/workflows/publish.yml`)
- **Triggers:**
  - Push to `main` branch
  - Daily cron (0 0 * * *) for YouTube feed updates
- **Steps:**
  1. Checkout code
  2. Setup Node.js 20.x
  3. Cache npm dependencies
  4. Run `npm ci` (clean install)
  5. Run `npm run build` (includes type checking)
  6. Upload `dist/` as artifact
  7. Deploy to GitHub Pages

**Build Validation**
- TypeScript strict mode (zero errors required)
- Astro content validation
- Biome linting (warnings acceptable, errors block)

---

## Technical Architecture

### Technology Stack

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
- Automated via GitHub Actions

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

### Content Collections

**Blog Collection** (`src/content/blog/*.md`)
```typescript
z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false)
})
```

**Talks Collection** (`src/content/talks/*.json`)
```typescript
z.object({
  title: z.string(),
  date: z.string(), // ISO date
  event: z.string(),
  videoUrl: z.string().url(),
  slidesUrl: z.string().url().optional(),
  summary: z.string(),
  tags: z.array(z.string())
})
```

**Projects Collection** (`src/content/projects/*.json`)
```typescript
z.object({
  name: z.string(),
  description: z.string(),
  repoUrl: z.string().url(),
  tech: z.array(z.string()),
  status: z.enum(['active', 'archived'])
})
```

---

## User Stories & Acceptance Criteria

### Epic 1: Content Discovery

**US-1.1: As a visitor, I want to see the latest YouTube videos so I can watch new content**
- **AC1:** Homepage displays list of episodes from YouTube RSS feed
- **AC2:** Each episode shows title, date, description, thumbnail
- **AC3:** Episodes sorted by publish date (newest first)
- **AC4:** Click-to-load YouTube embed (no auto-load for privacy)

**US-1.2: As a reader, I want to browse blog posts so I can learn from written tutorials**
- **AC1:** `/blog/` page lists all published blog posts
- **AC2:** Each post shows title, date, tags, excerpt
- **AC3:** Posts sorted by date (newest first)
- **AC4:** Click post to read full content
- **AC5:** Draft posts not visible in production

**US-1.3: As a developer, I want to explore code projects so I can learn from examples**
- **AC1:** `/forge/` page lists all active projects
- **AC2:** Each project shows name, description, tech stack
- **AC3:** Link to GitHub repository opens in new tab
- **AC4:** Archived projects visually distinguished

### Epic 2: Navigation & UX

**US-2.1: As a user, I want intuitive navigation so I can find content quickly**
- **AC1:** Sidebar (desktop) shows castle illustration with clickable regions
- **AC2:** Mobile menu accessible via hamburger icon
- **AC3:** "Tower" → Talks, "Library" → Blog, "Forge" → Projects
- **AC4:** Active page highlighted in navigation

**US-2.2: As a keyboard user, I want to navigate without a mouse so I can access all features**
- **AC1:** Tab key cycles through interactive elements in logical order
- **AC2:** Enter key activates links/buttons
- **AC3:** Escape key closes modals/menus
- **AC4:** Skip-to-content link as first focusable element

**US-2.3: As a screen reader user, I want descriptive labels so I understand page structure**
- **AC1:** All images have alt text
- **AC2:** Interactive elements have ARIA labels
- **AC3:** Headings follow semantic hierarchy (h1 → h2 → h3)
- **AC4:** Landmarks (header, nav, main, footer) properly defined

### Epic 3: Performance & Accessibility

**US-3.1: As a mobile user, I want fast page loads so I don't waste data**
- **AC1:** Lighthouse Performance score >90
- **AC2:** Largest Contentful Paint (LCP) <2.5s
- **AC3:** Total JavaScript <80KB
- **AC4:** First Contentful Paint (FCP) <1.8s

**US-3.2: As a user with motion sensitivity, I want animations disabled so I'm not nauseated**
- **AC1:** All animations disabled when `prefers-reduced-motion: reduce`
- **AC2:** Static images replace animated elements
- **AC3:** Page remains fully functional without animations

**US-3.3: As a visually impaired user, I want sufficient color contrast so I can read text**
- **AC1:** All text meets WCAG AA contrast (4.5:1)
- **AC2:** Interactive elements have visible focus indicators
- **AC3:** Color not sole indicator of meaning

### Epic 4: Content Management

**US-4.1: As an author, I want to write blog posts in Markdown so I can format text easily**
- **AC1:** Create `.md` file in `src/content/blog/`
- **AC2:** Frontmatter validated at build time (title, date, description)
- **AC3:** Markdown rendered to HTML with syntax highlighting
- **AC4:** Draft posts excluded from production build

**US-4.2: As an author, I want to add talks to the site so I can showcase presentations**
- **AC1:** Create `.json` file in `src/content/talks/`
- **AC2:** Schema validation at build time (title, date, event, videoUrl)
- **AC3:** Talk appears in `/talks/` list
- **AC4:** Video embed loads on demand

**US-4.3: As an author, I want to publish code projects so I can share work**
- **AC1:** Create `.json` file in `src/content/projects/`
- **AC2:** Schema validation at build time (name, description, repoUrl, tech, status)
- **AC3:** Project appears in `/forge/` list
- **AC4:** GitHub link opens in new tab

### Epic 5: SEO & Discoverability

**US-5.1: As a content creator, I want good SEO so people find my content in search**
- **AC1:** Unique title tags for every page
- **AC2:** Meta descriptions under 160 characters
- **AC3:** OpenGraph tags for social media previews
- **AC4:** Sitemap auto-generated at `/sitemap.xml`
- **AC5:** RSS feed available at `/blog/rss.xml`

**US-5.2: As a reader, I want to share content on social media so I can recommend it**
- **AC1:** OpenGraph tags render rich previews
- **AC2:** Twitter Card metadata included
- **AC3:** Images optimized for social sharing

---

## Design Requirements

### Visual Identity

**Theme:** 8-bit fantasy castle
**Mood:** Playful yet professional, nostalgic, approachable
**Inspiration:** Retro RPGs (Final Fantasy, Dragon Quest), pixel art

### Typography

**Headings:** Press Start 2P (8-bit pixel font)
- Font size: 11px standard, 9px for long labels
- Letter spacing: 1px
- Single words only (e.g., "NEWSLETTER" not "NEWS LETTER")

**Body:** Georgia serif
- Line height: 1.6
- Font size: 16px (1rem) base
- Responsive scaling

**Code:** Courier New monospace
- Background: Subtle gray
- Syntax highlighting for code blocks

### Color Palette

**Primary Colors:**
- Teal Background: `--colour-teal-bg` (#0f3c46)
- Gold Accent: `--colour-gold` (#d5a425)
- Stone Gray: `--colour-stone` (#8a877f)
- Parchment: `--colour-parchment` (#f3e9d2)

**Secondary Colors:**
- Teal Light: `--colour-teal-light` (for highlights)
- Stone Dark: `--colour-stone-dark` (for shadows)
- Gold Light: `--colour-gold-light` (for hover states)

**Semantic Colors:**
- Links: Gold (#d5a425), darker on hover
- Success: Green (castle moss)
- Warning: Orange (torch glow)
- Error: Red (dragon fire)

### Layout

**Desktop (≥1024px):**
- Fixed sidebar (280px width)
- Castle illustration above navigation
- Main content area with max-width 800px
- Generous whitespace

**Tablet (768px - 1023px):**
- Collapsible navigation
- Full-width content
- Stack castle illustration above menu

**Mobile (<768px):**
- Hamburger menu
- Single column layout
- Touch-friendly tap targets (44x44px minimum)

### Interactive Elements

**Buttons:**
- Pixel art borders (2px)
- Gold background, teal text
- Hover: Slightly brighter gold
- Active: Pressed appearance (shadow inset)

**Links:**
- Underline on hover
- Color: Gold
- Visited: Slightly darker gold

**Forms:**
- Pixel art borders
- Placeholder text in stone gray
- Focus: Gold border glow
- Error: Red border with message

---

## Content Strategy

### Content Types

**1. YouTube Videos (Primary Content)**
- **Frequency:** Weekly (target)
- **Length:** 20-60 minutes
- **Topics:** Azure architecture, AI implementation, cybersecurity
- **Format:** Demo-heavy with storytelling narrative
- **Distribution:** YouTube, podcast platforms, website embed

**2. Blog Posts (Supporting Content)**
- **Frequency:** Bi-weekly (target)
- **Length:** 1500-3000 words
- **Topics:** Deep dives, tutorials, case studies
- **Format:** Markdown with code examples, diagrams
- **Distribution:** Website, RSS feed, social media

**3. Technical Talks (Showcase Content)**
- **Frequency:** As delivered at conferences
- **Length:** 30-60 minutes
- **Topics:** Specific technical presentations
- **Format:** Video + slides
- **Distribution:** Website archive, YouTube

**4. Code Projects (Tangible Examples)**
- **Frequency:** Monthly (target)
- **Format:** GitHub repositories with README
- **Topics:** Sample implementations, tools, demos
- **Distribution:** GitHub, website showcase

### Editorial Calendar

**Weekly Schedule:**
- **Monday:** YouTube video publish
- **Wednesday:** Social media engagement (LinkedIn, Twitter)
- **Friday:** Newsletter "Arcane Scrolls" (bi-weekly)

**Monthly Themes:**
- **Weeks 1-2:** Azure infrastructure & deployment
- **Weeks 3-4:** AI/ML implementation & ethics

### SEO Keywords (Target)

**Primary:**
- Azure architecture
- AI implementation
- Cybersecurity best practices
- Cloud security
- LLM deployment

**Secondary:**
- Azure Functions
- Azure AI Studio
- Responsible AI
- DevSecOps
- Open source AI

---

## Success Metrics

### Key Performance Indicators (KPIs)

**Traffic Metrics**
- **Target:** 10,000 unique visitors/month by Q4 2025
- **Measurement:** Google Analytics, GitHub Pages analytics
- **Baseline:** TBD (initial launch)

**Engagement Metrics**
- **Target:** 3-minute average session duration
- **Measurement:** Google Analytics
- **Target:** <40% bounce rate

**Content Metrics**
- **Target:** 1,000 YouTube subscribers by Q4 2025
- **Target:** 500 newsletter subscribers by Q4 2025
- **Target:** 24 blog posts published (2/month)

**Performance Metrics**
- **Target:** Lighthouse Performance score >90
- **Target:** Largest Contentful Paint (LCP) <2.5s
- **Target:** Cumulative Layout Shift (CLS) <0.1

**Accessibility Metrics**
- **Target:** WCAG AA compliance (100%)
- **Target:** Lighthouse Accessibility score >95

### Tracking & Analytics

**Google Analytics 4:**
- Page views by URL
- Session duration
- Bounce rate
- Traffic sources
- User demographics

**GitHub Actions:**
- Build success rate
- Build duration
- Deployment frequency

**Lighthouse CI:**
- Automated performance audits
- Accessibility checks
- SEO validation

---

## Technical Constraints

### Performance Budgets

**JavaScript:** <80KB total (compressed)
**CSS:** <50KB total (compressed)
**Images:** Optimized via build process (but unoptimized for GitHub Pages)
**Fonts:** <100KB total (Press Start 2P + Georgia subset)

### Browser Support

**Desktop:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

**Mobile:**
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

**Note:** Graceful degradation for older browsers (core content accessible, animations disabled)

### Accessibility Standards

**WCAG AA Compliance:**
- Color contrast ≥4.5:1
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML
- Alt text for images
- ARIA labels where needed

---

## Development Workflow

### Local Development

```bash
# Install dependencies (REQUIRED FIRST)
npm install

# Start development server (http://localhost:4321)
npm run dev

# Run type checking
npx astro check

# Run linting
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Pre-Commit Checklist

- [ ] Run `npm run lint` (no errors)
- [ ] Run `npx astro check` (no errors)
- [ ] Run `npm run build` (successful)
- [ ] Test keyboard navigation
- [ ] Test screen reader (VoiceOver/NVDA)
- [ ] Check responsive breakpoints (mobile, tablet, desktop)
- [ ] Verify design tokens used (no hardcoded colors)

### Git Workflow

**Branch Strategy:**
- `main` - Production branch (auto-deploys)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

**Commit Convention:**
- Use Commitizen (`npm run commit`)
- Format: `type(scope): message`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `cicd`

**Pull Request Requirements:**
- Build passes (TypeScript + Biome)
- No linting errors
- Accessibility checks pass
- Reviewer approval

---

## Security & Privacy

### Data Collection

**No Personal Data Collection:**
- No cookies set by site
- No analytics by default (can be added optionally)
- No user accounts or authentication

**YouTube Embeds:**
- Click-to-load (no auto-load for privacy)
- Uses `youtube-nocookie.com` domain when possible
- User consent required before loading embed

### Content Security

**CSP Headers** (GitHub Pages default)
- Restrict inline scripts
- Whitelist trusted domains (YouTube, fonts)

**HTTPS Only:**
- All pages served over HTTPS
- Custom domain enforced HTTPS

---

## Maintenance & Support

### Content Updates

**YouTube Feed:**
- Automated daily via GitHub Actions cron
- Manual update: Push to `main` branch
- No manual intervention required

**Blog Posts:**
- Add Markdown file to `src/content/blog/`
- Commit and push to trigger build
- Auto-publishes on successful build

**Design Updates:**
- Modify CSS variables in `src/styles/tokens.css`
- Update component styles in respective `.astro` files
- Test across breakpoints

### Monitoring

**Build Monitoring:**
- GitHub Actions email notifications on failure
- Review logs in Actions tab

**Uptime Monitoring:**
- GitHub Pages status page
- Manual checks via status dashboard

**Performance Monitoring:**
- Periodic Lighthouse audits (monthly)
- PageSpeed Insights checks

---

## Future Roadmap

### Phase 1: MVP (Current)
- ✅ YouTube video integration
- ✅ Blog posts (Markdown)
- ✅ Talks archive (JSON)
- ✅ Code projects showcase
- ✅ 8-bit castle theme
- ✅ Responsive design
- ✅ WCAG AA accessibility
- ✅ GitHub Pages deployment

### Phase 2: Enhanced Discovery (Q2 2025)
- [ ] Search functionality (client-side with Fuse.js)
- [ ] Tag-based filtering (blog, talks, projects)
- [ ] Related content recommendations
- [ ] Series/playlists for video content
- [ ] Interactive castle map navigation

### Phase 3: Community Features (Q3 2025)
- [ ] Newsletter integration (Mailchimp/ConvertKit)
- [ ] Comment system (GitHub Discussions integration)
- [ ] RSS feed enhancements (full content, enclosures)
- [ ] Social sharing buttons (native, no tracking)

### Phase 4: Advanced Content (Q4 2025)
- [ ] Interactive tutorials (step-by-step guides)
- [ ] Code playgrounds (embed CodePen/StackBlitz)
- [ ] Animated diagrams (SVG with GSAP)
- [ ] Video transcripts (auto-generated via YouTube API)

### Phase 5: Internationalization (2026)
- [ ] Multi-language support (i18n)
- [ ] Translated content (blog posts, UI)
- [ ] Language selector in navigation

---

## Risks & Mitigations

### Risk 1: YouTube API Rate Limits
**Probability:** Low
**Impact:** Medium
**Mitigation:** Use RSS feed (no authentication required), cache responses

### Risk 2: Build Failures from Invalid Content
**Probability:** Medium
**Impact:** Medium
**Mitigation:** Zod schema validation, pre-commit hooks, CI type checking

### Risk 3: Performance Degradation
**Probability:** Low
**Impact:** High
**Mitigation:** Performance budgets, Lighthouse CI, regular audits

### Risk 4: Accessibility Regression
**Probability:** Medium
**Impact:** High
**Mitigation:** Automated a11y checks, manual testing, PR review checklist

### Risk 5: Design Consistency Drift
**Probability:** Medium
**Impact:** Medium
**Mitigation:** Design tokens enforcement, code review, visual regression testing

---

## Appendices

### A. Glossary

**Astro:** Static site generator with island architecture
**Content Collection:** Type-safe content management in Astro
**Frontmatter:** Metadata at top of Markdown files (YAML format)
**LCP:** Largest Contentful Paint (Core Web Vital metric)
**MDX:** Markdown with embedded JSX components
**SSG:** Static Site Generation (pre-rendered at build time)
**WCAG:** Web Content Accessibility Guidelines
**Zod:** TypeScript-first schema validation library

### B. External Resources

**Documentation:**
- Astro: https://docs.astro.build
- TypeScript: https://www.typescriptlang.org/docs
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/

**Tools:**
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights: https://pagespeed.web.dev
- WAVE Accessibility: https://wave.webaim.org

**Design:**
- Press Start 2P Font: https://fonts.google.com/specimen/Press+Start+2P
- Pixel Art Tutorial: https://lospec.com/pixel-art-tutorials

### C. Contact Information

**Product Owners:**
- Chris Lloyd-Jones: https://www.linkedin.com/in/chrislloydjones/
- Josh McDonald: https://www.linkedin.com/in/joshmcdonalduk/

**GitHub Repository:**
https://github.com/SecuringTheRealm/securingtherealm.github.io

**Live Site:**
https://securing.quest

---

**Document History:**

| Version | Date       | Author             | Changes             |
| ------- | ---------- | ------------------ | ------------------- |
| 1.0     | 2025-01-15 | Chris Lloyd-Jones  | Initial PRD created |