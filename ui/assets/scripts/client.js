/* eslint-disable no-undef */
const newAccountModal = document.querySelector('.new-acct-popup');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('new-acct')) {
    newAccountModal.style.visibility = 'visible';
  }
  if (event.target.classList.contains('popup_close')) {
    newAccountModal.style.visibility = 'hidden';
  }
});
