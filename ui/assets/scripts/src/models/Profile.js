/* eslint-disable no-else-return */
/* eslint-disable no-undef */
const baseUrl = 'https://my-banka.herokuapp.com/api/v1';

export default class Profile {
  constructor(id, token) {
    this.id = id;
    this.token = token;
  }

  async fetchProfile() {
    try {
      const res = await fetch(`${baseUrl}/users/${this.id}`, {
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
