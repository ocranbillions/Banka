/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
  submitBtn.disabled = true;
  const userData = {
    email: email.value,
    password: password.value,
  };

  fetch(`${baseUrl}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        const userType = response.data.type;
        const isAdmin = response.data.isadmin;

        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        if (userType === 'client') {
          window.location.href = './pages/client.dashboard.html';
        } else if (isAdmin === true) {
          window.location.href = './pages/admin.accounts.html';
        } else if (userType === 'staff') {
          window.location.href = './pages/cashier.accounts.html';
        }
      } else if (response.status === 400) {
        alert(response.errorMessage);
        submitBtn.disabled = false;
      }
    })
    .catch(error => console.log((error)));
});
