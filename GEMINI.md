# Project: Glance Dashboard

## Project Overview

Glance Dashboard is a lightweight, highly customizable dashboard application built with SvelteKit. It is designed to display various information such as RSS feeds, weather, market data, YouTube videos, calendar events, and Hacker News stories in a streamlined and modern interface. The project emphasizes a modern design with a dark theme, responsiveness, and fast performance.

## Technologies Used

*   **Framework**: SvelteKit
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Components**: shadcn/svelte
*   **Build Tool**: Vite

## Building and Running

### Prerequisites

*   Node.js 18+ and npm
*   Git

### Quick Start

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd dashboard
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start development server**

    ```bash
    npm run dev
    ```

    Visit `http://localhost:5173` in your browser.

### Production Build

1.  **Build the project**

    ```bash
    npm run build
    ```

2.  **Preview the production build**

    ```bash
    npm run preview
    ```

### Type Checking and Linting

*   **Run type checks and linting**

    ```bash
    npm run check
    ```

*   **Run type checks and linting in watch mode**

    ```bash
    npm run check:watch
    ```

## Development Conventions

*   **Language**: TypeScript for type safety.
*   **Styling**: Tailwind CSS for utility-first styling, with CSS variables for theming.
*   **Component-Based**: Modular and reusable Svelte components.
*   **Configuration**: Centralized configuration in `src/lib/config/` for widgets and settings.
*   **Theming**: Dark theme by default, with easy customization via CSS variables in `src/app.css`.
*   **Responsive Design**: Optimized for various screen sizes using a mobile-first approach.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components, including UI and widgets
│   ├── config/         # Configuration files for various widgets and settings
│   ├── services/       # Data fetching and business logic for widgets
│   ├── stores/         # Svelte stores for state management
│   ├── styles/         # Global styles, typography, and component-specific styles
│   ├── types/          # TypeScript type definitions and interfaces
│   └── utils/          # Utility functions
├── routes/             # SvelteKit routing, including main layout and pages
├── app.css             # Global styles and theme definitions
├── app.d.ts            # Global TypeScript declarations
└── app.html            # Main HTML template
```

## API Usage

The dashboard integrates with various APIs:

*   **RSS Feeds**: Direct XML parsing.
*   **Weather**: Open-Meteo (no API key required).
*   **Hacker News**: Official API.
*   **Markets**: Currently uses mock data; can be integrated with real APIs like Alpha Vantage.
*   **YouTube**: RSS feeds (no API key required).

## Contributing

Contributions are welcome. Key guidelines include:

*   Following TypeScript best practices.
*   Using CSS variables for theming.
*   Keeping components modular and reusable.
*   Testing on multiple screen sizes.

## License

This project is open source and available under the MIT License.
