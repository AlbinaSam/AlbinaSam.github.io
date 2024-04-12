const body = document.querySelector('body');

//показ модального окна
function openModal(currentModal) {

  currentModal.classList.add('is-active');
  body.classList.add('body--locked');

  const modalCloseElements = currentModal.querySelectorAll('[data-close-modal]');

  function closeModal() {
    currentModal.classList.remove('is-active');
    body.classList.remove('body--locked');

    modalCloseElements.forEach((element) => {
      element.removeEventListener(`click`, onCloseButtonClick);
    })

    document.removeEventListener(`keydown`, onEscButtonPress);
  }

  function onEscButtonPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  }

  function onCloseButtonClick(evt) {
    evt.preventDefault();
    closeModal();
  }

  modalCloseElements.forEach((element) => {
    element.addEventListener(`click`, onCloseButtonClick);
  })

  document.addEventListener(`keydown`, onEscButtonPress);
}

window.addEventListener('DOMContentLoaded', () => {
  const confirmAgeModal = document.querySelector('.modal--confirm-age');

  if (confirmAgeModal) {
    openModal(confirmAgeModal);
  }
});


function addMask(currentTelInput) {
  window.iMaskJS(currentTelInput, {mask: '+{7}(000)000-00-00'});
}

const telInput = document.querySelector('input[type="tel"]');
if (telInput) {
  addMask(telInput);
}

Fancybox.bind("[data-fancybox]", {
  Thumbs: false,
  zoom: false,
});

// открытие-закрытие навигации
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

// размытие при ховере на изображения сигары и бокала
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

//наползающий фон в хедере
const slippingBg = document.querySelector('.header__slipping-bg');
 if (slippingBg) {
  window.addEventListener('scroll', function() {
    const curentPageOffset = pageYOffset;
    if (pageYOffset > 1) {
      if (document.body.clientWidth < '768') {
        slippingBg.style.height = 100 + (curentPageOffset / 2)  + 'px';
      } else {
        slippingBg.style.height = 100 + (curentPageOffset / 4) + 'px';
      }
    }
  });
 }

 //осветление меню
const darkMenuImg = document.querySelector('.menu__dark-img');
const menuLinksWrapper = document.querySelector('.menu__links');

if (darkMenuImg && menuLinksWrapper) {
  let top = menuLinksWrapper.getBoundingClientRect().top + window.scrollY - document.documentElement.clientHeight / 2;

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

// открытие-закрытие меню сигар и меню бара
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

// открытие-закрытие фильтра
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

//Интерьер
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

const smoke1 = document.querySelector('.interior__smoke-1');
const smoke2 = document.querySelector('.interior__smoke-2');

if (smoke1) {
  let top = smoke1.getBoundingClientRect().top + window.scrollY - document.documentElement.clientHeight / 2;

  if (window.scrollY >= top) {
    smoke1.classList.add('animate');
  } else {
    smoke1.classList.remove('animate');
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY >= top) {
      smoke1.classList.add('animate');
    } else {
      smoke1.classList.remove('animate');
    }
  })
}

if (smoke2) {
  let top = smoke2.getBoundingClientRect().top + window.scrollY - document.documentElement.clientHeight / 2;

  if (window.scrollY >= top) {
    smoke2.classList.add('animate');
  } else {
    smoke2.classList.remove('animate');
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY >= top) {
      smoke2.classList.add('animate');
    } else {
      smoke2.classList.remove('animate');
    }
  })
}


//Афиша
const eventsSection = document.querySelector('.events');
const eventsSliderWrappers = document.querySelectorAll('.events__slider-wrapper');

const eventsDownLink = document.querySelector('.events__links .link-down');
const eventsBackLink = document.querySelector('.events__links .events__back-link');

const nextEventImg = document.querySelector('.events__next-img-container img');
const lastEventImgContainer = document.querySelector('.events__last-img-container');

const eventsSectionHeaderBackLink = eventsSection.querySelector('.section-title .events__back-link');

const nextEventsLinks = document.querySelectorAll('[data-link="next-events"]');
const lastEventsLinks = document.querySelectorAll('[data-link="last-events"]');
const headerNextEventsLink = eventsSection.querySelector('.section-header__links [data-link="next-events"]');
const headerLastEventsLink = eventsSection.querySelector('.section-header__links [data-link="last-events"]');
const nextEvents = eventsSection.querySelector('.events__next');
const lastEvents = eventsSection.querySelector('.events__last');
let currentOpenEvents = nextEvents;

if (eventsSliderWrappers.length > 0) {
  eventsSliderWrappers.forEach((eventsSliderWrapper) => {

    const eventsSliderContainer = eventsSliderWrapper.querySelector('.events__slider-container');
    const eventsSlider = eventsSliderWrapper.querySelector('.events__slider');

    const eventsSlides = eventsSliderContainer.querySelectorAll('.events__slide');

    const eventSlideDetailsImages = eventsSliderWrapper.querySelectorAll('.events__slide-details-img');


    if (eventsSliderContainer) {
      const sliderNextButton = eventsSliderWrapper.querySelector('.slider-btn--next');
      const sliderPrevButton = eventsSliderWrapper.querySelector('.slider-btn--prev');

      const swiper = new Swiper (eventsSliderContainer, {
        slidesPerView: 1,
        spaceBetween: 0,
        direction: 'horizontal',

        navigation: {
          nextEl: sliderNextButton,
          prevEl: sliderPrevButton,
        },

        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1025: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }

        // autoplay: {
        //   delay: 3500,
        //   disableOnInteraction: true,
        // },
      });


      if (eventsSlides.length > 0) {
        eventsSlides.forEach((eventsSlide) => {

          eventsSlide.addEventListener('click', function (evt) {
            const eventsSliderStyles = eventsSlider.getAttribute('style');
            swiper.disable();
            const currentSlide = evt.target.closest('.events__slide');

            eventsSliderWrapper.classList.add('show-slide-mode');

            eventsSlides.forEach((slide) => {
              if (slide != currentSlide) {
                slide.classList.add('hidden');
              }
            })

            eventsSlider.removeAttribute('style');
            currentSlide.classList.add('show-details');
            eventsDownLink.classList.add('hidden');

            const img = currentSlide.querySelector('.events__slide-details-img');

            function returnToSlider () {
              eventsDownLink.classList.remove('hidden');

              nextEventImg.classList.remove('visible');
              nextEventImg.removeAttribute('src');

              lastEventImgContainer.classList.remove('visible');

              currentSlide.classList.remove('show-details');

              eventsSlides.forEach((slide) => {
                if (slide != currentSlide) {
                  slide.classList.remove('hidden');
                }
              })

              eventsSliderWrapper.classList.remove('show-slide-mode');
              swiper.enable();
            }

            if (document.body.clientWidth >= '768') {
              if (currentOpenEvents && currentOpenEvents === nextEvents) {
                if (img) {
                  const imgSrc = img.getAttribute('src');
                  nextEventImg.src = imgSrc;
                  nextEventImg.classList.add('visible');
                }
              }

              if (currentOpenEvents && currentOpenEvents === lastEvents) {
                lastEventImgContainer.classList.add('visible');
              }
            } else {
              if (currentOpenEvents && currentOpenEvents === nextEvents) {
                if (eventSlideDetailsImages.length > 0) {
                  eventSlideDetailsImages.forEach((img) => {
                    img.classList.remove('visually-hidden');
                  })
                }
              }

              if (currentOpenEvents && currentOpenEvents === lastEvents) {
                lastEventImgContainer.classList.add('visible');
              }
            }

            //стрелка назад
            if (document.body.clientWidth > '1024') {
              eventsBackLink.classList.add('visible');

              eventsBackLink.addEventListener('click', function () {

                eventsBackLink.classList.remove('visible');
                returnToSlider();
                eventsSlider.setAttribute('style', eventsSliderStyles);
              })
            } else {
              eventsSectionHeaderBackLink.style.display = 'flex';

              eventsSectionHeaderBackLink.addEventListener('click', function () {

                eventsSectionHeaderBackLink.removeAttribute('style');
                returnToSlider();
                eventsSlider.setAttribute('style', eventsSliderStyles);
              })
            }

            if (nextEventsLinks.length > 0) {
              nextEventsLinks.forEach((link) => {
                link.addEventListener('click', function () {

                  eventsBackLink.classList.remove('visible');
                  eventsSectionHeaderBackLink.removeAttribute('style');
                  returnToSlider();
                  eventsSlider.setAttribute('style', eventsSliderStyles);

                  lastEvents.classList.add('visually-hidden');
                  nextEvents.classList.remove('visually-hidden');

                  if (currentOpenEvents && currentOpenEvents != nextEvents) {
                    currentOpenEvents.classList.add('visually-hidden');
                  }

                  currentOpenEvents = nextEvents;

                  headerLastEventsLink.classList.remove('active');
                  headerNextEventsLink.classList.add('active');
                })
              })
            }

            if (lastEventsLinks.length > 0) {
              lastEventsLinks.forEach((link) => {
                link.addEventListener('click', function () {

                  eventsBackLink.classList.remove('visible');
                  eventsSectionHeaderBackLink.removeAttribute('style');
                  returnToSlider();
                  eventsSlider.setAttribute('style', eventsSliderStyles);

                  nextEvents.classList.add('visually-hidden');
                  lastEvents.classList.remove('visually-hidden');

                  if (currentOpenEvents && currentOpenEvents != lastEvents) {
                    currentOpenEvents.classList.add('visually-hidden');
                  }

                  currentOpenEvents = lastEvents;

                  headerNextEventsLink.classList.remove('active');
                  headerLastEventsLink.classList.add('active');
                })
              })
            }
          })
        })
      }
    }
  })
}

if (nextEventsLinks.length > 0) {
  nextEventsLinks.forEach((link) => {
    link.addEventListener('click', function () {

      lastEvents.classList.add('visually-hidden');
      nextEvents.classList.remove('visually-hidden');

      if (currentOpenEvents && currentOpenEvents != nextEvents) {
        currentOpenEvents.classList.add('visually-hidden');
      }

      currentOpenEvents = nextEvents;

      headerLastEventsLink.classList.remove('active');
      headerNextEventsLink.classList.add('active');
    })
  })
}

if (lastEventsLinks.length > 0) {
  lastEventsLinks.forEach((link) => {
    link.addEventListener('click', function () {

      nextEvents.classList.add('visually-hidden');
      lastEvents.classList.remove('visually-hidden');

      if (currentOpenEvents && currentOpenEvents != lastEvents) {
        currentOpenEvents.classList.add('visually-hidden');
      }

      currentOpenEvents = lastEvents;

      headerNextEventsLink.classList.remove('active');
      headerLastEventsLink.classList.add('active');
    })
  })
}
