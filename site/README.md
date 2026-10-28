# Mohamed Amiin — aviation portfolio redesign

This is a **separate Next.js static-export prototype** inside the existing GitHub Pages repository. The original root `index.html`, `CNAME`, `preview.jpg` and `cv.pdf` remain unchanged. No automatic deployment is configured.

## Local preview

```bash
cd site
npm install
npm run dev
```

Visit http://localhost:3000. Run `npm run build` to generate static files in `site/out`.

## Important before publication

- `/cv.pdf` assumes the CV is placed in `site/public/cv.pdf` for production. The original root CV has not been copied or deleted. Copy the existing CV into `site/public` during the final integration.
- Links to the current site's contact section are intentional placeholders; migrate actual contact details after review.
- English/Arabic toggle and light theme from the original site have **not yet been ported**.
- Project descriptions are prototype summaries; verify exact statuses before launch.
- The radar is **decorative only**, not an aviation instrument.
- To deploy on GitHub Pages, configure an Actions workflow to build from `site` and publish `site/out` after final approval; leave `main` unchanged meanwhile.
- Do not enable GitHub Pages to build this branch until the release process is approved.
