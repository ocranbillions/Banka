/* eslint-disable no-undef */
const loginBtn = document.querySelector('.login-btn');
const loginForm = document.querySelector('.login-section form');

loginBtn.addEventListener('click', () => {
  const userType = document.getElementById('email').value;
  if (userType === 'client') {
    loginForm.setAttribute('action', './pages/client.dashboard.html');
  } else if (userType === 'cashier') {
    loginForm.setAttribute('action', './pages/cashier.transactions.html');
  } else if (userType === 'admin') {
    loginForm.setAttribute('action', './pages/admin.accounts.html');
  }
});
