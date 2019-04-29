/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

const fullNameElement = document.getElementById('fullName');
const emailElement = document.getElementById('email');


const newAccountModal = document.querySelector('.new-acct-popup');
const newAccount = document.getElementById('submit-new-account');
const openingBalance = document.getElementById('openingbal');
const container = document.getElementById('accounts-container');
// eslint-disable-next-line no-unused-vars
const h1Title = document.getElementById('h1-title');

const token = localStorage.getItem('token');

newAccount.addEventListener('click', (e) => {
  e.preventDefault();
  const accountType = document.querySelector('input[name="account-type"]:checked').value;

  newAccountModal.style.visibility = 'hidden';

  const accountInfo = {
    openingBalance: openingBalance.value,
    type: accountType,
  };

  fetch(`${baseUrl}/accounts`, {
    method: 'POST',
    body: JSON.stringify(accountInfo),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="account margin-bottom-small f-item">
          <p class="heading-3"><span id="account-number">${response.data.accountnumber}</span> - <span class="green">${response.data.status}</span></p>
          <div class="account-details">
            <p class="margin-bottom-small">Balance: N${response.data.balance}</p>
            <p class="margin-bottom-small">Type: ${response.data.type}</p>
            <a href="" class="btn btn-blue margin-bottom-small history">Account history</a>
          </div>
        </div>
        `;
        // Append if we're on the dashboard page
        if (container) {
          container.appendChild(div);
        } else {
          window.location.href = './client.dashboard.html';
        }
      } else if (response.status === 400) {
        alert(response.errorMessage);
      } else {
        alert(response.errorMessage);
      }
    })
    .catch(error => console.log((error)));
});


// Modal - open new account
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('new-acct')) {
    newAccountModal.style.visibility = 'visible';
  }
  if (event.target.classList.contains('popup_close')) {
    newAccountModal.style.visibility = 'hidden';
  }
});


