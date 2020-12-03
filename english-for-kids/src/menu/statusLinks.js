const menuLinks = document.querySelectorAll('.menu-link');

function removeStatusLink() {
  menuLinks.forEach((link) => {
    if (link.getAttribute('data-isActive')) {
      link.removeAttribute('data-isActive');
      link.classList.remove('active-link');
    }
  });
}

function addStatusLink(name) {
  const menuLink = Array.from(menuLinks).find((link) => link.getAttribute('data-link') === name);
  menuLink.setAttribute('data-isActive', 'true');
  menuLink.classList.add('active-link');
}

export default function changeStatusLinks(name) {
  removeStatusLink();
  addStatusLink(name);
}

export function activeMainPageLink() {
  const linkMainPage = Array.from(menuLinks).find((link) => link.textContent === 'Main page');
  linkMainPage.setAttribute('data-isActive', 'true');
  linkMainPage.classList.add('active-link');
}
