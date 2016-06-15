window.addEventListener('load', function () {
  console.log('window load event');
  const navigation = document.getElementById('navigation');

  const toggleState = function (el, datum, one, two) {
    let elem = document.querySelector(el);
    if ( elem ) {
      let attr = 'data-state-' + datum;
      elem.setAttribute(attr, elem.getAttribute(attr) === one ? two : one);
    } else {
      console.log(elem, " not found..");
    }
  }

  function toggleNav() {
    navigation.classList.toggle('open')
  }
  // document.getElementById('js-menu-button').onclick = toggleNav;
  document.getElementById('js-menu-button').onclick = (e) => {
    toggleState('body', 'menu', 'closed', 'open');
    e.preventDefault();
  };
});
