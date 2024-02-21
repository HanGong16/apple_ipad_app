import ipads from './data/ipads.js';
import navigations from './data/navigations.js';
//bascket
const basketEmotion = document.querySelector('.basket-starter');
const basketBox = document.querySelector('.basket');

basketEmotion.addEventListener('click', function (e) {
  e.stopPropagation();
  if (basketBox.classList.contains('open')) {
    closeBasket();
  } else {
    openBasket();
  }
});

window.addEventListener('click', function () {
  closeBasket();
});

function openBasket() {
  basketBox.classList.add('open');
}
function closeBasket() {
  basketBox.classList.remove('open');
}

//search-wrap
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu >li')];
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchCloserEl = searchWrapEl.querySelector(' .search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];
const inputEl = document.querySelector('.textfield input');

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', (e) => {
  e.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  headerMenuEls
    .reverse()
    .forEach(
      (el, idx) =>
        (el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + 's')
    );
  searchDelayEls.forEach(
    (el, idx) =>
      (el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + 's')
  );
  setTimeout(function () {
    inputEl.focus();
  }, 600); // input의 transition이 .6s이기때문에 transition끝나고 실행되야하기 때문
}

function hideSearch() {
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls
    .reverse()
    .forEach(
      (el, idx) =>
        (el.style.transitionDelay = (idx * 0.4) / headerMenuEls.length + 's')
    );
  searchDelayEls
    .reverse()
    .forEach(
      (el, idx) =>
        (el.style.transitionDelay = (idx * 0.4) / searchDelayEls.length + 's')
    );
  searchDelayEls.reverse();
  inputEl.value = '';
}

function playScroll() {
  document.documentElement.classList.remove('fixed');
}
function stopScroll() {
  document.documentElement.classList.add('fixed');
}

//header menu toggle */
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', () => {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing');
    inputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menuing');
    stopScroll();
  }
});

//헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancleEl = document.querySelector('header .search-canceler');
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile');
  inputEl.focus();
});
searchCancleEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile');
});

//window resize - 예외처리
window.addEventListener('resize', () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
  } else {
    headerEl.classList.remove('searching--mobile');
  }
});

const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', () => {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener('click', (e) => {
  e.stopPropagation();
});
navMenuShadowEl.addEventListener('click', hideNavMenu);
window.addEventListener('click', hideNavMenu);

function showNavMenu() {
  navEl.classList.add('menuing');
}
function hideNavMenu() {
  navEl.classList.remove('menuing');
}

/*IntersectionObserver */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});
const infoEls = document.querySelectorAll('.info');

infoEls.forEach((infoEl) => io.observe(infoEl));

// video controls
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', () => {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', () => {
  video.pause();
  playBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

/*Compare */
const compareEl = document.querySelector('.compare');
const itemsEl = compareEl.querySelector('.items');

ipads.forEach((ipad) => {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach((color) => {
    colorList += `<li style='background-color: ${color};'></li>`;
  });

  itemEl.innerHTML = /*HTML*/ `
  <div class='thumbnail'>
    <img src='${ipad.thumbnail}' alt='${ipad.name}' />
  </div>
  <ul class='colors'>
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class='tagline'>${ipad.tagline}</p>
  <p class='price'>₩${ipad.price.toLocaleString('en-US')}</p>
  <button class='btn'>구입하기</button>
  <a href='${ipad.url}' class='link'>더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

/*Navigations*/
const navigationsEl = document.querySelector('footer .navigations');

navigations.forEach((navigation) => {
  const navigationEl = document.createElement('div');
  navigationEl.classList.add('nav');

  let mapList = '';
  navigation.maps.forEach((map) => {
    mapList += /*HTML*/ `<li><a href="${map.url}">${map.name}</a></li>`;
  });
  navigationEl.innerHTML = /*HTML*/ `
  <h3>
    <span class='text'>${navigation.title}</span>
  </h3>
  <ul>
    ${mapList}
</ul>
  `;

  navigationsEl.append(navigationEl);
});

/* Footer legal */
const copyrightEl = document.querySelector('.copyright');
const yearEl = copyrightEl.querySelector('.this-year');

yearEl.textContent = new Date().getFullYear();
