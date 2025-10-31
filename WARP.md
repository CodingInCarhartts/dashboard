# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A SvelteKit dashboard application featuring a 5-tab interface with various widgets for news, development tools, finance, entertainment, and AI chat. Built with Svelte 5, TypeScript, Tailwind CSS, and Supabase for data persistence.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (accessible at 0.0.0.0)
- `npm run build` - Build for production (outputs to `.svelte-kit` directory)
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking with svelte-check
- `npm run check:watch` - Run type checking in watch mode

### Testing
There is no test framework configured. Before adding tests, check for any test-related dependencies or scripts in package.json.

## Environment Setup

Copy `src/lib/env.example.ts` to `src/lib/env.ts` and add API keys.

**Required:**
- `SUPABASE_URL`, `SUPABASE_API_KEY`, `SUPABASE_DATABASE_PASSWORD` - For chat history and data persistence

**Optional (for specific widgets):**
- `PERPLEXITY_API_KEY`, `GEMINI_API_KEY` - AI chat functionality
- `KICK_SECRET`, `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET` - Streaming widgets
- `YOUTUBE_API_KEY` - Video widget
- `REDDIT_ID`, `REDDIT_SECRET` - Reddit widgets
- `FINNHUB_API_KEY`, `ECONOMIC_API_KEY` - Finance widgets

## Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: None
- **Imports**: Explicit types first, use `$lib/` alias
- **Components**: 
  - PascalCase for component names
  - camelCase for variables/functions
  - kebab-case for file names
  - Use `$$Props` for component props
- **Styling**: 
  - Use `@apply` directives in styles
  - Use `cn()` utility for Tailwind class merging
- **Comments**: No comments in code (keep code self-documenting)

## Architecture

### Directory Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── features/          # Feature-specific widgets (weather, chat, markets, etc.)
│   │   │   ├── {feature}/     # Each feature has its own directory
│   │   │   │   ├── {Feature}Widget.svelte
│   │   │   │   ├── index.ts
│   │   │   │   └── ...        # Feature-specific components
│   │   ├── layout/            # Layout components
│   │   ├── TabbedDashboard.svelte  # Main dashboard orchestrator
│   │   └── DynamicWidget.svelte    # Widget loader
│   ├── services/              # External API service integrations
│   │   ├── {service}/         # Each service has its own directory
│   │   └── index.ts
│   ├── stores/                # Svelte stores for state management
│   │   ├── tabs.ts            # Tab state (persisted to localStorage)
│   │   ├── chat.ts            # Chat state (synced with Supabase)
│   │   └── refresh.ts         # Refresh triggers
│   ├── config/                # Configuration files for widgets and features
│   ├── types/                 # TypeScript type definitions
│   ├── cache.ts               # TTL-based caching with localStorage persistence
│   ├── supabase.ts            # Supabase client initialization
│   └── env.ts                 # Environment variables (git-ignored)
└── routes/
    ├── api/                   # SvelteKit API routes
    └── +page.svelte           # Main page
```

### Key Architectural Patterns

**Widget System:**
- Each widget is a standalone Svelte component in `src/lib/components/features/{feature}/`
- Widgets are configured in `src/lib/config/tabs.ts` with position, order, and enabled state
- `TabbedDashboard.svelte` orchestrates widget rendering based on active tab
- `DynamicWidget.svelte` dynamically loads widget components

**Tab Management:**
- Tab configurations defined in `src/lib/config/tabs.ts` with 5 tabs: home, development, finance, entertainment, ai-chat
- Tabs support `grid-3col` (left/middle/right columns) or `grid-2col` layouts
- Widgets can span multiple columns using `position.span` property
- Active tab state persisted to localStorage via `src/lib/stores/tabs.ts`

**Data Services:**
- Service layer in `src/lib/services/` handles all external API calls
- Each service exports functions for fetching data (e.g., `fetchYoutubeVideos`, `fetchKickChannels`)
- Services are consumed by widgets through the caching layer

**Caching System:**
- Client-side cache in `src/lib/cache.ts` with TTL-based expiration
- Features: LZ-string compression for large responses, LRU eviction, 4MB size limit
- Each data type has its own TTL configured in `src/lib/config/cache.ts`
- Cache keys follow pattern: `{service}_{identifier}` (e.g., `youtube_channelId`, `reddit_subreddit`)
- Convenience functions: `getCached{Service}{Data}()` handle cache logic automatically

**State Management:**
- Svelte stores for reactive state (tabs, chat, refresh triggers)
- Tab state and chat conversations persisted to localStorage
- Chat history also synced to Supabase for cross-device persistence
- Store subscriptions automatically save state on changes

**AI Chat Integration:**
- Multiple providers: Gemini, Perplexity (configured in `src/lib/services/chat/providers/`)
- Conversation history stored in Supabase with `conversations` and `messages` tables
- Message streaming support for real-time responses
- Copy-to-clipboard functionality for assistant responses

**Styling:**
- Tailwind CSS with custom configuration
- Theme switching (dark/light) via `ThemeFAB` component
- Global styles in `src/app.css`
- Component-specific styles in `src/lib/styles/components/`

### Adding New Widgets

1. Create widget directory: `src/lib/components/features/{feature}/`
2. Create widget component: `{Feature}Widget.svelte`
3. Create service (if needed): `src/lib/services/{feature}/`
4. Add types: `src/lib/types/{feature}.ts`
5. Add config: `src/lib/config/{feature}.ts`
6. Add caching function in `src/lib/cache.ts`
7. Register in `src/lib/config/tabs.ts` with position and tab assignment
8. Export from `src/lib/components/features/{feature}/index.ts`

### Working with the Cache

When adding new data fetching:
- Always use `cache.getOrFetch()` for automatic cache management
- Create a convenience function in `cache.ts` (e.g., `getCached{Service}{Data}`)
- Configure TTL in `src/lib/config/cache.ts`
- Use descriptive cache keys: `{service}_{identifier}`

### Deployment

- Uses `svelte-adapter-deno` for Deno-based hosting
- Build output in `.svelte-kit/` directory
- Configure environment variables in deployment platform
- Supabase credentials required for full functionality

## Important Notes

- Environment variables in `src/lib/env.ts` are git-ignored - never commit API keys
- The Vite proxy configuration (`/api/minimax`) is for development CORS workaround
- Widget components should handle loading and error states independently
- Cache invalidation is automatic via TTL - manual clear available via `clearAllCache()` or `clearCacheByType()`
