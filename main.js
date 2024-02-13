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
