'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const formElement = document.getElementById('contact-form');
  const buttonElement = document.getElementById('send-form-button');

  formElement.addEventListener('botpoison-challenge-start', () => {
    buttonElement.setAttribute('disabled', 'disabled');
  });

  formElement.addEventListener('botpoison-challenge-success', () => {
    buttonElement.removeAttribute('disabled');
  });

  formElement.addEventListener('botpoison-challenge-error', () => {
    buttonElement.removeAttribute('disabled');
  });
}, false);
