export const THEME_STORAGE_KEY = "synceri-theme";

/**
 * Runs before first paint so the correct theme is on <html> when the page
 * renders. Without this the dark shell flashes white on a light-mode reload.
 *
 * Kept deliberately tiny and dependency-free — it is inlined into <head>.
 */
const script = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=(s==="light"||s==="dark")?s:(m?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
