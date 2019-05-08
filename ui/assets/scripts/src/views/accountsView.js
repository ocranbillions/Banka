/* eslint-disable no-undef */
import { elements } from './base';

export const renderAccounts = (accounts) => {
  let accountList = '';
  accounts.forEach((account) => {
    accountList += `
      <div class="account margin-bottom-small f-item">
        <p class="heading-3"><span id="account-number">${account.accountnumber}</span> - <span class="green">${account.status}</span></p>
        <div class="account-details">
          <p class="margin-bottom-small">Balance: N${account.balance}</p>
          <p class="margin-bottom-small">Type: ${account.type}</p>
          <a href="" class="btn btn-blue margin-bottom-small history">Account history</a>
        </div>
      </div>
      `;
  });
  elements.h1Title.innerHTML = 'My Accounts';
  elements.accountContainer.innerHTML = accountList;
};

export const renderNewAccount = (account) => {
  const markup = `
    <div class="account margin-bottom-small f-item">
      <p class="heading-3"><span id="account-number">${account.accountnumber}</span> - <span class="green">${account.status}</span></p>
      <div class="account-details">
        <p class="margin-bottom-small">Balance: N${account.balance}</p>
        <p class="margin-bottom-small">Type: ${account.type}</p>
        <a href="" class="btn btn-blue margin-bottom-small history">Account history</a>
      </div>
    </div>`;

  elements.accountContainer.insertAdjacentHTML('beforeend', markup);
};
