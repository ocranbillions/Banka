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
  if (location.pathname === '/pages/cashier.accounts.html' || location.pathname === 'banka/ui/pages/cashier.accounts.html') {
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

    elements.searchAccountBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const acc = elements.searchAccountInput.value;
      if (acc === '') {
        alert('enter an account number');
      } else {
        accountsModel.getAccount(acc)
          .then((response) => {
            if (response.status === 200) {
              const markup = `
              <div class="trans-block box-shadow-1">
                <div class="trans-details teller-content-container">
                  <p class="teller-item"><span class="trans-amount">${response.data.accountnumber}</span></p>
                  <p class="teller-item"><span class="trans-account">${response.data.createdon.split('T')[0]}</span></p>
                  <p class="teller-item"><span class="trans-owner">${response.data.owneremail}</span></p>
                  <p class="teller-item"><span class="trans-type">${response.data.type}</span></p>
                  <p class="teller-item"><span class="status">${response.data.status}</span></p>
                  <p class="teller-item"><span class="">${response.data.balance}</span></p>
                  <p class="teller-item"><span class="view-account ${response.data.accountnumber}">view</span></p>
                </div>
              </div>`;
              elements.cashierAccountsContainer.innerHTML = markup;
            } else {
              elements.found.innerHTML = response.errorMessage;
              elements.cashierAccountsContainer.innerHTML = '';
            }
          })
          .catch((error) => {
            alert('An unexpected error occured!');
            console.log(error);
          });
      }
    });

    elements.searchAccountInput.addEventListener('keyup', () => {
      if (elements.searchAccountInput.value === '') {
        accountsView.renderAllAccounts(accounts);
      }
    });
  }

  // Transactions page
  if (location.pathname === '/pages/cashier.transactions.html' || location.pathname === 'banka/ui/pages/cashier.transactions.html') {
    let account = [localStorage.getItem('account')];
    account = JSON.parse(account);


    const markup = `
      <p class=""><span class="trans-amount"><strong class="green">${account.accountnumber} - ${account.type}</strong></span></p>
      <p>${account.owneremail}</p>
      <p>${account.status}</span></p>
      <p>Available Balance: <span id="currentBalance">N${account.balance}</span></p>
      `;
    elements.accountDetails.insertAdjacentHTML('afterbegin', markup);

    // Render transactions
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
        alert('type errors, An unexpected error occured!');
        console.log(error);
      });


    // Initiate a transaction
    let transactionType;
    elements.transactionBtns.addEventListener('click', (ev) => {
      ev.preventDefault();
      transactionType = ev.target.textContent;
    });
      
    elements.transactionBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const amount = elements.transactionAmount.value;
      elements.transactionModal.style.visibility = 'hidden';

      const transactionDetails = { amount };
      const transact = new Transactions(account.accountnumber, token);

      if (transactionType === 'Credit') {
        transact.credit(transactionDetails)
          .then((response) => {
            if (response.status === 201) {
              transaction.fetchAccountTrasactions()
                .then((response) => {
                  if (response.status === 200) {
                    historyViews.renderRecentTransactions(response.data);
                    document.getElementById('currentBalance').textContent = response.data[0].newbalance; 
                  } else {
                    elements.h1Title.innerHTML = response.errorMessage;
                  }
                })
                .catch((error) => {
                  alert('An unexpected error occured!');
                  console.log(error);
                });
            } else {
              elements.h1Title.innerHTML = response.errorMessage;
            }
          })
          .catch((error) => {
            alert('An unexpected error occured!');
            console.log(error);
          });
      }

      if (transactionType === 'Debit') {
        transact.debit(transactionDetails)
          .then((response) => {
            if (response.status === 201) {
              transaction.fetchAccountTrasactions()
                .then((response) => {
                  if (response.status === 200) {
                    historyViews.renderRecentTransactions(response.data);
                    document.getElementById('currentBalance').textContent = response.data[0].newbalance; 
                  } else {
                    elements.h1Title.innerHTML = response.errorMessage;
                  }
                })
                .catch((error) => {
                  alert('An unexpected error occured!');
                  console.log(error);
                });
            } else {
              elements.h1Title.innerHTML = response.errorMessage;
            }
          })
          .catch((error) => {
            alert('An unexpected error occured!');
            console.log(error);
          });
      }
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
