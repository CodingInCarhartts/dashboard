# Dashboard

A modern, tabbed dashboard application built with SvelteKit and TypeScript, featuring various widgets for news, weather, development tools, finance, and entertainment.

## Features

- **Tabbed Interface**: Organized into Home, Development, Finance, and Entertainment tabs
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Themes**: Automatic theme switching support
- **Caching**: Built-in caching with TTL for performance
- **Widgets Include**:
  - Reddit posts
  - Weather information
  - Hacker News stories
  - GitHub repositories
  - Dev.to articles
  - Market indices and stocks
  - Economic indicators
  - Kick streaming
  - YouTube videos
  - RSS feeds
  - Calendar events
  - AI Chat (Gemini/Perplexity)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp src/lib/env.example.ts src/lib/env.ts
   ```
   Edit `src/lib/env.ts` and add your API keys:
   - `KICK_SECRET`: Your Kick API secret
   - `PERPLEXITY_API_KEY`: Perplexity API key for chat
   - `GEMINI_API_KEY`: Google Gemini API key for chat

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking with svelte-check

### Tech Stack

- **Framework**: SvelteKit + Svelte 5
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom utilities
- **UI Components**: bits-ui + shadcn-svelte
- **Adapter**: Deno adapter for deployment
- **State Management**: Svelte stores
- **Caching**: Custom TTL-based cache system

### Code Style

- 2 spaces indentation, single quotes, no semicolons
- `$lib/` import alias
- Explicit types first in imports
- `$$Props` for component props
- `@apply` directives in styles
- `cn()` utility for Tailwind classes
- No comments in code
- PascalCase for components, camelCase for variables/functions
- kebab-case for files

## Deployment

The application uses the Deno adapter for deployment. Build and deploy as needed for your platform.

## Contributing

1. Follow the established code style
2. Run type checking before committing: `npm run check`
3. Test your changes thoroughly

## License

[Add your license here]