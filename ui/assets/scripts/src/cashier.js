/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { elements } from './views/base';
import Profile from './models/Profile';
import Accounts from './models/Accounts';
import Transactions from './models/Transactions';
import * as accountsView from './views/accountsView';
import * as historyViews from './views/historyViews';

let accounts;

window.addEventListener('load', (e) => {
  e.preventDefault();
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const accountsModel = new Accounts(email, token);

  // Get cashier's profile
  const cashier = new Profile(id, token);
  cashier.fetchProfile()
    .then((response) => {
      if (response.status === 200) {
        // Render name & email
        const fullName = `${response.data.firstname} ${response.data.lastname}`;
        elements.fullNameElement.innerHTML = fullName;
        elements.emailElement.innerHTML = email;

        localStorage.setItem('fullName', fullName);
      } else {
        alert(response.errorMessage);
        window.location.href = '../../index.html';
      }
    })
    .catch((error) => {
      alert('1, An unexpected error occured!');
      console.log(error);
    });


  // Accounts page
  if (location.pathname === '/pages/cashier.accounts.html') {
    accountsModel.fetchAllAccounts()
      .then((response) => {
        if (response.status === 200) {
          // Render all accounts
          accounts = response.data;
          accountsView.renderAllAccounts(accounts);
        } else {
          alert(response.errorMessage);
        }
      })
      .catch((error) => {
        alert('An unexpected error occured!');
        console.log(error);
      });

    elements.cashierAccountsContainer.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('view-account')) {
        // Get account number frm classList
        const accountNumber = e.target.classList[1];
        accounts.forEach((account) => {
          if (account.accountnumber === accountNumber) {
            // Set account information for use on next page
            localStorage.setItem('account', JSON.stringify(account));
            // Navigate to account transactions
            window.location.href = './cashier.transactions.html';
          }
        });
      }
    });
  }


  // Transactions page
  if (location.pathname === '/pages/cashier.transactions.html') {
    let account = [localStorage.getItem('account')];
    account = JSON.parse(account);

    const transaction = new Transactions(account.accountnumber, token);
    transaction.fetchAccountTrasactions()
      .then((response) => {
        if (response.status === 200) {
          historyViews.renderRecentTransactions(response.data);
        } else {
          elements.h1Title.innerHTML = response.errorMessage;
        }
      })
      .catch((error) => {
        alert('An unexpected error occured!');
        console.log(error);
      });


    elements.transactionBtn.addEventListener('click', (event) => {
      event.preventDefault();

      console.log('transaction submitted', elements.transactionAmount.value);
      elements.transactionModal.style.visibility = 'hidden';

      const transactionDetails = {
        amount: elements.transactionAmount.value,
      };
      const transact = new Transactions(account.accountnumber, token);
      transact.credit(transactionDetails)
        .then((response) => {
          if (response.status === 201) {
            console.log('prepend new transaction', response.data);
          } else {
            console.log('response not 200', response);
          }
        })
        .catch((error) => {
          alert('An unexpected error occured!');
          console.log(error);
        });
    });

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('transactjs')) {
        elements.transactionModal.style.visibility = 'visible';
      }
      if (event.target.classList.contains('popup_close')) {
        elements.transactionModal.style.visibility = 'hidden';
      }
    });
  }
});


elements.logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = '../index.html';
});
