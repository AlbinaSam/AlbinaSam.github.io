const body = document.querySelector(`body`);
const menuButton = document.querySelector(`.page-header__open-menu`);
const middleNav = document.querySelector(`.page-header__middle-nav`);
const openCatalogControl = document.querySelector(`.middle-nav__item--catalog-item`);
const mobileCatalog = document.querySelector(`.middle-nav__item--catalog-item .bottom-nav__list`);

if (menuButton) {
  menuButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    body.classList.toggle(`body-locked`);
    menuButton.classList.toggle(`page-header__close-menu`);
    middleNav.classList.toggle(`middle-nav--hidden`);
    mobileCatalog.classList.add(`bottom-nav__list--hidden`);
    openCatalogControl.classList.remove(`middle-nav__item--catalog-opened`);
  })
}

if (openCatalogControl) {
  openCatalogControl.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    openCatalogControl.classList.toggle(`middle-nav__item--catalog-opened`);
    mobileCatalog.classList.toggle(`bottom-nav__list--hidden`);
  })
}

const videoSliderContainer = document.querySelector(`.video-section__slider-container`);

if (videoSliderContainer) {
  new Swiper(videoSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',

      navigation: {
        nextEl: '.video-section__slider-btn--next',
        prevEl: '.video-section__slider-btn--prev',
      },

      breakpoints: {

        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
        },

        1200: {
          slidesPerView: 2,
          spaceBetween: 70,
        }
      }
  })
}
