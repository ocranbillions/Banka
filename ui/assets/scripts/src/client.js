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

window.addEventListener('load', (e) => {
  e.preventDefault();
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const accountsModel = new Accounts(email, token);

  // Get user's profile
  const user = new Profile(id, token);
  user.fetchProfile()
    .then((response) => {
      if (response.status === 200) {
        // Render name & email
        const fullName = `${response.data.firstname} ${response.data.lastname}`;
        elements.fullNameElement.innerHTML = fullName;
        elements.emailElement.innerHTML = response.data.email;

        localStorage.setItem('fullName', fullName);
      } else {
        alert(response.errorMessage);
        window.location.href = '../../index.html';
      }
    })
    .catch((error) => {
      alert('An unexpected error occured!');
      console.log(error);
    });


  // Load user's accounts if on dashboard page
  if (location.pathname === '/pages/client.dashboard.html' || location.pathname === 'banka/ui/pages/client.dashboard.html') {
    accountsModel.fetchUserAccounts()
      .then((response) => {
        if (response.status === 200) {
          // Render user's accounts
          const accounts = response.data;
          localStorage.setItem('accounts', JSON.stringify(accounts));
          accountsView.renderAccounts(accounts);
        } else if (response.status === 404) {
          // Render no account
          elements.h1Title.innerHTML = response.errorMessage;
        } else {
          alert(response.errorMessage);
        }
      })
      .catch((error) => {
        alert('An unexpected error occured!');
        console.log(error);
      });

    // Select an account to view transactions/history
    elements.accountContainer.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (ev.target.classList.contains('history')) {
        const accountNumber = ev.target.parentElement.parentElement
          .firstElementChild.firstElementChild.textContent;

        // store the accountNumber for which they want to view history
        localStorage.setItem('accountNumber', accountNumber);

        // Navigate to history page
        window.location.href = './client.history.html';
      }
    });
  }

  // History page
  if (location.pathname === '/pages/client.history.html' || location.pathname === 'banka/ui/pages/client.history.html') {
    // Get user's account numbers
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const accountNumbers = accounts.map(account => account.accountnumber);

    // Populate select account option with user's acc numbers
    // historyViews.renderAccountNumbers(accountNumbers);
    accountNumbers.forEach((number) => {
      const markup = `<option value="${number}" class="selectAccountOption">${number}</option>`;
      elements.numbersContainer.insertAdjacentHTML('beforeend', markup);
    });

    // If an account history was clicked from the previous page (dashboard)
    if (localStorage.getItem('accountNumber')) {
      // Get the account number
      const selectedAccount = localStorage.getItem('accountNumber');

      // Set it as selected account
      document.querySelectorAll('.selectAccountOption').forEach((option) => {
        if (option.innerText === selectedAccount) {
          option.setAttribute('selected', 'selected');
        }
      });

      // Fetch account's transactions
      const transaction = new Transactions(selectedAccount, token);
      transaction.fetchAccountTrasactions()
        .then((response) => {
          if (response.status === 200) {
            // Render Transactions
            historyViews.renderAccountHistory(response.data);
          } else {
            elements.h1Title.innerHTML = response.errorMessage;
          }
        })
        .catch((error) => {
          alert('An unexpected error occured!');
          console.log(error);
        });
    }

    // Select a different account to view transactions
    elements.historyBtn.addEventListener('click', () => {
      // Clear previously displayed transactions
      elements.transactionsContainer.innerHTML = '';

      const selectedAccount = elements.numbersContainer.selectedOptions[0].innerText;
      const transaction = new Transactions(selectedAccount, token);

      transaction.fetchAccountTrasactions()
        .then((response) => {
          if (response.status === 200) {
            // Render Transactions
            historyViews.renderAccountHistory(response.data);
          } else {
            elements.h1Title.innerHTML = response.errorMessage;
          }
        })
        .catch((error) => {
          alert('An unexpected error occured!');
          console.log(error);
        });
    });
  }


  // Create new bank account
  elements.newAccount.addEventListener('click', (event) => {
    event.preventDefault();
    const accountType = document.querySelector('input[name="account-type"]:checked').value;

    const accountInfo = {
      openingBalance: elements.openingBalance.value,
      type: accountType,
    };
    elements.newAccountModal.style.visibility = 'hidden';

    accountsModel.createAccount(accountInfo)
      .then((response) => {
        if (response.status === 201) {
          if (location.pathname === '/pages/client.dashboard.html' || location.pathname === 'banka/ui/pages/client.dashboard.html') {
            // Render new account
            accountsView.renderNewAccount(response.data);
          } else {
            window.location.href = './client.dashboard.html';
          }
        } else {
          alert(response.errorMessage);
        }
      })
      .catch((error) => {
        alert('An unexpected error occured!');
        console.log(error);
      });
  });
});

elements.logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = '../index.html';
});

// Modal - open new account
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('new-acct')) {
    elements.newAccountModal.style.visibility = 'visible';
  }
  if (event.target.classList.contains('popup_close')) {
    elements.newAccountModal.style.visibility = 'hidden';
  }
});
