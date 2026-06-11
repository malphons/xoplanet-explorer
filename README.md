# xoplanet-explorer

A tiny, dependency-free static site that browses the **confidence-scored `xo_*`
exoplanet fact store** live from Supabase. Built to be served from GitHub Pages
and to stay current automatically: when you seed or ingest new data into the
`xo_*` tables, the site reflects it on the next page load — no rebuild, no push.

Companion to the private **xProject Knowledge Base** (the `xo_schema.sql` schema
and the `db/seeds/` seeds live there).

## How it works

- `index.html` — the priority systems, each star with its planets.
- `planets.html` — sortable table of every seeded planet.
- `entity.html?type=planet&id=k2-18b` — per-entity facts with confidence badges.
- `assets/app.js` — plain `fetch` against the Supabase PostgREST API.
- `config.js` — project URL + anon key (see below).

There is **no build step**. The pages call the Supabase REST API directly using
the project's **anon / publishable** key, which only grants the public-read
access already permitted by the `xo_*` row-level-security policies. The secret
`service_role` key is never used here.

## Setup (one time)

1. **Populate Supabase** (in the KB repo's Supabase project): apply
   `raw/projects/xp_xoplanet-db/schema/xo_schema.sql`, then
   `db/seeds/seed_5systems.sql`, in the Supabase SQL editor.
2. **Add the anon key:** open `config.js` and replace
   `REPLACE_WITH_SUPABASE_ANON_KEY` with the project's anon key
   (Supabase dashboard → Project Settings → API → anon public). Commit.
   - The `url` is pre-filled for project `vthwfufbcntvrjijhckj`.
3. **Publish on GitHub Pages:**
   ```bash
   gh repo create xoplanet-explorer --public --source=. --remote=origin --push
   # then in the repo: Settings → Pages → Source: deploy from branch → main / (root)
   ```
   Or push manually to a public repo and enable Pages on `main` / root.

The site is then live at `https://<user>.github.io/xoplanet-explorer/`.

## Updating as the knowledge base grows

You don't touch this repo. Seed/ingest more systems into the `xo_*` tables
(e.g. add rows to `xo_facts`), and the explorer shows them automatically.
Only re-touch this repo to change the **UI**.

## Local preview

Open `index.html` in a browser. Until `config.js` has a real anon key (and the
tables are populated), the pages show a friendly "not configured" notice instead
of data.

## Security notes

- The anon key is meant to ship in client code; it is **public-read only**.
- Never put the `service_role` key in this repo.
- Writes to `xo_*` happen server-side from the KB tooling, never from this site.
