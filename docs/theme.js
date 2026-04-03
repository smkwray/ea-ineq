// Light/dark theme toggle
(function () {
  var KEY = 'ea-ineq-theme';
  var SUN = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function sys() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? SUN : MOON;
      btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0d1117' : '#fafaf8');
    // Dispatch event so charts can re-render
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: theme } }));
  }

  function toggle() {
    var cur = document.documentElement.getAttribute('data-theme') || sys();
    var next = cur === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  }

  // Apply immediately (before DOM)
  var initial = saved() || sys();
  apply(initial);

  // Re-apply after DOM ready to update button icon
  document.addEventListener('DOMContentLoaded', function () { apply(saved() || sys()); });

  // Follow system preference changes if no manual choice
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });

  window.toggleTheme = toggle;
})();
