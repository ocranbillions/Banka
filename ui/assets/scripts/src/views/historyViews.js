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
        <p>Account number: <span class="trans-account">${transaction.accountnumber}</span></p>
        <p>Transaction ID: <span class="trans-id">${transaction.id}</span></p>
        <p>Date: <span class="trans-date">${transaction.createdon}</span></p>
        <p>Old balance: <span class="old-bal">N${transaction.oldbalance}</span></p>
        <p>New balance: <span class="new-bal">N${transaction.newbalance}</span></p>
      </div>
    </div>
        `;
  });
  elements.h1Title.innerHTML = 'My Transactions';
  elements.transactionsContainer.innerHTML = markup;
};
