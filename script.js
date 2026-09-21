document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  if (themeToggle && root.classList.contains('dark-theme')) {
    themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        root.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }
});