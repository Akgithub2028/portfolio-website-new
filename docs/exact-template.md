# Exact supplied-template adaptation

The user rejected the prior custom design and requested the actual `Templates Portfolio/giats-portfolio` source as the baseline, replacing creator-specific information and images before further design changes.

## Preserved

The complete template `src` tree was copied into this application. The homepage section order remains Home, About, Clients/focus, Quote, Projects. The original renderers, shaders, floating meshes, physics, Lenis scroller, menu layout, perspective links, text effects, layouts, section geometry, fonts, and styles remain in use.

Source checks compare the fluid engine, background engine, floating-mesh engine, and unchanged SCSS files against the supplied reference. The authorized SCSS changes fit the footer wordmark, add the home monogram effect and quote attribution, introduce the Competitions and About toolkit sections, and update the menu’s social heading. The two-study research collection also clamps the original project animation's scroll interval to avoid a zero-length interval with fewer items.

No custom cinematic stylesheet, generated neural artwork, holographic profile UI, or interactive IDE from the previous implementation is imported by this application.

## Personalized

- Owner identity, email, location, timezone, CV, GitHub, LinkedIn, metadata, loading text, menu labels, footer, and wordmark.
- AI engineering / independent research biography, Chemical Engineering at IIT Kharagpur, and minor in AI.
- NexusAgent, Nova, and Real-Time Voice Translator project records, source links, evaluation scope, and limitations.
- The former sample-client badge section now represents language models, learning agents, and scientific discovery. It does not invent clients, employers, or affiliations.
- Badge textures and interactive pre-footer stickers are new native vector/raster textures containing the owner's research and engineering terms. Creator textures were not copied.
- Original portrait frames now contain the owner's clearly identified monogram; no portrait or personal images of the creator were copied.
- Research routes reuse the copied project collection and detail components. Contact uses the copied overview layout and button components.

Neutral runtime assets—fonts, shader noise/environment textures, and the generic badge geometry—are retained because they support the original template's appearance and function. Creator portraits, sample project screenshots/videos, personal badges, social accounts, and site metadata are excluded. MIT copyright attribution remains in the license as required.

## Runtime

The initial adaptation copied the template’s Next.js 14 dependencies. The user’s npm audit identified vulnerabilities in that runtime, so the security migration pins Next.js 16.4.3, Sharp 0.35.5, and react-use 17.6.1, with PostCSS 8.5.23 and js-cookie 3.0.7 overrides. React and React DOM stay at 18.2.0, preserving compatibility with the template’s existing React Three Fiber and transition stack. The upstream Next 16.4.3 manifest permits React 18.2. Webpack is explicitly selected for the original GLSL loaders. No visual styles, shaders, scenes, or page transition implementations are changed by this security migration.

Standard npm package lookups initially failed with EAI_AGAIN. The dependency repair subsequently completed successfully through npm audit fix after the patched versions were explicitly declared. The installed graph and regenerated lockfile agree, npm audit fix reports zero vulnerabilities, npm ls reports no invalid dependencies, and all eight checks pass. The initial session restricted localhost binding; the subsequent focused refinement run successfully completed Chromium checks using a separate temporary production server.

The security migration is already installed in this workspace. Run `npm run preview` and open `http://localhost:3100`. Fresh checkouts can use `npm ci`; the updated lockfile is reproducible. Keep the preview process running while reviewing.


## Security migration sources

- Next.js 16.4.3 dependencies and React 18 peer range: https://raw.githubusercontent.com/vercel/next.js/v16.4.3/packages/next/package.json
- Next.js 16 Webpack migration guidance: https://nextjs.org/docs/pages/guides/upgrading/version-16
- react-use 17.6.1 dependency update: https://raw.githubusercontent.com/streamich/react-use/v17.6.1/package.json
- Patched cookie version: https://github.com/advisories/GHSA-qjx8-664m-686j
- Sharp patch: https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w

Verified results: patched packages are installed, their registry integrity values are present in the regenerated lockfile, all eight tests pass, npm ls exits successfully, and the repair reports zero vulnerabilities. The production build passes. Its generated route manifest contains /research/sfp and /research/qlora; an inherited engineering/research route-filter mix-up was corrected and covered by a generated-output test. The empty custom PostCSS configuration was removed so Next uses its standard PostCSS configuration. Existing Sass and React 18 deprecation warnings remain nonblocking. Subsequent Chromium verification passed repeated desktop and mobile menu navigation, same-page menu closure, card pointer response, and reversible quote motion, with no uncaught browser errors.

## Requested interaction refinements

The original transition's fixed delays and ReactTransition timeouts have been replaced with a short GSAP cover/reveal controlled by route readiness. A click in the menu starts feedback immediately, without waiting for route loading. The menu constructs a fresh timeline after responsive changes and no longer kills/reuses its timeline on loading-state changes. Route errors, cancellation, and repeated clicks have lifecycle tests. Production prefetching begins when the menu opens. Development compilation time still depends on the local machine.

The supplied Voice Translator screenshot is the project thumbnail and first case-study image; the existing architecture diagram and source link remain. The live demo has its own button. The monogram card adds a subtle pointer tilt, reflection, and shadow. The assembled quote retraces its exact entry animation during the scroll exit, preserving word paths, depth, rotations, and stagger. Reversing the scroll reassembles it. These effects retain the original typography and section geometry and respect reduced-motion preferences.

Verification of the focused refinements: 15 automated checks pass, production build passes, and Chromium desktop/mobile acceptance checks pass. In the Chromium run, menu click handlers initiated loading feedback in 1.5–10.5 ms; full destination readiness still depends on the route and local runtime. Browser checks use port 3131 temporarily and stop it on completion. The user preview remains `http://localhost:3100` via `npm run preview`.

The text beside the home monogram describes the owner’s research and engineering approach. The animated quote is attributed to Demis Hassabis, with a linked 2026 Dædalus source.
