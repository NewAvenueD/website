window.addEventListener('load', function () {
  // console.log('window load event');
  const navigation = document.querySelector('.navigation');
  const body = document.querySelector('body');
  const buttonContain = document.querySelector('.burger-tab');
  //
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

  const toggleNav = function () {
    let startingState = body.getAttribute('data-state-menu');
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
