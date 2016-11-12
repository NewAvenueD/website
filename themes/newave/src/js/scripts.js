import cats from './cats'
window.addEventListener('load', function () {
  // console.log('window load event');
  const navigation = document.querySelector('.navigation');
  const body = document.querySelector('body');
  const buttonContain = document.querySelector('.burger-tab');
  cats();
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

  // What page are we on?
  const isPage = page => document.body.classList.contains(page);

  //
  // ** Page specific scripts **
  //

  /**
   *
   * Home
   *
   */

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
    const sr = ScrollReveal({ distance: '35px', duration: 620 });
    sr.reveal('.row:not(.delivered) .col:first-child');
    sr.reveal('.row:not(.delivered) .col:nth-child(2)', {delay: 200});
    sr.reveal('.row:not(.delivered) .col:nth-child(3)', {delay: 400});
    // if (!Modernizr.touchevents) {
    // }
  }
  /**
   *
   * Why New Avenue
   *
   */
  if (isPage('book-now')) {
    console.log('book now page');
    const acuityBase = 'https://app.acuityscheduling.com/schedule.php?owner=12742842&calendarID=';
    const urlParams = new URLSearchParams(window.location.search);
    let calID = urlParams.get('cal')
    console.log(calID);
    if (calID) {
      var ifrm = document.createElement('iframe');
      ifrm.setAttribute('id', 'ifrm'); // assign an id
      ifrm.setAttribute('src', acuityBase + calID);
      document.querySelector('.frame-contain').innerHTML = '';
      document.querySelector('.frame-contain').appendChild(ifrm);
    }

  }
 /**
  *
  * About
  *
  */
  if (isPage('about')) {
    // find, clone image element
    let foosh = document.querySelector('.foosh');
    let foosh_prime = foosh.cloneNode(true);
    let parent = foosh.parentNode;
    let docFrag = document.createDocumentFragment();
    // create containing div
    let contain = document.createElement('div');
    contain.className = 'contain';
    let caption = document.createElement('div');
    let captionText = document.createElement('span');
    captionText.textContent = foosh.alt;
    caption.className = 'caption';
    caption.appendChild(captionText);
    foosh_prime.style.float = 'none'
    contain.appendChild(foosh_prime);
    contain.appendChild(caption);
    docFrag.appendChild(contain);
    parent.replaceChild(docFrag, foosh);
  }
  /**
   *
   * FAQs
   *
   */
  if (isPage('faqs')) {
    let dts = document.querySelectorAll('dt');
    for (var i = 0; i < dts.length; i++) {
      dts[i].onclick = (e) => {
        // the one that was clicked
        let answer = e.target.nextElementSibling;
        // if another one is open, close it
        if ((document.querySelector('dd.active') !== answer) && (document.querySelector('dd.active'))) {
          document.querySelector('dd.active').classList.remove('active');
        }
        answer.classList.toggle('active');

      }
    }

  }
  /**
   *
   * Contact
   *
   */
  if (isPage('contact')) {
    var timer = setTimeout(clearForm(), 2000);
  }


});
