# Vercel Timeline Handoff Note

## Current Status (This Repo)

- Timeline content is fully code-based in `src/public/journeyTimelineData.js`.
- Wix Home page consumes that data in `src/pages/Home.c18j5.js`.
- If milestone IDs are missing in Wix, console now warns exactly which markers are missing.

## If You Deploy This Repo As-Is (Wix Velo)

Timeline will render through existing Wix page logic **only if** these IDs exist on Home page:

- `journeySection`
- `journeyTitle`
- `journeyLine`
- `milestone1` ... `milestone8`
- `milestone1Year` ... `milestone8Year`
- `milestone1Title` ... `milestone8Title`
- `milestone1Desc` ... `milestone8Desc`

## For Later Vercel Migration (Non-Wix Rendering)

Use the portable renderer in:

- `src/public/journeyTimelinePortable.js`

It now uses a **relative import** so it can be copied directly into a Vercel app.

### Minimal usage

```js
import { renderJourneyTimeline } from './journeyTimelinePortable.js';

const root = document.getElementById('journey-root');
renderJourneyTimeline(root);
```

### Custom data usage

```js
import { renderJourneyTimeline } from './journeyTimelinePortable.js';
import { JOURNEY_MILESTONES } from './journeyTimelineData.js';

renderJourneyTimeline(document.getElementById('journey-root'), JOURNEY_MILESTONES);
```

## Pre-Deploy Check List

1. Open Home page preview.
2. Scroll to The Journey section.
3. Confirm all 8 milestones are visible.
4. Check browser console for any "missing Wix marker IDs" warning.
5. Publish.

## Optional Local Validation

If lint is not available yet:

```bash
npm install
npm run lint
```
