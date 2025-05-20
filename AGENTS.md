# AGENTS Guidelines

This repository uses **TypeScript** and **Next.js**. Use the practices below when contributing.

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

## React Guidelines

- Use functional components with hooks.
- Adhere to the React hook rules (do not call hooks conditionally).
- Use the `React.FC` type for components that accept `children`.
- Keep components small and focused and place styling in CSS modules.
- Develop reusable components whenever possible.
- Implement error boundaries where needed.

## Error Handling

- Wrap asynchronous operations in `try/catch` blocks.
- Surface meaningful errors to the UI and log them for troubleshooting.

## Linting and Formatting

- Use **Biome** for linting and formatting. Run `biome check .` and `biome format .` before committing.
- You can also run `npm run lint` to execute the Next.js lint configuration.

