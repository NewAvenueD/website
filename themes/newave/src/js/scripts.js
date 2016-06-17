window.addEventListener('load', function () {
  // console.log('window load event');
  const navigation = document.querySelector('.navigation');
  const body = document.querySelector('body');
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

  fixBurgerSize();

  function fixBurgerSize () {
    const buttonContain = document.querySelector('.burger-tab');
    let height = buttonContain.clientHeight;
    buttonContain.setAttribute("style", "height:"+height+"px; width:"+height+"px;");
    buttonContain.classList.remove("initial");
  }

  const toggleNav = function () {
    let startingState = body.getAttribute('data-state-menu');
    toggleState('body', 'menu', 'closed', 'open');
  }
  // toggle nav on menu button click
  document.getElementById('js-menu-button').onclick = (e) => {
    toggleNav();
    e.preventDefault();
  };

  // toggle nav on body clicks if it is open && click is to outside 'drawer'
  body.onclick = (e) => {
    let inSideNav = navigation.contains(e.target);
    if (body.getAttribute('data-state-menu') === 'open' && !inSideNav) {
      toggleNav();
    }
  }

});
