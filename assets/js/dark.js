document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('darkToggle');
  if (!toggle) return;

  var theme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.setAttribute('aria-label', 'Alternar modo claro');
  }

  toggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggle.setAttribute('aria-label', isDark ? 'Alternar modo escuro' : 'Alternar modo claro');
  });
});