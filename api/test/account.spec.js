/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const PREFIX = '/api/v1';

const should = chai.should();

describe('TEST ALL ACCOUNT ENDPOINTS', () => {
  // Test case for getting all accounts
  describe(`GET ${PREFIX}/accounts`, () => {
    it('Should get all accounts', () => {
      chai.request(server)
        .get(`${PREFIX}/accounts/`)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  // Test case for getting a single account
  describe(`GET ${PREFIX}/accounts/acct_number`, () => {
    it('Should get a single account', () => {
      chai.request(server)
        .get(`${PREFIX}/accounts/7785412532`)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  // Test case for creating an account
  describe(`POST ${PREFIX}/accounts`, () => {
    it('Should create an account', () => {
      const newAccount = {
        accountNumber: 2541236521,
        firstName: 'Samuel',
        lastName: 'Ocran',
        email: 'sammiestt@gmail.com',
        type: 'savings',
        openingBalance: 67500.00,
        createdOn: '22-02-2019 10:53:58',
        status: 'active',
      };

      chai.request(server)
        .post('/api/v1/accounts/')
        .send(newAccount)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  // // Delete an account
  // describe(`DELETE ${PREFIX}/accounts/:acct_number`, () => {
  //   it('Should delete a valid account', () => {
  //     chai.request(server)
  //       .delete('/api/v1/accounts/1221125232')
  //       .end((err, res) => {
  //         res.body.should.have.property('status');
  //         res.body.should.have.property('message').eql('Account successfully deleted');
  //         res.should.have.status(200);
  //       });
  //   });
  // });

  // // Change account status
  // describe(`PATCH ${PREFIX}/accounts/:acct_number`, () => {
  //   it('Should change an account status', () => {
  //     const acct = {
  //       accountNumber: 7785412532,
  //       status: 'active',
  //     };
  //     chai.request(server)
  //       .patch('/api/v1/accounts/7785412532')
  //       .send(acct)
  //       .end((err, res) => {
  //         res.body.should.have.property('data');
  //         res.body.should.have.property('status');
  //         res.should.have.status(200);
  //       });
  //   });
  // });
});
