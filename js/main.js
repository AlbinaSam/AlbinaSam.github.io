function addMask(currentTelInput) {
  window.iMaskJS(currentTelInput, {mask: '+{7}(000)000-00-00'});
}

const telInput = document.querySelector('input[type="tel"]');
  if (telInput) {
    addMask(telInput);
  }

const openMenuButton = document.querySelector('.header__open-menu');
const closeMenuButton = document.querySelector('.header__close-menu');
const nav = document.querySelector('.header__nav');

if (openMenuButton) {
  openMenuButton.addEventListener('click', function () {
    nav.classList.add('active');
    openMenuButton.style.display = 'none';
  })
}

if (closeMenuButton) {
  closeMenuButton.addEventListener('click', function () {
    nav.classList.remove('active');
    openMenuButton.removeAttribute('style');
  })
}

const menuItems = document.querySelectorAll('.header__nav-item');
const menuItemsLinks = document.querySelectorAll('.header__nav-item a[href]');

if (menuItems.length > 0) {
  menuItems.forEach((menuItem) => {

    const subnav = menuItem.querySelector('.header__subnav-list');

    if (subnav) {
      menuItem.addEventListener('click', function() {
        menuItem.classList.toggle('active');
      })
    }
  })
}

if (menuItemsLinks.length > 0) {
  menuItemsLinks.forEach((menuItemLink) => {
    menuItemLink.addEventListener('click', function () {
      nav.classList.remove('active');
      openMenuButton.removeAttribute('style');
    })
  })
}


const cigarLink = document.querySelector('.menu__link--cigar');
const wineLink = document.querySelector('.menu__link--wine');

if (cigarLink && wineLink) {
  cigarLink.addEventListener('mouseover', function () {
    wineLink.classList.add('blur');
  })

  cigarLink.addEventListener('mouseout', function () {
    wineLink.classList.remove('blur');
  })

  wineLink.addEventListener('mouseover', function () {
    cigarLink.classList.add('blur');
  })

  wineLink.addEventListener('mouseout', function () {
    cigarLink.classList.remove('blur');
  })
}


//наползающий фон

const slippingBg = document.querySelector('.header__slipping-bg');
 if (slippingBg) {

  window.addEventListener('scroll', function() {
    const curentPageOffset = pageYOffset;

    if (pageYOffset > 1) {

      slippingBg.style.bottom = '-' + (69 - (curentPageOffset / 4)) + '%';
    }
  });
 }


 //осветление меню

const darkMenuImg = document.querySelector('.menu__dark-img');
const menuLinksWrapper = document.querySelector('.menu__links');

if (darkMenuImg && menuLinksWrapper) {

  let top = menuLinksWrapper.getBoundingClientRect().top + window.scrollY - document.documentElement.clientHeight / 2;

    // if (document.body.clientWidth < '768') {
    //   top = section.getBoundingClientRect().top + window.scrollY - document.documentElement.clientHeight / 1.5;
    // }

  if (pageYOffset >= top) {
    darkMenuImg.style.animationName = 'fadeOut';
    menuLinksWrapper.classList.add('hidden-bg');
  }

  window.addEventListener('scroll', function () {

    if (pageYOffset >= top) {
      darkMenuImg.style.animationName = 'fadeOut';
      menuLinksWrapper.classList.add('hidden-bg');
    } else {
      darkMenuImg.removeAttribute('style');
      menuLinksWrapper.classList.remove('hidden-bg');
    }
  })
}


//Меню
const menuSection = document.querySelector('.menu');
const cigarMenuLinks = document.querySelectorAll('[data-link="cigar"]');
const wineMenuLinks = document.querySelectorAll('[data-link="wine"]');
const headerMenuLinks = menuSection.querySelectorAll('.section-header__links a');
const headerCigarLink = menuSection.querySelector('.section-header__links [data-link="cigar"]');
const headerWineLink = menuSection.querySelector('.section-header__links [data-link="wine"]');
const menuLinks = menuSection.querySelector('.menu__links');
const cigarMenu = menuSection.querySelector('.menu__part--cigar');
const wineMenu = menuSection.querySelector('.menu__part--wine');
const sectionHeaderBackLink = menuSection.querySelector('.section-title .menu__back-link');

const backLinks = menuSection.querySelectorAll('.menu__back-link');
if (backLinks.length > 0) {
  backLinks.forEach((backLink) => {
    backLink.addEventListener('click', function () {

      currentOpenMenu.classList.remove('visible');
      menuLinks.classList.remove('hidden');
      sectionHeaderBackLink.removeAttribute('style');

      currentOpenMenu = '';

      if (headerMenuLinks) {
        headerMenuLinks.forEach((link)=> {
          link.classList.remove('active');
        })
      }
    })
  })
}

let currentOpenMenu = '';


if (wineMenuLinks.length > 0) {
  wineMenuLinks.forEach((link) => {
    link.addEventListener('click', function () {

      menuLinks.classList.add('hidden');
      wineMenu.classList.add('visible');


      if (currentOpenMenu && currentOpenMenu != wineMenu) {
        currentOpenMenu.classList.remove('visible');
      }

      currentOpenMenu = wineMenu;

      headerCigarLink.classList.remove('active');
      headerWineLink.classList.add('active');

      if (document.body.clientWidth <= '1024') {
        sectionHeaderBackLink.style.display = 'flex';
      }
    })
  })
}

if (cigarMenuLinks.length > 0) {
  cigarMenuLinks.forEach((link) => {
    link.addEventListener('click', function () {

      menuLinks.classList.add('hidden');
      cigarMenu.classList.add('visible');

      if (currentOpenMenu && currentOpenMenu != cigarMenu) {
        currentOpenMenu.classList.remove('visible');
      }

      currentOpenMenu = cigarMenu;

      headerWineLink.classList.remove('active');
      headerCigarLink.classList.add('active');

      if (document.body.clientWidth <= '1024') {
        sectionHeaderBackLink.style.display = 'flex';
      }
    })
  })
}


//фильтр
const filterOpenButtons = document.querySelectorAll('.js_open-filter');

if (filterOpenButtons.length > 0) {

  document.addEventListener('click', function (evt) {
    filterOpenButtons.forEach((button) => {
      if (evt.target !== button) {
        button.parentElement.classList.remove('active');
      }
    })
  });

  filterOpenButtons.forEach((button) => {

    const currentfilter = button.parentElement;
      // const options = currentfilter.querySelectorAll('span');
      // options.forEach((option) => {
      //   option.addEventListener('click', function () {

      //     const optionText = option.textContent;
      //     button.textContent = optionText;
      //   });
      // })


    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      const currentfilter = button.parentElement;
      currentfilter.classList.toggle('active');
    })
  })
}


// слайдеры
const interiorSection = document.querySelector('.interior');
const interiorSliderWrapper = interiorSection.querySelector('.interior__slider-wrapper');
const interiorSliderContainer = interiorSection.querySelector('.interior__slider-container');

if (interiorSliderContainer) {
  const sliderNextButton = interiorSliderWrapper.querySelector('.slider-btn--next');
  const sliderPrevButton = interiorSliderWrapper.querySelector('.slider-btn--prev');

  const swiper = new Swiper (interiorSliderContainer, {
    slidesPerView: 1,
    spaceBetween: 1,
    direction: 'horizontal',
    //effect: "fade",

    navigation: {
      nextEl: sliderNextButton,
      prevEl: sliderPrevButton,
    },

    // autoplay: {
    //   delay: 3500,
    //   disableOnInteraction: true,
    // },
  });

  const actualSections = interiorSection.querySelectorAll('[data-section-show]');

  const headerMenuLinks = interiorSection.querySelectorAll('.section-header__links a');

  function showActiveElements () {
    const activeSlide = interiorSection.querySelector('.swiper-slide-active');
    const dataValue = activeSlide.dataset.section;

    const actualText = document.querySelector('[data-section-show="' + dataValue + '"]');
    actualText.style.display="block";
    actualText.style.animationName = 'fadeIn';

    const currentLink = document.querySelector('[data-link="' + dataValue + '"]');
    currentLink.classList.add('active');
  }

  showActiveElements();

  function showNextSlidesPreview () {
    const nextSlidePreview = interiorSection.querySelector('.interior__next-slide-preview');
    const nextSlide = interiorSection.querySelector('.swiper-slide-next');

    if (nextSlide) {
      const nextSlideImg = nextSlide.querySelector('img');
      const nextSlideImgPath = nextSlideImg.getAttribute('src');

      nextSlidePreview.style.backgroundImage=`url(${nextSlideImgPath})`;
    } else {
      nextSlidePreview.style.backgroundImage='none';
    }

    const afterNextSlidePreview = interiorSection.querySelector('.interior__after-next-slide-preview');

    if (nextSlide) {
      const afterNextSlide = nextSlide.nextElementSibling;

      if (afterNextSlide) {
        const afterNextSlideImg = afterNextSlide.querySelector('img');
        const afterNextSlideImgPath = afterNextSlideImg.getAttribute('src');

        afterNextSlidePreview.style.backgroundImage=`url(${afterNextSlideImgPath})`;
      } else {
        afterNextSlidePreview.style.backgroundImage='none';
      }
    }
  }

  showNextSlidesPreview();

  swiper.on('slideChangeTransitionEnd', function () {
    if (actualSections) {
      actualSections.forEach((section) => {
        section.removeAttribute('style');
      })
    }

    if (headerMenuLinks) {
      headerMenuLinks.forEach((link)=> {
        link.classList.remove('active');
      })
    }

    showActiveElements();

    showNextSlidesPreview();
  })
}


// const eventsSliderWrapper = document.querySelector('.events__slider-wrapper');
// const eventsSliderContainer = document.querySelector('.events__slider-container');

// if (eventsSliderContainer) {
//   const sliderNextButton = eventsSliderWrapper.querySelector('.slider-btn--next');
//   const sliderPrevButton = eventsSliderWrapper.querySelector('.slider-btn--prev');

//   const swiper = new Swiper (eventsSliderContainer, {
//     slidesPerView: 4,
//     spaceBetween: 30,
//     direction: 'horizontal',
//     //effect: "fade",

//     navigation: {
//       nextEl: sliderNextButton,
//       prevEl: sliderPrevButton,
//     },

//     // autoplay: {
//     //   delay: 3500,
//     //   disableOnInteraction: true,
//     // },
//   });
// }
