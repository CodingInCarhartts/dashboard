# Agent Guidelines for Dashboard Project

## Commands
- **Build**: `vite build` / `npm run build`
- **Dev**: `vite dev --host 0.0.0.0` / `npm run dev --host 0.0.0.0`
- **Type Check**: `svelte-kit sync && svelte-check --tsconfig ./tsconfig.json` / `npm run check`
- **Preview**: `vite preview` / `npm run preview`
- **No linting or testing commands configured**

## Code Style
- **Language**: TypeScript strict mode, SvelteKit + Svelte 5, Deno adapter
- **Imports**: `$lib/` alias, explicit types first, then other imports, `$$Props` for components
- **Formatting**: 2 spaces, single quotes, no semicolons, no comments, `@apply` in styles
- **Styling**: Tailwind CSS + `cn()` utility, bits-ui + shadcn-svelte components
- **Naming**: camelCase vars/functions, PascalCase components, kebab-case files
- **Error Handling**: try/catch with `throw new Error()`, async/await + onMount
- **State**: Svelte stores, cache with TTL, const assertions (`as const`) for configs
- **No Cursor/Copilot rules found**