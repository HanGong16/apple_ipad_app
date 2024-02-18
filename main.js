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
  setTimeout(function () {
    inputEl.focus();
  }, 600); // input의 transition이 .6s이기때문에 transition끝나고 실행되야하기 때문
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
  inputEl.value = '';
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
