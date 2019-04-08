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
    it('Should get all accounts', () => {
      chai.request(server)
        .get('/api/v1/accounts/')
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  // Test case for getting a single account
  describe('GET /api/v1/accounts/:number', () => {
    it('Should get a single account', () => {
      chai.request(server)
        .get('/api/v1/accounts/7785412532')
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });

    it('Should NOT get an invalid account number', () => {
      chai.request(server)
        .get('/api/v1/accounts/77854')
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
          res.should.have.status(404);
        });
    });
  });

  // Test case for creating an account
  describe('POST /api/v1/accounts', () => {
    it('Should create an account', () => {
      const newAccount = {
        firstName: 'Samuel',
        lastName: 'Ocran',
        email: 'sammiestt@gmail.com',
        type: 'savings',
        openingBalance: '67500.00',
      };

      chai.request(server)
        .post('/api/v1/accounts/')
        .send(newAccount)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(201);
        });
    });

    it('Should NOT create an account with incomplete form data', () => {
      const newAccount = {
        firstName: 'Samuel',
        lastName: 'Ocran',
        email: '',
        type: 'savings',
        openingBalance: '67500.00',
      };

      chai.request(server)
        .post('/api/v1/accounts/')
        .send(newAccount)
        .end((err, res) => {
          res.body.should.have.property('errorMessage');
          res.should.have.status(400);
        });
    });
  });

  // Test case for deleting an account
  describe('DELETE /api/v1/accounts/:number', () => {
    it('Should delete an account', () => {
      chai.request(server)
        .delete('/api/v1/accounts/1221125232')
        .end((err, res) => {
          res.body.should.have.property('status');
          res.body.should.have.property('message').eql('Account successfully deleted');
          res.should.have.status(202);
        });
    });

    it('Should NOT delete an invalid acccount', () => {
      chai.request(server)
        .delete('/api/v1/accounts/5232')
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
          res.should.have.status(404);
        });
    })
  });

  // Test case for changing an account status
  describe('PATCH /api/v1/accounts/:number', () => {
    it('Should change an account status', () => {
      const formData = {
        status: 'dormant',
      };
      chai.request(server)
        .patch('/api/v1/accounts/7785412532')
        .send(formData)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('message').eql('Account status succesfully changed');
          res.should.have.status(201);
        });
    });

    it('Should NOT change an account status with invalid acc number', () => {
      const formData = {
        status: 'dormant',
      };
      chai.request(server)
        .patch('/api/v1/accounts/5454654654464654412532')
        .send(formData)
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('The account with the given number was not found');
          res.should.have.status(404);
        });
    });

    it('Account status can only be dormant or active', () => {
      const formData = {
        status: 'other-status',
      };
      chai.request(server)
        .patch('/api/v1/accounts/7785412532')
        .send(formData)
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('Account status can only be \'active\' or \'dormant\'');
          res.should.have.status(401);
        });
    });
  });
});
