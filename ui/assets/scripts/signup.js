/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */

const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

const firstname = document.getElementById('fname');
const lastname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
  submitBtn.disabled = true;
  const userData = {
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    password: password.value,
  };

  fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);

        window.location.href = './client.dashboard.html';
      } else if (response.status === 409) {
        alert(response.errorMessage);
        submitBtn.disabled = false;
      } else if (response.status === 400) {
        alert(response.errorMessage);
        submitBtn.disabled = false;
      }
    })
    .catch(error => console.log(error));
});
