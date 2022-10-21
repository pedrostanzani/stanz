let closeMenu = document.getElementById('closeMenu');

closeMenu.addEventListener('click', () => {
  console.log('click')
  history.back();
})