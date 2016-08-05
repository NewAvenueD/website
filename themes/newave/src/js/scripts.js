window.addEventListener('load', function () {
  // console.log('window load event');
  const navigation = document.querySelector('.navigation');
  const body = document.querySelector('body');
  const buttonContain = document.querySelector('.burger-tab');

  //
  // ** Helpers **
  //

  // toggle (existing) 'data-state' attributes
  const toggleState = function (el, datum, one, two) {
    let elem = document.querySelector(el);
    if ( elem ) {
      let attr = 'data-state-' + datum;
      elem.setAttribute(attr, elem.getAttribute(attr) === one ? two : one);
    } else {
      console.log(elem, " not found..");
    }
  }
  // Debounce
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
          args = arguments;
      var later = function() {
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
  const isPage = page => document.body.classList.contains(page);

  //
  // ** Page specific scripts **
  //

  // Home

  // Unwrap images that markdown wraps in a paragraph
  const unwrapImage = () => {
    var elementList = document.querySelectorAll('.col-contain div.inner p img');
    for (var i = 0; i<elementList.length; i++) {
      var icon = elementList[i];
      icon.parentNode.parentNode.replaceChild(icon, icon.parentNode);
    }
  }

  const clearForm = () => {
    const form = document.querySelector('form');

    for (var i=0; i<form.elements.length; i++) {
      let input = form.elements[i];
      switch (input.type) {
        case "text":
        case "email":
        case "textarea":
          input.value = "";
          break;
        default:

      }
    }
  }

  if (isPage('home')) {
    var timer = setTimeout(clearForm(), 2000);
    unwrapImage();
    if (!Modernizr.touchevents) {
      const sr = ScrollReveal({ distance: '35px', duration: 620 });
      sr.reveal('.col:first-child');
      sr.reveal('.col:nth-child(2)', {delay: 200});
      sr.reveal('.col:nth-child(3)', {delay: 400});
    }
  }
  /**
   *
   * Why New Avenue
   *
   */
  if (isPage('why')) {
    // if (!Modernizr.touchevents) {
    //   const sr = ScrollReveal();
    //   sr.reveal('.beni');
    // }
  }

  if (isPage('contact')) {}

  const toggleNav = function () {
    // let startingState = body.getAttribute('data-state-menu');
    toggleState('body', 'menu', 'closed', 'open');
  }
  // toggle nav on menu button click
  document.getElementById('js-menu-button').onclick = (e) => {
    e.preventDefault();
    toggleNav();
  };

  // toggle nav on body clicks if it is open && click is outside 'drawer'
  body.onclick = (e) => {
    let inSideNav = navigation.contains(e.target);
    if (body.getAttribute('data-state-menu') === 'open' && !inSideNav) {
      toggleNav();
    }
  }

});
