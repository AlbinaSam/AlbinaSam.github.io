'use strict';

//меню
(function () {
  var navBtn = document.querySelector('.page-header__open');
  var nav = document.querySelector('.page-header__nav');
  var navItems = document.querySelectorAll('.page-header__nav-item');

  if (navBtn && nav) {
    navBtn.addEventListener('click', openNav);
  }

  function openNav(evt) {
    evt.preventDefault();

    if (navBtn.classList.contains('page-header__close')) {
      navBtn.classList.remove('page-header__close');
      nav.style.display = '';

      Array.prototype.forEach.call(navItems, function (item) {
        item.classList.remove('page-header__nav-item--open');
      });

    } else {
      navBtn.classList.add('page-header__close');
      nav.style.display = 'block';
    }
  }


  function openSubNav(evt, navItem) {

    var currentSubNav = navItem.querySelector('.page-header__sub-nav-list');

    if (navItem.classList.contains('page-header__nav-item--open')) {
      navItem.classList.remove('page-header__nav-item--open')
    } else {
      Array.prototype.forEach.call(navItems, function (item) {
        item.classList.remove('page-header__nav-item--open');
      });

      if (currentSubNav) {
        navItem.classList.add('page-header__nav-item--open');
      }
    }
  }

   
  Array.prototype.forEach.call(navItems, function (navItem) {
      navItem.addEventListener('click', function (evt) {
        if (document.body.clientWidth < '1170') {
          openSubNav(evt, navItem);
        }
      });
  });

})();

//слайдер

(function () {
  
  var sliderContainer = document.querySelector('.slider__container');

  var mainSlider = new Swiper (sliderContainer, {
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.slider__btn--next',
      prevEl: '.slider__btn--prev',
    },

  });

})();


//слайдер врачей 
(function () {

 var specialistsSliderContainer = document.querySelector('.specialists__slider');

  if (specialistsSliderContainer) {
    var specialistsSlider = new Swiper(specialistsSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',

      pagination: {
        el: '.specialists__slider-pagination',
        type: 'fraction',
      },

      navigation: {
        nextEl: '.specialists__slider-btn--next',
        prevEl: '.specialists__slider-btn--prev',
      },
      
      breakpoints: {
        500: {
          slidesPerView: 2,
          spaceBetween: 30,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },

        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        }
      },
    });
  }
})();

//слайдер работ

(function () {

var worksSliderContainer = document.querySelector('.our-works__slider');

if (worksSliderContainer) {
  var worksSlider = new Swiper(worksSliderContainer, {
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',

    pagination: {
      el: '.our-works__slider-pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.our-works__slider-btn--next',
      prevEl: '.our-works__slider-btn--prev',
    },

    scrollbar: {
      el: '.our-works__scrollbar',
      draggable: true,
      snapOnRelease: false,
      //dragsize: 20,
    }
  });
}

})();

//слайдер отзывов

(function () {

  var reviewsSliderContainer = document.querySelector('.reviews__slider');
  
  if (reviewsSliderContainer) {
    var reviewsSlider = new Swiper(reviewsSliderContainer, {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',
  
      pagination: {
        el: '.reviews__slider-pagination',
        type: 'fraction',
      },
  
      navigation: {
        nextEl: '.reviews__slider-btn--next',
        prevEl: '.reviews__slider-btn--prev',
      }
    });
  }
  
  })();

// yandex map

(function () {

  var isMapSupport = true;

  try {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [51.723762, 36.138110],
        zoom: 16
      }, {
        searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Doctor Smile'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/pin.png',
        iconImageSize: [181, 54],
        iconImageOffset: [-20, -45]
      });


      myMap.geoObjects
      .add(myPlacemark);

    });

  } catch (err) {
    isMapSupport = false;
  }

})();
