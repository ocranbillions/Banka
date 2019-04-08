/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();

describe('TEST CASE FOR AUTH ROUTES', () => {
  // Test-case for signin in a user
  describe('POST /api/v1/auth/signin', () => {
    it('Should signin a user', () => {
      const loginDetails = {
        email: 'wasboy@yahoo.com',
        password: 'wasboy123',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(loginDetails)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.data.should.have.property('email').eql('wasboy@yahoo.com');
          res.body.data.should.have.property('token');
          res.should.have.status(201);
        });
    });

    it('Should NOT signin a user with incorrect login details', () => {
      const loginDetails = {
        email: 'wasboy@yahoo.com',
        password: '663888',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(loginDetails)
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('Incorrect login information');
          res.should.have.status(406);
        });
    });

    it('Should NOT signin with incomplete form data', () => {
      const loginDetails = {
        email: 'daniel@yahoo.com',
        password: '',
      };

      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(loginDetails)
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('Both fields must be filled');
          res.should.have.status(400);
        });
    });
  });

  // Test-case for registering new user
  describe('POST /api/v1/auth/signup', () => {
    it('Should register a new user', () => {
      const signupDetails = {
        firstName: 'Michael',
        lastName: 'Bridges',
        email: 'mikeBrid@gmail.com',
        password: 'secretMike',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.data.should.have.property('email').eql('mikeBrid@gmail.com');
          res.body.data.should.have.property('token');
          res.should.have.status(201);
        });
    });

    it('Should not register a user if email already exit', () => {
      const signupDetails = {
        firstName: 'Williams',
        lastName: 'Boyega',
        email: 'wasboy@yahoo.com',
        password: 'williamB',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.body.should.have.property('errorMessage').eql('Email already taken');
          res.should.have.status(406);
        });
    });

    it('Should NOT register user with incomplete form data', () => {
      const signupDetails = {
        firstName: '',
        lastName: 'Bridges',
        email: 'mikeBrid@gmail.com',
        password: 'secretMike',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signupDetails)
        .end((err, res) => {
          res.body.should.have.property('errorMessage');
          res.should.have.status(400);
        });
    });
  });
});
