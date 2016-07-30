'use strict';

window.addEventListener('load', function () {
  // console.log('window load event');
  var navigation = document.querySelector('.navigation');
  var body = document.querySelector('body');
  var buttonContain = document.querySelector('.burger-tab');

  //
  // ** Helpers **
  //

  // toggle (existing) 'data-state' attributes
  var toggleState = function toggleState(el, datum, one, two) {
    var elem = document.querySelector(el);
    if (elem) {
      var attr = 'data-state-' + datum;
      elem.setAttribute(attr, elem.getAttribute(attr) === one ? two : one);
    } else {
      console.log(elem, " not found..");
    }
  };
  // Debounce
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // What page are we on?
  var isPage = function isPage(page) {
    return document.body.classList.contains(page);
  };

  //
  // ** Page specific scripts **
  //

  // Home

  // Unwrap images that markdown wraps in a paragraph
  var unwrapImage = function unwrapImage() {
    var elementList = document.querySelectorAll('.col-contain div.inner p img');
    for (var i = 0; i < elementList.length; i++) {
      var icon = elementList[i];
      icon.parentNode.parentNode.replaceChild(icon, icon.parentNode);
    }
  };

  var clearForm = function clearForm() {
    var form = document.querySelector('form');

    for (var i = 0; i < form.elements.length; i++) {
      var input = form.elements[i];
      switch (input.type) {
        case "text":
        case "email":
        case "textarea":
          input.value = "";
          break;
        default:

      }
    }
  };

  if (isPage('home')) {
    var timer = setTimeout(clearForm(), 2000);
    var sr = ScrollReveal({ reset: true });
    sr.reveal('.beni');
    unwrapImage();
  }

  if (isPage('why')) {
    var _sr = ScrollReveal({ reset: true });
    _sr.reveal('.beni');
  }

  if (isPage('contact')) {}

  var toggleNav = function toggleNav() {
    // let startingState = body.getAttribute('data-state-menu');
    toggleState('body', 'menu', 'closed', 'open');
  };
  // toggle nav on menu button click
  document.getElementById('js-menu-button').onclick = function (e) {
    e.preventDefault();
    toggleNav();
  };

  // toggle nav on body clicks if it is open && click is outside 'drawer'
  body.onclick = function (e) {
    var inSideNav = navigation.contains(e.target);
    if (body.getAttribute('data-state-menu') === 'open' && !inSideNav) {
      toggleNav();
    }
  };
});