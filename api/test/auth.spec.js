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
  });
});
