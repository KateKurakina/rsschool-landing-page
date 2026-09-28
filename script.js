// theme switch
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

//scroll controller
const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
  },
  enabledScroll() {
    document.body.style.cssText = '';
  }
}

// burger menu
const burgerButton = document.querySelector('.header__burger');
const mobileNavigation = document.querySelector('.mobile-navigation');

const headerMenu = document.querySelector('.header__menu');
const mobileNavigationMenu = document.querySelector('.mobile-navigation__menu');

const headerButton = document.querySelector('.header__button');
const mobileNavigationButton = document.querySelector('.mobile-navigation__button');

const headerMenuItems = document.querySelectorAll('.header__menu-item');


function openMobileMenu() {
  mobileNavigationMenu.append(headerMenu);
  mobileNavigationButton.append(headerButton);

  mobileNavigation.classList.add('is-open');

  burgerButton.classList.add('is-active');
  burgerButton.setAttribute('aria-expanded', 'true');
  burgerButton.setAttribute('aria-label', 'Close navigation menu');

  scrollController.disabledScroll()
}

function closeMobileMenu() {
  const headerContainer = document.querySelector('.header__container');
  const headerActions = document.querySelector('.header__actions');

  headerContainer.insertBefore(headerMenu, headerActions);
  headerActions.insertBefore(headerButton, burgerButton)

  mobileNavigation.classList.remove('is-open');

  burgerButton.classList.remove('is-active');
  burgerButton.setAttribute('aria-expanded', 'false');
  burgerButton.setAttribute('aria-label', 'Open navigation menu');

  scrollController.enabledScroll()
}

burgerButton.addEventListener('click', () => {
  const isMenuOpen = mobileNavigation.classList.contains('is-open');
  if (isMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

headerMenuItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (mobileNavigation.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
});

mobileNavigationButton.addEventListener('click', () => {
  if (mobileNavigation.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNavigation.classList.contains('is-open')) {
    closeMobileMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNavigation.classList.contains('is-open')) {
    closeMobileMenu();
  }
});