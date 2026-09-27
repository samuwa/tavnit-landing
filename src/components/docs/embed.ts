/**
 * Embed mode: the app (app.tavnit.io/docs) shows these same docs in an
 * iframe, so there is one documentation for the site and the product.
 *
 * Runs before paint from both docs layouts. When the page is framed (or
 * opened with ?embed=1) it marks <html data-docs-embed>, which hides the
 * site header (globals.css), and applies ?theme=light|dark from the app for
 * this page view only (the visitor's own saved theme is not touched).
 * Links that leave the docs are handled in DocsShell.
 */
export const DOCS_EMBED_SCRIPT = `(function(){try{var q=new URLSearchParams(location.search);var framed=false;try{framed=window.self!==window.top}catch(e){framed=true}if(framed||q.get("embed")==="1"){var d=document.documentElement;d.setAttribute("data-docs-embed","");var t=q.get("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}}catch(e){}})()`;
