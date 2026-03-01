# Tell Me Handoff Notes

Use this file as the single source of truth for migration + deployment actions.

## Quick Commands

- Show all handoff steps:
  - `npm run handoff-notes`
- Run deep deploy readiness audit:
  - `npm run vercel-readiness`
- Do-it shortcut (runs readiness audit):
  - `npm run do-it`

## Reality Check (Important)

This repository is a **Wix Velo runtime codebase**, not a native Next/Vite app.

That means:
- It works when published through Wix.
- It is **not directly runnable on Vercel** as-is because it relies on Wix APIs (`wix-*`, `$w`).

## What Already Exists For Migration

- Shared timeline data:
  - `src/public/journeyTimelineData.js`
- Portable timeline renderer (non-Wix DOM):
  - `src/public/journeyTimelinePortable.js`

These are ready to copy into your future Vercel frontend.

## If You Publish Now Through Wix

Timeline renders if Home page has these IDs:
- `journeySection`, `journeyTitle`, `journeyLine`
- `milestone1` ... `milestone8`
- `milestone1Year`/`Title`/`Desc` ... `milestone8Year`/`Title`/`Desc`

If IDs are missing, console warns with exact missing marker numbers.

## Migration Path To Vercel (When You’re Ready)

1. Create/open your Vercel repo (Next.js recommended).
2. Copy these files into that repo:
   - `journeyTimelineData.js`
   - `journeyTimelinePortable.js`
3. Render in your page/component:

```js
import { renderJourneyTimeline } from './journeyTimelinePortable.js';

renderJourneyTimeline(document.getElementById('journey-root'));
```

4. Replace Wix-only routing/animation APIs in migrated sections.
5. Add build/start scripts in Vercel repo (`next build`, `next start` or framework equivalent).
6. Push and create Vercel preview deployment.

## If You Want Me To "Do It"

Say: **"do it"** and provide/open the actual Vercel frontend repo in this workspace.
I will then:
- scaffold/verify framework config,
- wire the timeline into your real route,
- run build checks,
- leave a final deploy checklist.
