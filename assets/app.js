// ---------------------------------------------------------------------------
// xoplanet-explorer — live Supabase REST client + shared rendering helpers.
// Plain fetch against PostgREST; no build step, no dependencies.
// ---------------------------------------------------------------------------
const CFG = window.XO_CONFIG || {};
const CONFIGURED = CFG.url && CFG.anonKey && CFG.anonKey !== "REPLACE_WITH_SUPABASE_ANON_KEY";

async function xoFetch(path) {
  if (!CONFIGURED) throw new ConfigError();
  const res = await fetch(`${CFG.url}/rest/v1/${path}`, {
    headers: { apikey: CFG.anonKey, Authorization: `Bearer ${CFG.anonKey}` }
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status} ${res.statusText} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

class ConfigError extends Error {
  constructor() { super("not configured"); this.name = "ConfigError"; }
}

// ---- formatting helpers ---------------------------------------------------
function fmt(v) {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "number") {
    if (Number.isInteger(v)) return String(v);
    return (+v.toFixed(4)).toString();
  }
  return String(v);
}

function badge(cls) {
  if (!cls) return `<span class="badge none">—</span>`;
  const safe = String(cls).toLowerCase().replace(/[^a-z-]/g, "");
  return `<span class="badge ${safe}">${cls}</span>`;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}

// Render an entity's wiki_entity_page as a link (if wikiBaseUrl is set in
// config.js) or plain code text otherwise.
function wikiLink(path) {
  if (!path) return "";
  const base = CFG.wikiBaseUrl;
  if (!base) return `<code>${esc(path)}</code>`;
  const url = base.replace(/\/?$/, "/") + String(path).replace(/^\//, "");
  return `<a href="${esc(url)}" target="_blank" rel="noopener"><code>${esc(path)}</code></a>`;
}

// ---- chrome ---------------------------------------------------------------
function renderHeader(active) {
  const kb = CFG.kbUrl
    ? ` · <a href="${esc(CFG.kbUrl)}">${esc(CFG.kbLabel || "Knowledge Base")}</a>`
    : (CFG.kbLabel ? ` · <span class="sub">${esc(CFG.kbLabel)}</span>` : "");
  const link = (href, label) =>
    `<a href="${href}"${active === href ? ' style="text-decoration:underline"' : ""}>${label}</a>`;
  return `<header class="site">
    <h1><a href="index.html" style="color:inherit">xo&#42; Explorer</a></h1>
    <span class="sub">live confidence-scored exoplanet facts${kb}</span>
    <nav>${link("index.html", "Systems")} ${link("planets.html", "Planets")}</nav>
  </header>`;
}

function renderFooter() {
  return `<footer class="site">
    Data served live from the <code>xo_*</code> Supabase tables via the public-read REST API.
    Confidence classes follow <code>xo_confidence_class</code>: provisional &lt; 0.35 ·
    supported &lt; 0.65 · well-established &lt; 0.85 · canonical ≥ 0.85.
  </footer>`;
}

function configNotice(err) {
  if (err instanceof ConfigError) {
    return `<div class="notice">
      <strong>Not configured yet.</strong> Paste your Supabase <em>anon</em> key into
      <code>config.js</code> (currently a placeholder), commit, and reload.
    </div>`;
  }
  const empty = /(\b0\b|\[\])/.test(err.message);
  return `<div class="notice">
    <strong>Couldn't load data.</strong> ${esc(err.message)}<br>
    If the tables are empty, apply the schema (<code>xo_schema.sql</code>) and the Phase 2
    seed (<code>db/seeds/seed_5systems.sql</code>) in the Supabase SQL editor first.
  </div>`;
}

function mount(html) { document.getElementById("app").innerHTML = html; }
