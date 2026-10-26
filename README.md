# Aayaann Kausar — AI Engineering & Research

A portfolio of independent AI engineering, research, and competition work. Built with Next.js, React, React Three Fiber, GSAP, and Lenis, using the supplied portfolio template’s visual foundation.

## Run locally

Use **Node.js 24.x**, matching `.nvmrc` and the Vercel runtime declared in `package.json`.

```bash
nvm install
nvm use
npm ci
npm run preview
```

Open **http://localhost:3100**. `npm run dev` uses port 3000.

## Production checks

```bash
npm test
npm run build
npm start
```

The build uses Webpack for the template’s GLSL shaders. All fonts, scene textures, models, and portfolio documents are stored locally in `public/`.

Optional Chromium checks can run with `node tests/browser.mjs` after a production build. Set `BROWSER_EXECUTABLE` to your Chromium path if it differs from the runner’s default. These checks start and stop a separate local server on port 3131.

## Pages and content

- `/`: engineering introduction, research directions, animated quote, and selected work.
- `/about`: background, experience, areas of practice, technical toolkit, and process.
- `/projects`: NexusAgent, Nova, and the Real-Time Voice Translator.
- `/research`: research interests, SFP, and the QLoRA study.
- `/competitions`: Wunder Fund’s 2025 challenge, including the CV-recorded global rank and technical approach.
- `/contact`: email and CV links.

The CV opens from `/cv/CV_Aayaann_Kausar.pdf` in a new tab, with inline PDF headers. The previous `/cv/Aayaann-Kausar-CV.pdf` URL redirects to it. To update the CV, replace `public/cv/CV_Aayaann_Kausar.pdf`. Keep the duplicate CV exclusion in `.vercelignore` anchored to the project root (`/CV_Aayaann_Kausar.pdf`) so the public document is deployed. **Read Paper** on `/research/sfp` opens `/papers/sfp.pdf` in a new tab, with inline PDF headers. To update the paper, replace `public/papers/sfp.pdf`. GitHub code and experiment links remain separate.

Run `node tests/browser.mjs --cv-only` after a production build to check CV responses and new-tab behavior from Contact, Competitions, the footer, and the menu at desktop and mobile widths. Set `TEST_BASE_URL` to check a deployed site.

Main content lives in `src/constants/projects.js`, `competitions.js`, `expertise.js`, and `quote.js`. The paper, CV, media, and required third-party notices are tracked in `public/`.

## Push to GitHub manually

Create an **empty** repository named `portfolio-website-new` under `Akgithub2028`, without adding a GitHub-generated README, license, or `.gitignore`. Run these commands from **this directory**, where `package.json` is located:

```bash
git init -b main
git add .
git status --short
git commit -m "Publish AI engineering and research portfolio"
git remote add origin https://github.com/Akgithub2028/portfolio-website-new.git
git push -u origin main
```

If this directory already has an `origin` remote, use `git remote set-url origin https://github.com/Akgithub2028/portfolio-website-new.git` instead of `git remote add origin`.

`.gitignore` excludes installed dependencies, build output, local environment files, the previous redesign backup, and duplicate downloaded PDFs at the project root. The canonical public CV and paper are included. The sibling template directory is not needed to build or deploy this repository.

## Import into Vercel manually

Import `Akgithub2028/portfolio-website-new` from the Vercel dashboard.

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Root Directory | `./` — this repository’s root |
| Node.js | `24.x` — declared in `package.json` |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | Next.js default; leave the override off |
| Required environment variables | None |

`vercel.json` declares the framework and build/install commands. Build-time dependencies are explicitly installed for Sass and GLSL processing. Routing and response headers live in `next.config.js`; there is no separate trailing-slash override. This preserves the Next.js routes and serves the SFP paper as an inline PDF.

`NEXT_PUBLIC_SITE_URL` is optional and only adds canonical metadata for a final domain. Copy `.env.example` to `.env.local` for local use, or set the variable in Vercel after choosing your domain. The site builds and runs without it.

The portfolio has no backend credentials to configure. The Voice Translator demonstration remains a separate linked application.

References: [Vercel Next.js support](https://vercel.com/docs/frameworks/full-stack/nextjs), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [build settings](https://vercel.com/docs/builds/configure-a-build).

## Attribution

The supplied template’s MIT notice is retained in `public/licenses/giats-portfolio.txt`. Font licenses are included in `public/fonts/`. Owner-specific text, project assets, and the monogram replace the original creator’s personal material.

Adaptation and content sources are documented in `docs/exact-template.md` and `docs/copy-review.md`. `.previous-redesign/` is a local backup excluded from Git and deployment.
# portfolio-website-new
