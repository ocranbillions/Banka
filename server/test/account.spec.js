/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

let adminToken;
describe('ACCOUNTS', () => {
  it('login staff', async () => {
    const adminLogin = {
      email: 'mikejones@gmail.com',
      password: 'somesecret',
    };
    const res = await chai.request(server).post('/api/v1/auth/signin').send(adminLogin);
    adminToken = res.body.data.token;
  });

  describe('api/v1/accounts', () => {
    it('Should get all accounts', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/').set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });
    it('Should NOT get access /accounts if user is not logged in', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/');
      res.body.should.have.property('errorMessage').eql('You must be logged in to access this route');
      res.should.have.status(403);
    });
    it('Should NOT authenticate user with invalid token', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/').set('Authorization', '$INVALIDTOKEN');
      res.body.should.have.property('errorMessage').eql('Invalid token');
      res.should.have.status(401);
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/').set('Authorization', 'Bearer $sometoken');
      res.body.should.have.property('errorMessage').eql('Auth failed!');
      res.should.have.status(401);
    });
  });
  describe('GET /api/v1/accounts/:accountNumber', () => {
    it('Should get a single account', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/4194194410').set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });

    it('Should NOT get an invalid account number', async () => {
      const res = await chai.request(server).get('/api/v1/accounts/77854').set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });

  it('Should get all transactions on an account', async () => {
    const res = await chai.request(server).get('/api/v1/accounts/9852136521/transactions').set('Authorization', `Bearer ${adminToken}`);
    res.body.should.have.property('data');
    res.body.should.have.property('status');
    res.should.have.status(200);
  });

  // // Test case for creating an account
  let accNum;
  describe('POST /api/v1/accounts', () => {
    it('Should create an account', async () => {
      const newAccount = {
        type: 'savings',
        openingBalance: 5000.00,
      };
      const res = await chai.request(server).post('/api/v1/accounts/').set('Authorization', `Bearer ${adminToken}`).send(newAccount);
      res.body.should.have.property('data');
      res.body.data.type.should.equal('savings');
      res.body.should.have.property('status');
      res.should.have.status(201);
      accNum = res.body.data.accountnumber;
    });

    it('Should NOT create an account with incomplete form data', async () => {
      const newAccount = {
        owneremail: '',
        type: 'savings',
        openingBalance: '67500.00',
      };
      const res = await chai.request(server).post('/api/v1/accounts/').set('Authorization', `Bearer ${adminToken}`).send(newAccount);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });
  });

  // // Test case for changing an account status
  describe('PATCH /api/v1/accounts/:accountNumber', () => {
    it('Should change an account status', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch('/api/v1/accounts/5421214520').set('Authorization', `Bearer ${adminToken}`).send(formData);
      res.body.should.have.property('data');
      res.should.have.status(201);
    });

    it('Should NOT change an account status with invalid acc number', async () => {
      const formData = {
        status: 'dormant',
      };
      const res = await chai.request(server).patch('/api/v1/accounts/54546546544646').set('Authorization', `Bearer ${adminToken}`).send(formData);
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });

  // Test case for deleting an account
  describe('DELETE /api/v1/accounts/:accountNumber', () => {
    it('Should delete an account', async () => {
      const res = await chai.request(server).delete(`/api/v1/accounts/${accNum}`).set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('status');
      res.body.should.have.property('message').eql('Account successfully deleted');
      res.should.have.status(202);
    });

    it('Should NOT delete an invalid acccount', async () => {
      const res = await chai.request(server).delete('/api/v1/accounts/5232').set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
      res.should.have.status(404);
    });
  });
});
