/* eslint-disable no-undef */

const accountDetails = document.querySelector('.popup-acc-details');
const creatStaffModal = document.querySelector('.pop-create-staff');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('view-account')) {
    accountDetails.style.visibility = 'visible';
  }

  if (event.target.className === 'new-staff') {
    creatStaffModal.style.visibility = 'visible';
  }
  if (event.target.classList.contains('popup_close')) {
    creatStaffModal.style.visibility = 'hidden';
    accountDetails.style.visibility = 'hidden';
  }
});
