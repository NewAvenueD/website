document.addEventListener('DOMContentLoaded', function () {
  // initial HTML document has been completely loaded and parsed, without
  // waiting for stylesheets or images
  console.log('DOMContentLoaded event');
});
window.addEventListener('load', function () {
  console.log('window load event');
  const navigation = document.getElementById('navigation');

  function toggleNav() {
    navigation.classList.toggle('open')
  }
  document.getElementById('js-menu-button').onclick = toggleNav;
});
