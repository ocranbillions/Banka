/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const accountContainer = document.getElementById('accounts-container');

window.addEventListener('load', (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  // Fetch user's profile information
  fetch(`${baseUrl}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        const fullName = `${response.data.firstname} ${response.data.lastname}`;
        localStorage.setItem('fullName', fullName);

        fullNameElement.innerHTML = fullName;
        emailElement.innerHTML = response.data.email;
      } else {
        alert(response.errorMessage);
        // back to login page if not authorized
        window.location.href = '../../index.html';
      }
    })
    .catch(error => console.log(error));

  // Fetch user's bank account(s)
  fetch(`${baseUrl}/users/${email}/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        const accounts = response.data;
        let accountList = '';
        accounts.forEach((account) => {
          accountList += `
            <div class="account margin-bottom-small f-item">
              <p class="heading-3"><span id="account-number">
                ${account.accountnumber}</span> - <span class="green">${account.status}</span></p>
              <div class="account-details">
                <p class="margin-bottom-small">Balance: N${account.balance}</p>
                <p class="margin-bottom-small">Type: ${account.type}</p>
                <a href="" class="btn btn-blue margin-bottom-small history">Account history</a>
              </div>
            </div>
            `;
        });
        h1Title.innerHTML = 'My Accounts';
        accountContainer.innerHTML = accountList;
      } else {
        h1Title.innerHTML = response.errorMessage;
      }
    })
    .catch(error => console.log(error));
});

// Load history/transactions on click
accountContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('history')) {
    const accountNumber = e.target.parentElement.parentElement
      .firstElementChild.firstElementChild.textContent;
    localStorage.setItem('accountNumber', accountNumber);
    window.location.href = './client.history.html';
  }
});
