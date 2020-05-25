'use strict';

var ESC_CODE = 27;
var body = document.querySelector('body');
var SUCCESS_CODE = 200;
var TEST_URL = 'http://httpbin.org/post';
//валидация форм
(function () {

  var validateElement = function (currentElement) {
    if (!currentElement.validity.valid) {
      currentElement.style = 'border-color: red';
      return 'true';
    }

    return '';
  }


  var getValidationResult = function (evt, currentForm) {
    evt.preventDefault();

    var currentNameInput =  currentForm.querySelector('input[type="text"]');

    if (currentNameInput) {
      validateElement(currentNameInput);
    }
  
    var currentEmail = currentForm.querySelector('input[type="email"]');
  
    if (currentEmail) {
      validateElement(currentEmail);
    }
  
    var textarea = currentForm.querySelector('textarea');
  
    if (textarea) {
      validateElement(textarea);
    }

    if (validateElement(currentNameInput) || validateElement(currentEmail) || validateElement(textarea)) {
      return 'true'
    }

    return '';
    
  }

  window.getValidationResult = getValidationResult;

})();

//поведение полей при изменении ошибок

(function () {

  var inputs = document.querySelectorAll('input');
  var textarea = document.querySelector('textarea');

  if (inputs) {
    Array.prototype.forEach.call(inputs, function (element) {
      element.oninput = function () {
        element.removeAttribute('style');
      };
    });
  }

  if (textarea) {
    textarea.oninput = function () {
      textarea.removeAttribute('style');
    };
  }

})();

//открытие успешной модалки

(function () {

  var openSuccessModal = function () {
    var modalSuccess = document.querySelector('.modal--success');

    var closeBtn = modalSuccess.querySelector('button[type="button"]');

    var closeSuccessModal = function () {
      body.removeAttribute('style');
      modalSuccess.classList.add('modal--hidden');
      modalSuccess.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onModalEscPress);
      closeBtn.removeEventListener('click', onCloseButtonClick);
    }

    var onCloseButtonClick = function () {
      closeSuccessModal();
    }

    var onOverlayClick = function (evt) {
      if (evt.target === modalSuccess) {
        closeSuccessModal();
      }
    }
  
    var onModalEscPress = function (evt) {
      if (evt.keyCode === ESC_CODE) {
        closeSuccessModal();
      }
    }

    body.style.overflow = 'hidden';
    modalSuccess.classList.remove('modal--hidden');
    modalSuccess.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onModalEscPress);
    closeBtn.addEventListener('click', onCloseButtonClick);

  }

  window.openSuccessModal = openSuccessModal;

})();

//ajax

(function () {

  var sendData = function(data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad();
      }
    });
  
    xhr.open('POST', TEST_URL);
    xhr.send(data);
  
  }

  window.sendData = sendData;

})();


//открытие модального окна (общая функция)

(function () {

  var onOpenModalBtnClick = function (currentModal) {

    var form = currentModal.querySelector('form');
    var submitBtn = currentModal.querySelector('button[type="submit"]');

    var closeModal = function () {

      var inputs = currentModal.querySelectorAll('input');

      Array.prototype.forEach.call(inputs, function(input) {
        input.removeAttribute('style');
      });

      var textarea = currentModal.querySelector('textarea');
      textarea.removeAttribute('style');

      form.reset();

      body.removeAttribute('style');
      currentModal.classList.add('modal--hidden');
      currentModal.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onModalEscPress);
    }
  
    var onOverlayClick = function (evt) {
      if (evt.target === currentModal) {
        closeModal();
      }
    }
  
    var onModalEscPress = function (evt) {
      if (evt.keyCode === ESC_CODE) {
        closeModal();
      }
    }

    body.style.overflow = 'hidden';
    currentModal.classList.remove('modal--hidden');
    currentModal.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onModalEscPress);
    

    var onSuccessFormSend = function () {
      closeModal();
      window.openSuccessModal();
    }
    
    var onSubmitBtn = function (evt) {
      var error = window.getValidationResult(evt, form);
      
      if (!error) {
        window.sendData(new FormData(form), onSuccessFormSend);
      } 
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', onSubmitBtn);
    }
  };
  
  window.onOpenModalBtnClick = onOpenModalBtnClick;
 
})();



//открытие модального окна (вызов функции)
(function () {
  var button = document.querySelector('.footer-top__button');
  var modal = document.querySelector('.modal--contact-us');
  
  
  if (button) {
    button.addEventListener('click', function () {
      window.onOpenModalBtnClick(modal);
    });
  }

})();



