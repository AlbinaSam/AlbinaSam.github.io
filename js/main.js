//menu

const body = document.querySelector(`body`);
const siteNav = document.querySelector(`.site-nav`);
const menuOpenButton = document.querySelector(`.js_openMenu`);
const menu = document.querySelector(`.site-nav__list`);

if (menuOpenButton) {
  menuOpenButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    siteNav.classList.toggle(`site-nav--opened`);
    body.classList.toggle(`body--locked`);

  })
}

//search

const searchForm = document.querySelector(`.user-nav__search`);
const searchIcon = document.querySelector(`.js_openSearch`);
const searchInput = document.querySelector(`.user-nav__search input[type="search"]`);


if (searchIcon) {
  searchIcon.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (searchInput.classList.contains(`visually-hidden`)) {
      searchInput.classList.remove(`visually-hidden`);
      callBackPopup.classList.remove(`user-nav__callback--show`);
    } else {
      searchForm.reset();
      searchInput.classList.add(`visually-hidden`);
    }
  })
}

//callback button

const callBackButton = document.querySelector(`.js_callBack`);
const callBackPopup = document.querySelector(`.user-nav__callback`);

if (callBackButton) {
  callBackButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    callBackPopup.classList.toggle(`user-nav__callback--show`);
    searchForm.reset();
    searchInput.classList.add(`visually-hidden`);
  })
}

//slider

const partnersSliderContainer = document.querySelector(`.partners__slider-container`);

if (partnersSliderContainer) {
  new Swiper(partnersSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: `horizontal`,

      navigation: {
        nextEl: `.partners__slider-btn--next`,
        prevEl: `.partners__slider-btn--prev`,
      },

      breakpoints: {
        450: {
          slidesPerView: 2,
          spaceBetween: 25,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },

        1024: {
          slidesPerView: 5,
          spaceBetween: 25,
        }
      }
  })
}

//mask

const phone = document.querySelector('.partnership__form input[type="tel"]');

if (phone) {
  window.iMaskJS(phone, {mask: '+{7}(000)000-00-00'});
};

