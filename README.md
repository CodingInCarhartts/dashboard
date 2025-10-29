# Glance Dashboard

A lightweight, highly customizable dashboard built with SvelteKit, inspired by [Glance](https://github.com/glanceapp/glance). Displays feeds, weather, markets, and more in a beautiful, streamlined interface optimized for modern web development.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Glance+Dashboard+Preview)

## Features

### 📰 Various Widgets
* **RSS Feeds** - Display articles from multiple RSS sources
* **Weather** - Current weather with location-based forecasts
* **Markets** - Real-time stock prices and market data
* **YouTube Videos** - Latest videos from subscribed channels
* **Calendar** - Current month calendar view
* **Hacker News** - Top stories from Hacker News
* **Extensible** - Easy to add new widget types

### 🎨 Modern Design
* **Dark Theme** - Beautiful dark mode by default
* **Responsive** - Optimized for desktop and mobile devices
* **shadcn/ui** - Modern UI components with Tailwind CSS
* **Smooth Animations** - Hover effects and transitions

### ⚡ Fast & Lightweight
* **SvelteKit** - Server-side rendering and client hydration
* **TypeScript** - Full type safety
* **Optimized** - Minimal bundle size with tree shaking
* **Fast Loading** - Efficient data fetching and caching

### 🔧 Highly Customizable
* **Component-Based** - Easy to modify and extend
* **Configuration** - Centralized config for feeds and settings
* **Themes** - CSS variables for easy theming
* **Mobile-First** - Responsive grid layouts

## Installation

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure feeds** (optional)
   Edit `src/lib/config.ts` to customize RSS feeds, YouTube channels, weather location, etc.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

Or deploy to platforms like Vercel, Netlify, or any Node.js hosting.

## Configuration

The dashboard is configured through `src/lib/config.ts`. This file contains all settings for feeds, locations, and widget data.

### RSS Feeds
```typescript
export const RSS_CONFIG = {
  feeds: [
    { url: 'https://example.com/feed.xml', title: 'Example Feed' },
    // Add more feeds...
  ]
};
```

### Weather
```typescript
export const WEATHER_CONFIG = {
  location: 'Your City, Country',
  latitude: 0.0000,
  longitude: 0.0000,
  units: 'imperial' // or 'metric'
};
```

### YouTube Channels
```typescript
export const VIDEOS_CONFIG = {
  channels: [
    { id: 'UCxxxxx', name: 'Channel Name' },
    // Add more channels...
  ],
  limit: 3
};
```

### Markets
```typescript
export const MARKETS_CONFIG = {
  markets: [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    // Add more stocks...
  ]
};
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── widgets/      # Dashboard widgets
│   │       ├── RssWidget.svelte
│   │       ├── WeatherWidget.svelte
│   │       └── ...
│   ├── config.ts         # Configuration file
│   └── utils.ts          # Utility functions
├── routes/
│   ├── +layout.svelte    # Main layout
│   └── +page.svelte      # Dashboard page
├── app.css               # Global styles and theme
└── app.html              # HTML template
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking and linting

### Adding New Widgets

1. Create a new component in `src/lib/components/widgets/`
2. Add configuration in `src/lib/config.ts`
3. Import and use in `src/routes/+page.svelte`
4. Style with CSS variables for theme compatibility

### Theming

The dashboard uses CSS variables for theming. Modify colors in `src/app.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  /* ... */
}
```

## Technologies Used

- **Framework**: [SvelteKit](https://svelte.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/svelte](https://www.shadcn-svelte.com/)
- **Icons**: [Lucide](https://lucide.dev/) (if used)
- **Build Tool**: [Vite](https://vitejs.dev/)

## API Usage

The dashboard fetches data from various APIs:

- **RSS Feeds**: Direct XML parsing
- **Weather**: [Open-Meteo](https://open-meteo.com/) (free, no API key)
- **Markets**: Mock data (replace with real API like Alpha Vantage)
- **YouTube**: RSS feeds (no API key required)
- **Hacker News**: [Official API](https://github.com/HackerNews/API)
- **Calendar**: Client-side date calculations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Guidelines
- Follow TypeScript best practices
- Use CSS variables for theming
- Keep components modular and reusable
- Test on multiple screen sizes

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [Glance](https://github.com/glanceapp/glance)
- UI components from [shadcn](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## Roadmap / Future Enhancements

The dashboard is functional but has room for improvement. Planned features include:

### 🚀 High Priority
- **Data Caching**: Implement client-side caching to reduce API calls and improve performance
- **Error Handling**: Add error boundaries and retry mechanisms for failed API requests
- **Loading States**: Better loading indicators and skeleton screens

### 🎯 Medium Priority
- **Additional Widgets**:
  - Reddit posts widget
  - Twitch streams widget
  - GitHub releases widget
  - Docker containers status
  - Server stats widget
- **Multi-page Support**: Add routing for multiple dashboard pages/tabs
- **Widget Customization UI**: In-app interface to modify feeds and settings

### 🔧 Low Priority
- **Advanced Theming**: Light/dark mode toggle with more theme options
- **PWA Features**: Service worker for offline functionality
- **Keyboard Navigation**: Full keyboard accessibility
- **Export/Import Config**: Save and load dashboard configurations
- **Real Market Data**: Integrate with financial APIs for live stock prices

### 📱 Mobile Enhancements
- **Touch Gestures**: Swipe between pages on mobile
- **Responsive Widgets**: Better mobile layouts for complex widgets
- **Offline Mode**: Cache data for offline viewing

### 🔌 Integrations
- **Authentication**: User accounts and personalized dashboards
- **Backend API**: Server-side data processing and caching
- **Database Storage**: Persistent widget configurations
- **Real-time Updates**: WebSocket connections for live data

Contributions for any of these features are welcome! See the [Contributing](#contributing) section for guidelines.

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or issues
- 💡 Suggesting new features
- 🤝 Contributing code

---

Built with ❤️ using SvelteKit and modern web technologies.