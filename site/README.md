# Mohamed Amiin — aviation portfolio redesign

This is a **separate Next.js static-export prototype** inside the existing GitHub Pages repository. The original root `index.html`, `CNAME`, `preview.jpg` remain unchanged (the old public `cv.pdf` was removed; see below). No automatic deployment is configured.

## Local preview

```bash
cd site
npm install
npm run dev
```

Visit http://localhost:3000. Run `npm run build` to generate static files in `site/out`.

## Important before publication

- The CV is not stored in this public repository. "View full CV" links go to the password-protected portal at https://cv.mohamedamiin.com (a separate private Vercel project). The deploy workflow fails if a cv.pdf ever ends up in the build.
- Links to the current site's contact section are intentional placeholders; migrate actual contact details after review.
- English/Arabic toggle and light theme from the original site have **not yet been ported**.
- Project descriptions are prototype summaries; verify exact statuses before launch.
- The radar is **decorative only**, not an aviation instrument.
- To deploy on GitHub Pages, configure an Actions workflow to build from `site` and publish `site/out` after final approval; leave `main` unchanged meanwhile.
- Do not enable GitHub Pages to build this branch until the release process is approved.
