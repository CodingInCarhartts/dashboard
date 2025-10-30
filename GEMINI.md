# Project: Dashboard

## Project Overview
This project is a dashboard application built with SvelteKit, TypeScript, and Tailwind CSS. It integrates various widgets to display information from different services such as chat, Dev.to, economic indicators, GitHub, Hacker News, Kick, markets, Reddit, RSS feeds, videos, weather, and YouTube. The architecture suggests a modular approach where each service has its own API and service files, and corresponding Svelte components for display.

## Building and Running
The project uses `npm` (or `pnpm` as indicated by `pnpm-lock.yaml` if it existed, but `package-lock.json` suggests `npm` or `yarn` is used) for package management and `Vite` for development and building. `Vitest` is used for testing.

-   **Install Dependencies:**
    ```bash
    npm install
    ```
-   **Development Server:**
    ```bash
    npm run dev
    ```
    (Starts a development server with hot-reloading)
-   **Build for Production:**
    ```bash
    npm run build
    ```
    (Builds the application for production deployment)
-   **Preview Production Build:**
    ```bash
    npm run preview
    ```
    (Locally previews the production build)
-   **Run Tests:**
    ```bash
    npm test
    ```
    (Executes unit and integration tests using Vitest)
-   **Lint and Format:**
    ```bash
    npm run lint
    npm run format
    ```
    (Checks code for linting errors and formats it using ESLint and Prettier)

## Development Conventions
-   **Language:** TypeScript is used throughout the project for type safety.
-   **Styling:** Tailwind CSS is used for utility-first styling.
-   **Linting & Formatting:** ESLint and Prettier are configured to maintain code quality and consistency.
-   **Testing:** Vitest is the chosen test runner for unit and integration tests.
-   **Framework:** SvelteKit is the primary framework for building the web application.
