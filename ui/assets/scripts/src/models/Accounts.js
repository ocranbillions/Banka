/* eslint-disable no-else-return */
/* eslint-disable no-undef */
const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

export default class Accounts {
  constructor(email, token) {
    this.email = email;
    this.token = token;
  }

  async fetchUserAccounts() {
    try {
      const res = await fetch(`${baseUrl}/users/${this.email}/accounts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const result = res.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  async createAccount(accountInfo) {
    try {
      const res = await fetch(`${baseUrl}/accounts`, {
        method: 'POST',
        body: JSON.stringify(accountInfo),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      const result = res.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  async fetchAllAccounts() {
    try {
      const res = await fetch(`${baseUrl}/accounts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const result = res.json();
      return result;
    } catch (error) {
      return error;
    }
  }
}
