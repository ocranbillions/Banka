/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();

describe('TEST CASE FOR AUTH ROUTES', () => {
  // Test-case for registering new user
  describe('POST /api/v1/auth/signup', () => {
    let mikeEmail = Math.random().toString(36).substring(9);
    mikeEmail += '@gmail.com';
    it('Should register a new user', async () => {
      const signupDetails = {
        firstName: 'Michael',
        lastName: 'Bridges',
        email: mikeEmail,
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.body.should.have.property('data');
      res.body.data.should.have.property('email').eql(mikeEmail);
      res.body.data.should.have.property('token');
      res.should.have.status(201);
    });

    it('Should NOT register user with incomplete form data', async () => {
      const signupDetails = {
        firstName: '',
        lastName: 'Bridges',
        email: 'mikeBrid@gmail.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });
  });

  // Test-case for signin in a user
  describe('POST /api/v1/auth/signin', () => {
    it('Should signin a user', async () => {
      const loginDetails = {
        email: 'samo@gmail.com',
        password: 'mysecret',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.body.should.have.property('data');
      res.body.data.should.have.property('email').eql('samo@gmail.com');
      res.body.data.should.have.property('token');
      res.should.have.status(201);
    });

    it('Should NOT signin a user with incorrect login details', async () => {
      const loginDetails = {
        email: 'samo@gmail.com',
        password: '663888',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.body.should.have.property('errorMessage').eql('Incorrect login information');
      res.should.have.status(400);
    });

    it('Should NOT signin with incomplete form data', async () => {
      const loginDetails = {
        email: '',
        password: '',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });
  });
});
