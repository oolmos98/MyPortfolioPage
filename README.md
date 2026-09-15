# Omar Olmos Portfolio

An Astro portfolio and engineering wiki with React islands for interactive
content.

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

The site is available at `http://localhost:4321`.

## Checks

```bash
npm run format:check
npm run test
npm run build
```

`npm run test` runs `astro check`. The production output is generated in
`dist/`.

## Deployment

The workflow in `.github/workflows/deploy.yml` deploys automatically to GitHub
Pages after pushes to `main`. It can also be started manually from the GitHub
Actions tab with **Deploy Astro site -> Run workflow**.

In the repository settings, configure GitHub Pages as:

- Source: **GitHub Actions**
- Custom domain: `www.omarolmos.com`

The custom domain is preserved by `public/CNAME` during the Astro build.

## Content

- Portfolio homepage: `src/pages/index.astro`
- Engineering wiki: `src/pages/wiki/`
- Shared wiki layout: `src/layouts/WikiLayout.astro`
- Global styles: `src/styles/global.css`
