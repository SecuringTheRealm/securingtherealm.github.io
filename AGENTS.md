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

- For pixel art SVG components, always use `image-rendering: pixelated` and `image-rendering: crisp-edges`.
- Use `viewBox` for proper scaling and maintain aspect ratios.
- Align all pixel art elements to an 8-pixel or 4-pixel grid for authentic retro aesthetics.
- Use CSS variables for theming (e.g., `var(--colour-teal-bg)`, `var(--colour-stone)`).
- Implement animations using CSS keyframes with `steps()` timing for frame-by-frame effects.
- Always include proper ARIA labels and accessibility attributes.

## Error Handling

- Wrap asynchronous operations in `try/catch` blocks.
- Surface meaningful errors to the UI and log them for troubleshooting.

## Linting and Formatting

- Use **Biome** for linting and formatting. Run `npm run lint` or `biome check .` before committing.
- Use `npm run lint:fix` or `biome check --write .` to automatically fix issues.
- Use `npm run format` or `biome format --write .` for formatting.
