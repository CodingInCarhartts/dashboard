# Agent Guidelines for Dashboard Project

## Commands
- **Build**: `npm run build`
- **Dev**: `npm run dev --host 0.0.0.0`
- **Type Check**: `npm run check` / `npm run check:watch`
- **Preview**: `npm run preview`
- **No linting or testing commands configured**

## Code Style
- **Language**: TypeScript strict mode, SvelteKit + Svelte 5
- **Imports**: `$lib/` alias, explicit types, `$$Props` for components
- **Formatting**: 2 spaces, single quotes, no semicolons, no comments
- **Styling**: Tailwind CSS + `cn()` utility, shadcn-svelte UI components
- **Naming**: camelCase vars/functions, PascalCase components
- **Error Handling**: try/catch + console.error, async/await + onMount
- **Config**: const assertions (`as const`) for immutable configs
- **No Cursor/Copilot rules found**