// ---------------------------------------------------------------------------
// xoplanet-explorer — runtime config (committed; served to the browser).
//
// The anon/publishable key is DESIGNED to ship in client code — it only grants
// the public-read access already permitted by the xo_* row-level-security
// policies. NEVER put the service_role (secret) key here.
//
// Fill in anonKey below, commit, and the live site will read your xo_* tables.
// ---------------------------------------------------------------------------
window.XO_CONFIG = {
  // Supabase project ref vthwfufbcntvrjijhckj -> REST base below.
  url: "https://vthwfufbcntvrjijhckj.supabase.co",

  // Paste the project's anon / publishable key (Supabase dashboard ->
  // Project Settings -> API -> Project API keys -> anon public).
  anonKey: "sb_publishable_OrTzc3xGb8kIw3mHBHf-Ng_KhpUcPe_",

  // Link back to the knowledge base (optional; shown in the header).
  kbLabel: "xProject Knowledge Base",
  kbUrl: "",

  // Base URL prepended to each entity's `wiki_entity_page` (e.g.
  // "wiki/entities/k2-18b.md") to make the "Wiki page" reference clickable.
  // Points at the GitHub blob view of the (private) KB repo PhD_Exoplanets;
  // the wiki paths are relative to the exoplanets bucket, hence the
  // ".../exoplanets/" suffix. Set to "" to render the path as plain text.
  // NOTE: if PhD_Exoplanets stays private, these links 404 for visitors
  // without repo access (they work for you when logged in to GitHub).
  wikiBaseUrl: "https://github.com/malphons/PhD_Exoplanets/blob/main/exoplanets/"
};
