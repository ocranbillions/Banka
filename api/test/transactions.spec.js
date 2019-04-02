/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();

describe('TEST ALL TRANSACTIONS ENDPOINTS', () => {
  // Test case for getting all transactions
  describe('GET transactions/', () => {
    it('Should get all transactions', () => {
      chai.request(server)
        .get('/api/v1/transactions/')
        .end((err, res) => {
          res.body.should.have.property('data');
          res.should.have.status(200);
        });
    });
  });

  // Test case to get all transactions for a specific account
  describe('GET /api/v1/transactions/:number', () => {
    it('Should get all transaction for an account', () => {
      chai.request(server)
        .get('/api/v1/transactions/7785412532')
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  describe('POST transactions/:number/credit', () => {
    it('Should be able to credit an account', () => {
      const transaction = {
        amount: 2500,
        transactionType: 'credit',
        cashier: 5,
      };
      chai.request(server)
        .post('/api/v1/transactions/9586523412/credit')
        .send(transaction)
        .end((err, res) => {
          res.body.should.have.property('data');
          // res.body.data.should.have.property('newBalance');
          res.should.have.status(201);
        });
    });
  });


  describe('POST transactions/:number/debit', () => {
    it('Should be able to debit an account', () => {
      const transaction = {
        amount: 12000,
        transactionType: 'debit',
        cashier: 5,
      };
      chai.request(server)
        .post('/api/v1/transactions/7785412532/debit')
        .send(transaction)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.data.should.have.property('amount').eql(12000);
          res.should.have.status(201);
        });
    });

    it('Should NOT BE able to debit an account with insufficient funds', () => {
      const transaction = {
        amount: 1000000,
        transactionType: 'debit',
        cashier: 2,
      };
      chai.request(server)
        .post('/api/v1/transactions/5623541235/debit')
        .send(transaction)
        .end((err, res) => {
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('You don not have sufficient funds for this transaction.');
          res.should.have.status(406);
        });
    });
  });
});
