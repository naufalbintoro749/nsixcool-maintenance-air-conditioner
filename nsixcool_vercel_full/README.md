# NSixCool — Vercel-ready package (Option 1: Full Website + Admin + WA backend)

## What is included
- `public/index.html` — Elegant frontend website (booking form).
- `public/layanan.json` — Initial services list (editable).
- `public/login.html` — Admin login page.
- `public/admin.html` — Admin panel to edit services.
- `api/send-wa.js` — Vercel Serverless function that sends WhatsApp message via WhatsApp Cloud API.
- `api/login.js` — Admin login verification.
- `api/layanan.js` — Get / update layanan (update requires ADMIN_PASS header).

## Environment variables (set these in Vercel dashboard)
- `WA_TOKEN` — WhatsApp Cloud API token (Bearer).
- `WA_PHONE_ID` — Phone Number ID from WhatsApp Cloud API.
- `ADMIN_USER` — admin username (e.g. admin)
- `ADMIN_PASS` — admin password (used for login and update auth)
- `ADMIN_NUMBER` — (optional) destination WhatsApp number in international format (default 62851833317766)

## How to deploy to Vercel
1. Create a new Vercel project (link GitHub repo or upload this folder).
2. Add the environment variables above in Project → Settings → Environment Variables.
3. Deploy. Endpoints:
   - `POST /api/send-wa` : send booking to WhatsApp (expects JSON `{ nama, hp, alamat, layanan }`)
   - `POST /api/login` : login admin (expects `{ username, password }`)
   - `GET /api/layanan` : get services
   - `POST /api/layanan` : update services (requires header `x-admin-pass: ADMIN_PASS`)

## Notes & limitations
- `api/layanan` writes updates to `/tmp/layanan.json` — on Vercel this is ephemeral (changes survive for a short time while instance is warm). For persistent storage use a database or KV (e.g. Upstash, Vercel KV, or store to GitHub).
- This package aims for quick deployment and testing. For production, secure the admin flows with proper sessions, HTTPS (Vercel provides), and consider persistent storage.

## Need help?
Tell me if you want:
- Persistent storage (I can add Supabase or Vercel KV integration)
- More admin features (booking list, export CSV)
- Styling tweaks or logo additions
