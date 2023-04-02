window.onload = function () {
  addBurgerMenuHandler();
}

/*****************************************************************************/

// Burger menu

const addBurgerMenuHandler = () => {
  const burgerButton = document.querySelector('.burger');
  const navigationMenu = document.querySelector('.navigation-list');
  document.addEventListener('click', function (evt) {
    if (burgerButton.contains(evt.target) && !navigationMenu.classList.contains('visible')) {
      openMenu(burgerButton, navigationMenu);
    } else if (evt.target.className == 'navigation-link' || !navigationMenu.contains(evt.target)) {
      closeMenu(burgerButton, navigationMenu);
    }
  })
}

const openMenu = (burgerButton, navigationMenu) => {
  burgerButton.classList.add('active');
  navigationMenu.classList.add('visible');
}

const closeMenu = (burgerButton, navigationMenu) => {
  burgerButton.classList.remove('active');
  navigationMenu.classList.remove('visible');
}

export { addBurgerMenuHandler }
