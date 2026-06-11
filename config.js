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
  kbUrl: ""
};
