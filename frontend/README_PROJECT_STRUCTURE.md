# 📦 package.json - The Manifesto

This file is the "passport" of your Javascript project. It tells Node.js (and other tools) who you are and what you need.

## Key Sections

### 1. `scripts`
These are shortcuts you run in the terminal.
- `"dev": "vite"` -> Runs `npm run dev` to start the local server.
- `"build": "vite build"` -> Runs `npm run build` to package your app for production (e.g., Vercel).

### 2. `dependencies` (The Essentials)
Code that is required for your app to RUN in the user's browser.
- **react**: The core library.
- **react-dom**: The glue between React and the DOM (HTML).

### 3. `devDependencies` (The Toolkit)
Tools required ONLY for development. These are NOT included in the final production bundle.
- **vite**: The build tool (makes development fast).
- **eslint**: Finds typos and code errors.
