/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();
let adminToken;
let newUserId;
const adminLogin = {
  email: 'mikejones@gmail.com',
  password: 'somesecret',
};

describe('AUTH', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(adminLogin)
      .end((err, res) => {
        if (err) done(err);
        adminToken = res.body.data.token;
        done();
      });
  });
  after((done) => {
    chai.request(server)
      .delete(`/api/v1/users/${newUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });

  describe('/api/v1/auth/signup', () => {
    it('Should register a new user', async () => {
      const signupDetails = {
        firstName: 'Michael',
        lastName: 'Bridges',
        email: 'michaelbridges2019@yahoo.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.body.should.have.property('data');
      res.body.data.should.have.property('email').eql('michaelbridges2019@yahoo.com');
      res.body.data.should.have.property('token');
      res.should.have.status(201);
      newUserId = res.body.data.id;
    });

    it('Should NOT register a user if email exists', async () => {
      const signupDetails = {
        firstName: 'Edward',
        lastName: 'Smart',
        email: 'edd@yahoo.com',
        password: 'eddeddy',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.should.have.status(409);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.equal('Email already used');
    });
    it('Should NOT register user with incomplete form data', async () => {
      const signupDetails = {
        firstName: '',
        lastName: 'Bridges',
        email: 'mikeBrid@gmail.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[0].should.equal('name requires alphabets only - min(2)');
    });
    it('Should NOT register user with incorrect form data', async () => {
      const signupDetails = {
        firstName: '   ',
        lastName: '12345',
        email: 'mik.com',
        password: 'secretMike',
      };
      const res = await chai.request(server).post('/api/v1/auth/signup').send(signupDetails);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[2].should.equal('provide a valid email');
    });
  });

  describe('/api/v1/auth/signin', () => {
    it('Should signin a user', async () => {
      const loginDetails = {
        email: 'samo@gmail.com',
        password: 'mysecret',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.should.have.status(201);
      res.body.should.have.property('data');
      res.body.data.email.should.equal('samo@gmail.com');
      res.body.data.should.have.property('token');
    });

    it('Should NOT signin a user with incorrect login details', async () => {
      const loginDetails = {
        email: 'samo@gmail.com',
        password: 'incorrect-password',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.equal('Incorrect login information');
    });

    it('Should NOT signin with incomplete form data', async () => {
      const loginDetails = {
        email: '',
        password: '',
      };
      const res = await chai.request(server).post('/api/v1/auth/signin').send(loginDetails);
      res.should.have.status(400);
      res.body.should.have.property('errorMessage');
      res.body.errorMessage.should.be.a('array');
      res.body.errorMessage[0].should.equal('provide a valid email');
      res.body.errorMessage[1].should.equal('"password" is not allowed to be empty');
    });
  });
});
