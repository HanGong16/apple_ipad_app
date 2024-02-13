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

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
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
}
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
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
}
