/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();

describe('TEST ALL ACCOUNT ENDPOINTS', () => {
  // Test case for getting all accounts
  describe('GET /api/v1/accounts', () => {
    it('Should get all accounts', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/');
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });
  });

  // // Test case for getting a single account
  describe('GET /api/v1/accounts/:number', () => {
    it('Should get a single account', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/9821372168');
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });

    it('Should NOT get an invalid account number', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/77854');
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });

  // // Test case for creating an account
  let accNum;
  describe('POST /api/v1/accounts', () => {
    it('Should create an account', async () => {
      const newAccount = {
        owner: 12,
        type: 'savings',
        openingBalance: 500.00,
      };
      const res = await chai.request(server).post('/api/v1/accounts/').send(newAccount);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(201);
      accNum = res.body.data.accountnumber;
    });

    it('Should NOT create an account with incomplete form data', async () => {
      const newAccount = {
        owner: '',
        type: 'savings',
        openingBalance: '67500.00',
      };
      const res = await chai.request(server).post('/api/v1/accounts/').send(newAccount);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });
  });

  // // Test case for changing an account status
  describe('PATCH /api/v1/accounts/:number', () => {
    it('Should change an account status', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch(`/api/v1/accounts/${accNum}`).send(formData);
      res.body.should.have.property('data');
      res.should.have.status(201);
    });

    it('Should NOT change an account status with invalid acc number', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch('/api/v1/accounts/54546546544646').send(formData);
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });

  // Test case for deleting an account
  describe('DELETE /api/v1/accounts/:number', () => {
    it('Should delete an account', async () => {
      const res = await chai.request(server).delete(`/api/v1/accounts/${accNum}`);
      res.body.should.have.property('status');
      res.body.should.have.property('message').eql('Account successfully deleted');
      res.should.have.status(202);
    });

    it('Should NOT delete an invalid acccount', async () => {
      const res = await chai.request(server).delete('/api/v1/accounts/5232');
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });
});
