// Title / meta description overrides, one entry per page path, written by the DDS SEO pod
// (dds-agents `python -m seopod.titles pr`: one PR, seo/titles.json only, merged with
// `approve` in Slack). {} = nothing overridden. Pure: the table is passed in by the caller.
export function normalizePath(path) {
  if (!path) return '/';
  const p = String(path).split(/[?#]/)[0];
  return p === '/' ? p : p.replace(/\/+$/, '') || '/';
}

/** {title, description} for this path from the table, or null. */
export function titleOverride(path, table) {
  const entry = table?.[normalizePath(path)];
  if (!entry || typeof entry.title !== 'string' || typeof entry.description !== 'string') return null;
  return entry;
}
