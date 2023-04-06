export const addBurgerMenuHandler = () => {
  const burgerButton = document.querySelector('.burger');
  const navigationMenu = document.querySelector('.navigation-list');
  const overlay = document.createElement('div');
  overlay.className = "overlay";
  document.addEventListener('click', function (evt) {
    if (burgerButton.contains(evt.target) && !navigationMenu.classList.contains('visible')) {
      document.body.append(overlay);
      openMenu(burgerButton, navigationMenu);
    } else if (evt.target.className == 'navigation-link' || !navigationMenu.contains(evt.target)) {
      overlay.remove();
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

