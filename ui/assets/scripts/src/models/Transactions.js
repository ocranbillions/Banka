/* eslint-disable no-else-return */
/* eslint-disable no-undef */
const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

export default class Transactions {
  constructor(accountNumber, token) {
    this.accountNumber = accountNumber;
    this.token = token;
  }

  async fetchAccountTrasactions() {
    try {
      const res = await fetch(`${baseUrl}/accounts/${this.accountNumber}/transactions`, {
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
