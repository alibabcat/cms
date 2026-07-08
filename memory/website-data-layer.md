---
name: website-data-layer
description: Where the website's Payload data layer lives and how live preview is wired
metadata:
  type: project
---

The website's single Payload data layer is **`apps/website/app/lib/payload.ts`** — this is the target of the `@/lib/*` tsconfig alias (`@/lib/*` → `./app/lib/*`, which wins over `@/*` → `./*`). A duplicate `apps/website/lib/payload.ts` used to exist and caused confusion; it was removed. Always edit `app/lib/payload.ts`.

It uses `@payloadcms/sdk` (`PayloadSDK<Config>`), imports generated types via the `@payload-types` alias (→ `../backend/src/payload-types`), and maps Payload docs to the front-end view types in `@/types`. Optional API-key auth via `PAYLOAD_API_KEY` (sent as `baseInit` header; only when set).

**Live Preview** (Payload → Next): config in `apps/backend/src/livePreview.ts` (wired into `admin.livePreview`), builds `${WEBSITE_URL}<route>?preview=true&locale=..`. Detail pages parse those via `app/lib/preview.ts` (`parsePreviewParams`), fetch with `draft` (uncached) reads, and mount `components/RefreshOnSave.tsx` (uses `@payloadcms/live-preview-react` RefreshRouteOnSave). `team-members` is keyed by `memberId`; all other collections by Mongo `id`. Backend has `cors`/`csrf` allowlisting `WEBSITE_URL`, and the public content collections set `access.read = () => true`.

Known pre-existing breakage unrelated to this work: `components/AuthPage.tsx` has syntax errors, `components/UserDashboard.tsx` references non-existent `@/types` members, `index.tsx` is a leftover Vite entry — these fail `next build` until fixed. See [[website-uses-payload-sdk]].
