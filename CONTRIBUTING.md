# Contributing to Securing the Realm

Thank you for your interest in contributing! This document provides guidelines for contributing to the Securing the Realm website.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/securingtherealm.github.io.git
   cd securingtherealm.github.io
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names following this pattern:

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `style/description` - Style/formatting changes
- `test/description` - Test additions or modifications
- `chore/description` - Maintenance tasks

### Commit Messages

We follow Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, whitespace)
- `refactor`: Code refactoring
- `test`: Test updates
- `chore`: Build process or tooling changes

Example:
```
feat(blog): add reading time to blog posts

Calculate and display estimated reading time for each blog post
based on word count and average reading speed.

Closes #123
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow strict mode settings in `tsconfig.json`
- Use interfaces for data structures
- Prefer `const` over `let`, avoid `var`
- Use descriptive variable and function names

### Naming Conventions

- **PascalCase**: Components, interfaces, types (`BlogPost`, `TalkMetadata`)
- **camelCase**: Variables, functions (`formatDate`, `getTalks`)
- **kebab-case**: File names, routes (`blog-post.astro`, `/about/`)
- **UPPER_SNAKE_CASE**: Constants (`MAX_POSTS_PER_PAGE`)

### Astro Components

```astro
---
// Script section - imports and logic
import Base from '../layouts/Base.astro';
import type { CollectionEntry } from 'astro:content';

interface Props {
  title: string;
  items: CollectionEntry<'blog'>[];
}

const { title, items } = Astro.props;
---

<!-- Template section -->
<Base title={title}>
  <div class="container">
    <!-- Component content -->
  </div>
</Base>

<style>
  /* Scoped styles */
  .container {
    /* Use CSS custom properties from tokens.css */
    padding: var(--space-4);
  }
</style>
```

### CSS/Styling

- Use CSS custom properties from `src/styles/tokens.css`
- Follow BEM naming for custom classes if needed
- Prefer semantic HTML over div soup
- Use inline styles sparingly (mainly for dynamic values)
- Ensure all interactive elements have focus states

Example:
```css
/* Good - uses design tokens */
.card {
  padding: var(--space-4);
  background: var(--colour-teal-dark);
  border-radius: var(--radius-outer);
}

/* Avoid - hardcoded values */
.card {
  padding: 16px;
  background: #0a2730;
  border-radius: 8px;
}
```

## Content Guidelines

### Blog Posts

Create blog posts in `src/content/blog/` using Markdown or MDX:

```markdown
---
title: "Your Awesome Title"
description: "A brief description that appears in listings"
pubDate: 2025-01-15
tags: ["azure", "security", "ai"]
draft: false
---

# Introduction

Your content here...
```

- Use descriptive, SEO-friendly titles
- Keep descriptions under 160 characters
- Use relevant tags (3-5 per post)
- Mark as `draft: true` until ready to publish

### Talks

Add talks to `src/content/talks/` as JSON files:

```json
{
  "title": "Talk Title",
  "date": "2025-01-15",
  "event": "Conference Name",
  "videoUrl": "https://youtube.com/watch?v=...",
  "slidesUrl": "https://example.com/slides.pdf",
  "summary": "Brief summary of the talk content",
  "tags": ["azure", "security"]
}
```

### Projects

Add projects to `src/content/projects/` as JSON files:

```json
{
  "name": "Project Name",
  "description": "What this project does",
  "repoUrl": "https://github.com/org/repo",
  "tech": ["TypeScript", "Azure", "AI"],
  "status": "active"
}
```

Status options: `active`, `archived`, `experimental`

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Page loads correctly in development
- [ ] All links work
- [ ] Images load and have alt text
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

### Accessibility Testing

- [ ] Tab through all interactive elements
- [ ] Test with keyboard only (no mouse)
- [ ] Check color contrast ratios
- [ ] Test with a screen reader if possible
- [ ] Verify alt text on images
- [ ] Check heading hierarchy

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the coding standards
3. **Test thoroughly** using the checklist above
4. **Update documentation** if needed (README, this file, etc.)
5. **Commit your changes** with conventional commit messages
6. **Push to your fork** and create a pull request
7. **Fill out the PR template** completely
8. **Respond to feedback** from reviewers

### PR Title Format

Use conventional commit format:

```
feat: Add reading time to blog posts
fix: Correct navigation link to forge page
docs: Update CONTRIBUTING with Astro guidelines
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring
- [ ] Style/formatting
- [ ] Other (describe)

## Testing
Describe how you tested these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings or errors
- [ ] Tested on multiple browsers/devices
- [ ] Checked accessibility
```

## Design System

Follow the design system documented in `DESIGN.md`:

- Use the approved color palette (teal, gold, stone, parchment)
- Use Press Start 2P for headings, Georgia for body text
- Maintain the 8-bit fantasy castle theme
- Ensure responsive design
- Follow accessibility guidelines

## Questions or Need Help?

- Open an issue for bugs or feature requests
- Use discussions for questions or ideas
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT for code, CC BY-SA 4.0 for content).

---

Thank you for contributing to Securing the Realm! Together, we secure the realm! 🏰✨
