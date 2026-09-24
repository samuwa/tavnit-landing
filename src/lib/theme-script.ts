/**
 * Server-safe half of the theme module: the storage key and the inline
 * <script> the root layout runs before paint. Kept apart from theme.ts, which
 * is a client module (it exports a hook) and cannot be imported by a layout.
 */

export const THEME_KEY = "tavnit-theme";

/** Runs before paint: saved choice → OS setting → dark. No flash of the wrong theme. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;
