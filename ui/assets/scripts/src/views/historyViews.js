/* eslint-disable no-undef */
import { elements } from './base';

export const renderAccountNumbers = (numbers) => {
  numbers.forEach((number) => {
    const markup = `<option value="${number}" class="selectAccountOption">${number}</option>`;
    elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
  });
};

export const renderAccountHistory = (transactions) => {
  let markup = '';
  transactions.forEach((transaction) => {
    markup += `
      <div class="trans-block">
      <div class="type-symbol bg-${transaction.type}"><span class="absolute-center">${transaction.type}</span></div>
      <div class="trans-details">
        <p class=""><span class="trans-amount"><strong class="${transaction.type}">N${transaction.amount}</strong></span></p>
        <p>Transaction ID: <span class="trans-id">${transaction.id}</span></p>
        <p>Date: <span class="trans-date">${transaction.createdon.split('.')[0]}</span></p>
        <p>Old balance: <span class="old-bal">N${transaction.oldbalance}</span></p>
        <p>New balance: <span class="new-bal">N${transaction.newbalance}</span></p>
      </div>
    </div>
        `;
  });
  elements.h1Title.innerHTML = 'Recent Transactions';
  elements.transactionsContainer.innerHTML = markup;
};

export const renderRecentTransactions = (transactions) => {
  let markup = '';
  for (let i = 0; i < 3; i++) {
    markup += `
      <div class="trans-block">
      <div class="type-symbol bg-${transactions[i].type}"><span class="absolute-center">${transactions[i].type}</span></div>
      <div class="trans-details">
        <p class=""><span class="trans-amount"><strong class="${transactions[i].type}">N${transactions[i].amount}</strong></span></p>
        <p>transaction ID: <span class="trans-id">${transactions[i].id}</span></p>
        <p>Date: <span class="trans-date">${transactions[i].createdon.split('.')[0]}</span></p>
        <p>Old balance: <span class="old-bal">N${transactions[i].oldbalance}</span></p>
        <p>New balance: <span class="new-bal">N${transactions[i].newbalance}</span></p>
      </div>
    </div>
        `;
  }
  elements.h1Title.innerHTML = 'Recent Transactions';
  elements.transactionsContainer.innerHTML = markup;
};
