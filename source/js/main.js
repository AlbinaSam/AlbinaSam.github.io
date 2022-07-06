'use strict';

function addMask(currentTelInput) {
  window.iMaskJS(currentTelInput, {mask: '{8} (000) 000 00 00'});
}

//мобильное меню
(function () {
  const navToggleButton = document.querySelector(`.js_toggle-nav`);
  const headerNav = document.querySelector(`.page-header__nav`);

  if (navToggleButton) {
    navToggleButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      headerNav.classList.toggle(`page-header__nav--opened`)
    })
  }
})();

//плавный скролл
(function () {
  const nav = document.querySelector(`.page-header__nav`);
  const navLinks = document.querySelectorAll(`.page-header__nav-item a`);
  if (navLinks.length > 0) {
    Array.from(navLinks).forEach(link => {
      link.addEventListener('click', function(evt) {
          evt.preventDefault();
          if (document.body.clientWidth < '767') {
            nav.classList.remove(`page-header__nav--opened`);
          }
          let href = this.getAttribute('href').substring(1);
          const scrollTarget = document.getElementById(href);
          const topOffset = document.querySelector('.page-header').offsetHeight;
          const elementPosition = scrollTarget.getBoundingClientRect().top;
          const offsetPosition = elementPosition - topOffset;
          window.scrollBy({
              top: offsetPosition,
              behavior: 'smooth'
          });
      });
    });
  }
})();

//блок Часто задаваемые вопросы
(function () {
  const questions = document.querySelectorAll(`.faq__list-question`);

  if (questions.length > 0) {
    let currentOpen = ``;
    Array.from(questions).forEach(question => {
      question.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        if (currentOpen && currentOpen !== question.closest(`li`)) {
          currentOpen.classList.remove(`active`);
        }

        question.closest(`li`).classList.toggle(`active`);
        currentOpen = question.closest(`li`);
      })
    })
  }
})();

// //маски на тел
// (function () {
//   const telInputs = document.querySelectorAll(`input[type="tel"]`);
//   if (telInputs.length > 0) {
//     Array.from(telInputs).forEach(telInput => {
//       addMask(telInput);
//     })
//   }
// })();
