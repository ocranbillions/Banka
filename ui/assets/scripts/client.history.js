/* eslint-disable no-console */
/* eslint-disable no-undef */

const transactionsContainer = document.getElementById('tansactions-container');

window.addEventListener('load', (e) => {
  e.preventDefault();

  const accountNumber = localStorage.getItem('accountNumber');
  const fullName = localStorage.getItem('fullName');
  const email = localStorage.getItem('email');
  fullNameElement.innerHTML = fullName;
  emailElement.innerHTML = email;

  if (accountNumber) {
    fetch(`${baseUrl}/accounts/${accountNumber}/transactions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((response) => {
        if (response.status === 200) {
          const transactions = response.data;
          let transactionList = '';
          transactions.forEach((transaction) => {
            transactionList += `
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
          h1Title.innerHTML = 'My Transactions';
          transactionsContainer.innerHTML = transactionList;
        } else {
          h1Title.innerHTML = response.errorMessage;
        }
      })
      .catch(error => console.log(error));
  }
});
