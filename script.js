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


//slider
const coffeeSliders = [
  {
    "src": "../images/slider/coffee-slider-1.png",
    "name": "S’mores Frappuccino",
    "description": "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    "price": "$5.50",
  },
  {
    "src": "../images/slider/coffee-slider-2.png",
    "name": "Caramel Macchiato",
    "description": "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    "price": "$5.00",
  },
  {
    "src": "../images/slider/coffee-slider-3.png",
    "name": "Ice coffee",
    "description": "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    "price": "$4.50",
  },
];

const sliderArrowLeft = document.querySelector('.slider__arrow-left');

const sliderSlides = document.querySelector('.slider__slides');

const sliderArrowRight = document.querySelector('.slider__arrow-right');

const setupSlides = () => {
  coffeeSliders.forEach((coffeeSlider, index) => {
    const slide = document.createElement("div");
    slide.classList.add('slider__content');
    slide.dataset.index = index;

    const image = document.createElement("img");
    image.src = coffeeSlider.src;
    image.classList.add('slider__image');
    image.alt = coffeeSlider.name;

    const description = document.createElement("div");
    description.classList.add('slider__description');

    const header = document.createElement("h3");
    header.textContent = coffeeSlider.name;
    header.classList.add('slider__header');

    const paragraph = document.createElement("p");
    paragraph.textContent = coffeeSlider.description;
    paragraph.classList.add('slider__par');

    const price = document.createElement("p");
    price.textContent = coffeeSlider.price;
    price.classList.add('slider__price');

    description.append(header, paragraph, price);
    slide.append(image, description);
    sliderSlides.append(slide);
  });

  const firstClone = sliderSlides.firstElementChild.cloneNode(true);
  const lastClone = sliderSlides.lastElementChild.cloneNode(true);

  sliderSlides.appendChild(firstClone);
  sliderSlides.insertBefore(lastClone, sliderSlides.firstChild)
};

if (sliderSlides) {
  setupSlides();

  const sliderCards = document.querySelectorAll('.slider__content');
  const sliderControlls = document.querySelectorAll('.controls__element');

  let currentSlide = 0;
  let currentPosition = 1;
  let isAnimating = false;

  const showSlide = (position, logicalIndex) => {
    sliderSlides.style.transform = `translateX(-${position * 100}%)`;

    sliderControlls.forEach((control) => {
      control.classList.remove('controls__element-active')
    });

    sliderControlls[logicalIndex].classList.add('controls__element-active');

    currentPosition = position;
    currentSlide = logicalIndex;
  }

  const nextSlide = () => {
    if (isAnimating) {
      return;
    }

    const nextPosition = currentPosition + 1;

    isAnimating = true;

    if (nextPosition === sliderCards.length - 1) {
      sliderSlides.style.transition = `transform 0.5s ease`;

      showSlide(nextPosition, 0);
      
      sliderSlides.addEventListener('transitionend', () => {
        sliderSlides.style.transition = "none";
        showSlide(1, 0);

        requestAnimationFrame(() => {
          sliderSlides.style.transition = 'transform 0.5s ease';
          isAnimating = false;
        });
      }, { once: true});
      return;
    }
    showSlide(nextPosition, currentSlide + 1);

    sliderSlides.addEventListener('transitionend', () => {
      isAnimating = false;
    }, { once: true });
  }

  const previousSlide = () => {
    if (isAnimating) {
      return;
    }

    const previousPosition = currentPosition - 1;

    isAnimating = true;

    if (previousPosition === 0) {
      showSlide(previousPosition, 2);
      sliderSlides.addEventListener('transitionend', () => {
        sliderSlides.style.transition = 'none';

        showSlide(3, 2);

        requestAnimationFrame(() => {
          sliderSlides.style.transition = 'transform 0.5s ease';
          isAnimating = false;
        });
      }, { once: true });

      return;
    }

    showSlide(previousPosition, currentSlide - 1);

    sliderSlides.addEventListener('transitionend', () => {
      isAnimating = false;
    }, { once: true });
  }

  sliderArrowRight.addEventListener('click', nextSlide);
  sliderArrowLeft.addEventListener('click', previousSlide);

  sliderControlls.forEach((control, index) => {
    control.addEventListener('click', () => {
      showSlide(index + 1, index);
    });
  });

  showSlide(1, 0);

  //mobile slider

  const sliderViewport = document.querySelector('.slider__viewport');

  sliderViewport.addEventListener('click', (e) => {
    if (window.innerWidth > 380) {
      return
    };

    const { left, width } = sliderViewport.getBoundingClientRect();
    const clickPosition = e.clientX - left;

    if (clickPosition < width / 2) {
      previousSlide();
    } else {
      nextSlide();
    }
  });


  let touchStartX = 0;

  sliderViewport.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  sliderViewport.addEventListener('touchend', (event) => {
    if (window.innerWidth > 380) {
      return;
    }

    const touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  });
}


//menu
const buttonMenu = document.querySelectorAll('.menu__button');
const gridMenu = document.querySelector('.menu__grid');

async function loadCards() {
  try {
    const response = await fetch('../products.json');

    const cardsData = await response.json();

    renderCards(cardsData);

  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}

loadCards();

function renderCards(data) {
  const renderCategory = (category) => {
    gridMenu.innerHTML = '';

    buttonMenu.forEach((button) => {
      button.classList.remove('menu__button__selected');

      if (button.id === category) {
        button.classList.add('menu__button__selected');
      }
    });

    const categoryProducts = data.filter((product) => {
      return product.category === category;
    });

    categoryProducts.forEach((product, index) => {
      const menuCard = document.createElement('div');
      menuCard.classList.add('menu__card');

      const cardImage = document.createElement('img');
      cardImage.src = `../images/menu/grid-card-${category}/${category}-${index + 1}.png`
      cardImage.alt = 'coffee image';
      cardImage.classList.add('card__image');

      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');

      const cardContentText = document.createElement('div');
      cardContentText.classList.add('card__content-text');

      const cardHeader = document.createElement('h3');
      cardHeader.classList.add('card__header');
      cardHeader.textContent = product.name;

      const cardPar = document.createElement('p');
      cardPar.classList.add('card__par');
      cardPar.textContent = product.description;

      const cardPrice = document.createElement('p');
      cardPrice.classList.add('card__price');
      cardPrice.textContent = `$${product.price}`;


      cardContentText.append(cardHeader, cardPar)
      cardContent.append(cardContentText, cardPrice);
      menuCard.append(cardImage, cardContent);
      gridMenu.append(menuCard);
    });
  };

  buttonMenu.forEach((button) => {
    button.addEventListener('click', () => {
      renderCategory(button.id);
    });
  });

  renderCategory('coffee');
}




