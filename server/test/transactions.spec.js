/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

let staffToken;
describe('TEST ALL TRANSACTIONS ENDPOINTS', () => {
  it('login staff', async () => {
    const staffLogin = {
      email: 'mikejones@gmail.com',
      password: 'somesecret',
    };
    const res = await chai.request(server).post('/api/v1/auth/signin').send(staffLogin);
    staffToken = res.body.data.token;
  });

  it('Should get all transactions', async () => {
    const res = await chai.request(server).get('/api/v1/transactions/').set('Authorization', `Bearer ${staffToken}`);
    res.body.should.have.property('data');
    res.should.have.status(200);
  });

  it('Should get all transaction for an account', async () => {
    const res = await chai.request(server).get('/api/v1/transactions/1').set('Authorization', `Bearer ${staffToken}`);
    res.body.should.have.property('data');
    res.body.data[0].should.have.property('type');
    res.body.should.have.property('status');
    res.should.have.status(200);
  });

  it('Should be able to credit an account', async () => {
    const transaction = {
      type: 'credit',
      amount: 10000,
      cashier: 3,
    };
    const res = await chai.request(server).post('/api/v1/transactions/5421214520/credit').set('Authorization', `Bearer ${staffToken}`).send(transaction);
    res.body.should.have.property('data');
    res.should.have.status(201);
  });

  it('Should be able to debit an account', async () => {
    const transaction = {
      type: 'debit',
      amount: 500,
      cashier: 3,
    };
    const res = await chai.request(server).post('/api/v1/transactions/4194194410/debit').set('Authorization', `Bearer ${staffToken}`).send(transaction);
    res.body.should.have.property('data');
    res.should.have.status(201);
  });

  it('Should not make a transaction if data is incomplete', async () => {
    const transaction = {
      type: '',
      amount: 500,
      cashier: 3,
    };
    const res = await chai.request(server).post('/api/v1/transactions/9562021478/credit').set('Authorization', `Bearer ${staffToken}`).send(transaction);
    res.body.should.have.property('errorMessage');
    res.should.have.status(400);
  });
});
