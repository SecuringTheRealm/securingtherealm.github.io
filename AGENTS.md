# AGENTS Guidelines

This repository uses **TypeScript** and **Astro**. Use the practices below when contributing.

## General Best Practices

- Follow a functional programming style wherever practical.
- Prefer immutable data using `const` and `readonly`.
- Use interfaces for data structures and types.
- Take advantage of optional chaining (`?.`) and nullish coalescing (`??`).
- Write comments and documentation in US English.
- Use CSS variables for theme values and ensure components are responsive across screen sizes.
- Log errors with contextual information.

## TypeScript and Naming

- Write all new code in TypeScript.
- Use `PascalCase` for component names, interfaces, and type aliases.
- Use `camelCase` for variables, functions, and methods.
- Prefix private class members with an underscore (`_`).
- Use `ALL_CAPS` for constants.

## Astro Component Guidelines

- Use `.astro` files for Astro components.
- Define component props using TypeScript interfaces exported in the frontmatter.
- Use functional components for any embedded React/Preact components.
- Keep components small and focused with styles scoped within the component.
- Develop reusable components whenever possible.
- Use the `class:list` directive for conditional styling.

## SVG and Pixel Art Guidelines

### Retro Quality Standards

All SVG components follow strict 8-bit quality standards:

#### Grid System
- **8px base grid**: All elements align to an 8-pixel grid for consistency
- **Snap all coordinates**: X and Y values must be multiples of 4 or 8
- **No half-pixels**: Avoid sub-pixel coordinates to ensure crisp rendering

#### Stroke and Structure
- **Unified stroke width**: Always use 2px stroke width for all outlines
- **Consistent style**: Never mix stroke widths within a single composition
- **Isometric perspective**: Use 2:1 ratio for depth faces (2px horizontal = 1px vertical)

#### Color Palette
- **16-24 colors maximum**: Defined in `src/styles/tokens.css`
- **Always use CSS variables**: Never hardcode hex colors like `#0f3c46`
- **Primary palette**:
  - Sky/Background: `--colour-teal-bg`, gradients for depth
  - Buildings: `--colour-teal-bg` with `--colour-teal-light` highlights
  - Stone/Structure: `--colour-stone`, `--colour-stone-dark`
  - Accents: `--colour-gold`, `--colour-gold-light`
  - Text: `--colour-parchment`

#### Lighting and Shadows
- **Consistent light direction**: Moon/sun positioned top-right = highlights on right, shadows on left
- **Highlight placement**: Right edges and top surfaces receive `#fff` at 6-12% opacity
- **Shadow placement**: Left edges and bottom surfaces receive `#000` at 10-20% opacity
- **Cast shadows**: Ground shadows use `<ellipse>` with `#000` at 15-25% opacity

#### Architectural Elements
- **Windows**: 32x40px standard size, using reusable `<symbol id="window">`
- **Doors**: 40x56px with arched pixel-art tops, using `<symbol id="door">`
- **Merlons** (battlements): 24x24px, consistent spacing at 48px intervals
- **Bricks**: 16x8px texture elements at 8% opacity for subtle detail

#### Reusability
- **Define symbols once**: Use `<defs><symbol>` for repeated elements
- **Reference with `<use>`**: Place instances with `<use href="#symbol">`
- **Benefits**: Consistency, smaller file size, easier maintenance

#### Typography
- **Font**: `'Press Start 2P', 'Courier New', monospace`
- **Size**: 11px standard, 9px for longer labels like "NEWSLETTER"
- **Spacing**: 1px letter-spacing for retro feel
- **Color**: Always `var(--colour-parchment)`
- **Single words**: Use "NEWSLETTER" not "NEWS LETTER", "CODE" not "PROJECTS"

#### Animation Guidelines
- **Subtle and smooth**: Avoid jarring steps() easing, use `ease-in-out`
- **Duration ranges**:
  - Quick: 0.8-1.5s (sparks, forge glow)
  - Medium: 2-3s (flags, window glow, stars)
  - Slow: 4s+ (smoke, moon glow)
- **Respect motion preferences**: All animations disabled with `@media (prefers-reduced-motion: reduce)`

#### Icons (16x16 Pixel Art)
- **Consistent language**: All icons share 2px stroke, similar corner radius, unified silhouette
- **Video**: Monitor frame with play triangle
- **Book**: Two-page spread with spine and text lines
- **Anvil**: Blacksmith anvil with hammer and sparks
- **Scroll**: Parchment with curled edges and wax seal

### Implementation Checklist

When creating or modifying SVG components:

- [ ] All coordinates snap to 8px grid
- [ ] Stroke width is consistently 2px
- [ ] Colors use CSS variables from `tokens.css`
- [ ] Lighting direction matches scene (moon top-right)
- [ ] Cast shadows present on ground
- [ ] Reusable elements defined as `<symbol>` in `<defs>`
- [ ] Typography uses Press Start 2P, 11px, single words
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Focus and hover states implemented
- [ ] ARIA labels and SVG metadata complete
- [ ] File tested at 50% scale for legibility

### Example Pattern: Reusable Window

```astro
<!-- In <defs> -->
<symbol id="window" viewBox="0 0 32 40">
  <rect width="32" height="40" fill="#000" opacity="0.25" />
  <rect x="2" y="2" width="28" height="36" class="window-light" />
  <rect x="14" y="2" width="2" height="36" fill="var(--colour-stone-dark)" opacity="0.4" />
  <rect x="2" y="18" width="28" height="2" fill="var(--colour-stone-dark)" opacity="0.4" />
</symbol>

<!-- In building -->
<use href="#window" x="216" y="248" />
```

### Visual Consistency Rules

For pixel art SVG components, always use `image-rendering: pixelated` and `image-rendering: crisp-edges`.

Use CSS variables for theme values and ensure components are responsive across screen sizes.

## Common Astro + SVG Pitfalls (Castle Scene Reference)

When building or modifying the castle scene (or any SVG component) in Astro, watch for these recurring issues:

1. Gradient Scope
  - ISSUE: Defining `<linearGradient>` outside of `<defs>` causes a silent fallback (no gradient rendered).
  - FIX: Always wrap gradients, patterns, symbols inside a single `<defs>` block.
2. ID Collisions
  - ISSUE: Multiple instances of the component on a page can duplicate IDs (`#sky`, `#tile-wall`).
  - FIX: Add a `const uid = Math.random().toString(36).slice(2)` prefix (or a passed `idPrefix` prop) and concatenate (e.g. `id={`${uid}-sky`}`).
3. Blurry Pixels
  - ISSUE: Downscaled SVG with sub‑pixel coordinates or missing crisp rendering.
  - FIX: Ensure all coordinates are multiples of 4 / 8, add `shape-rendering="crispEdges"` and CSS `image-rendering: pixelated;`.
4. Stroke Scaling Artifacts
  - ISSUE: Scaling via CSS width/height percentages can visually thin strokes.
  - FIX: Design at target aspect ratio (1200×600). Avoid non-uniform scaling or apply only max-width constraints.
5. Excessive DOM Weight
  - ISSUE: Naively tiling hundreds of 16×16 `<use>` nodes impacts HTML size.
  - FIX: Use selective decorative tiles (chips) and large base rectangles for flat fills when acceptable for ‘retro’ mode.
6. Unused Frontmatter Data
  - ISSUE: Declaring arrays in frontmatter but still hardcoding loops in template (linter flags unused variables).
  - FIX: Either map over the declared arrays or remove them. Keep all dynamic generation in frontmatter for clarity.
7. Colour Drift / Hardcoded Hex
  - ISSUE: Direct hex values break design token theming.
  - FIX: Always reference `var(--colour-*)` tokens. Add missing tokens first before use.
8. Accessibility Gaps
  - ISSUE: SVG lacks `<title>` / `<desc>` or interactive anchors missing `aria-label`.
  - FIX: Provide `<title>` & `<desc>`, and ensure each clickable region is an `<a>` with descriptive `aria-label`.
9. Improper Layer Order
  - ISSUE: Roof or battlements rendered below wall rectangles due to group order.
  - FIX: Render background (sky, ground) → large wall masses → structural accents (roofs, crenels) → details (windows, doors, labels) → FX (orb, smoke, shadows).
10. Animated FX Violating Reduced Motion
   - ISSUE: Infinite animations not disabled for `prefers-reduced-motion`.
   - FIX: Gate `@keyframes` usage with a media query override.
11. Missing Unique Shadows / Depth
   - ISSUE: Flat rectangles obscure silhouette.
   - FIX: Add 1‑tile highlight band (right edge) and shadow band (left edge) per style guide (opacity 0.10–0.25).
12. Overusing Filters
   - ISSUE: Filter effects (blur/glow) degrade retro sharpness & performance.
   - FIX: Use simple opacity pulses or layered flat shapes (no `filter`, `feGaussianBlur`).


## Error Handling

- Wrap asynchronous operations in `try/catch` blocks.
- Surface meaningful errors to the UI and log them for troubleshooting.

## Linting and Formatting

- Use **Biome** for linting and formatting. Run `npm run lint` or `biome check .` before committing.
- Use `npm run lint:fix` or `biome check --write .` to automatically fix issues.
- Use `npm run format` or `biome format --write .` for formatting.
