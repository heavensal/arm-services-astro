# Astro Project

A modern static website built with Astro, deployed automatically to GitHub Pages using GitHub Actions.

## 🚀 Project Structure

A typical Astro project follows this structure:

```text
/
├── public/              # Static assets (images, favicon, etc.)
├── src/
│   ├── assets/         # Imported assets (images, fonts)
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Layout components for pages
│   ├── pages/          # Page components (auto-routed)
│   └── styles/         # Global CSS
├── .github/
│   └── workflows/      # GitHub Actions workflows
├── astro.config.mjs    # Astro configuration
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

**Key folders:**

- `src/pages/` - Files here automatically become routes
- `src/components/` - Reusable UI components
- `src/layouts/` - Templates for pages
- `public/` - Static files served as-is

## 🧞 Commands

All commands are run from the root of the project:

| Command            | Action                                             |
| :----------------- | :------------------------------------------------- |
| `pnpm install`     | Installs dependencies from `package.json`          |
| `pnpm dev`         | Starts local dev server (usually `localhost:3000`) |
| `pnpm build`       | Builds the project to `./dist/` for production     |
| `pnpm preview`     | Preview the production build locally               |
| `pnpm astro`       | Access Astro CLI for additional commands           |

## 📚 How Astro Works

- **File-based routing**: Pages in `src/pages/` automatically become routes
- **Static-first**: Astro renders components to HTML at build time
- **Island Architecture**: Interactive components are shipped as isolated islands of interactivity
- **Integrations**: Easily add frameworks like React, Vue, Svelte in specific components
- **No JavaScript by default**: Send 0 KB of JavaScript unless explicitly needed

## � MCP Integration

This project uses Model Context Protocol (MCP) for development assistance. The MCP configuration is stored in `.vscode/mcp.json`:

```json
{
  "servers": {
    "Astro docs": {
      "url": "https://mcp.docs.astro.build/mcp",
      "type": "http"
    }
  }
}
```

This allows AI coding assistants to access official Astro documentation directly. You can add more MCP servers to this configuration as needed.

## 🚀 Automatic Deployment to GitHub Pages

This project is configured for automatic deployment using GitHub Actions. Every push to `main` triggers a build and deployment.

### Prerequisites

- Node.js 22+ and pnpm installed locally
- A GitHub repository (public or with GitHub Pages enabled for private repos)

### Setup Steps

1. **Configure `astro.config.mjs`:**

   ```js
   export default defineConfig({
     site: 'https://your-username.github.io',
     base: '/repository-name',  // if deploying to a subdirectory
     output: 'static',
   });
   ```

2. **Configure GitHub Pages in repository settings:**
   - Go to `Settings` → `Pages`
   - Select `GitHub Actions` as the build source

3. **The workflow is already set up** in `.github/workflows/deploy.yml`

### Deployment Flow

**On every push to `main`:**

1. GitHub Actions runs the workflow
2. Dependencies are installed with pnpm
3. Project is built to `./dist/`
4. Built files are deployed to GitHub Pages
5. Site is live at your configured URL

**Pull Requests:**

- The workflow also runs for PR branches
- Verifies the build succeeds
- Doesn't deploy (only validates)

### Monitoring Deployments

1. Go to your repository on GitHub
2. Click the `Actions` tab
3. Watch the workflow run
4. Green checkmark = successful deployment

### Common Issues

- **Build fails:** Check the Actions log output for errors
- **Site not updating:** Clear browser cache or wait a few minutes
- **Incorrect URLs:** Verify `site` and `base` in `astro.config.mjs`

---

## 📖 Learn More

- [Astro Documentation](https://docs.astro.build)
- [GitHub Pages Deployment](https://docs.astro.build/en/guides/deploy/github/)
- [Astro Components](https://docs.astro.build/en/basics/astro-components/)
