/* eslint-disable no-undef */
const transactionModal = document.querySelector('.popup-transaction');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('transactjs')) {
    transactionModal.style.visibility = 'visible';
  }
  if (event.target.classList.contains('popup_close')) {
    transactionModal.style.visibility = 'hidden';
  }
});

