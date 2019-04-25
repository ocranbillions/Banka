/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

let adminToken;
let clientToken;
describe('USERS', () => {
  // Get an admin token
  it('login staff', async () => {
    const adminLogin = {
      email: 'mikejones@gmail.com',
      password: 'somesecret',
    };
    const res = await chai.request(server).post('/api/v1/auth/signin').send(adminLogin);
    adminToken = res.body.data.token;
  });
  // Get a client token
  it('login non-staff', async () => {
    const clientLogin = {
      email: 'samo@gmail.com',
      password: 'mysecret',
    };
    const res = await chai.request(server).post('/api/v1/auth/signin').send(clientLogin);
    clientToken = res.body.data.token;
  });

  describe('api/v1/users', () => {
    it('Should get all users', async () => {
      const res = await chai.request(server).get('/api/v1/users/').set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });
    it('Should NOT get access to /users if user is not logged in', async () => {
      const res = await chai.request(server).get('/api/v1/users/');
      res.body.should.have.property('errorMessage').eql('You must be logged in to access this route');
      res.should.have.status(403);
    });
    it('Should NOT authenticate user with invalid token', async () => {
      const res = await chai.request(server).get('/api/v1/users/').set('Authorization', '$INVALIDTOKEN');
      res.body.should.have.property('errorMessage').eql('Invalid token');
      res.should.have.status(401);
    });
    it('Should fail if it lacks valid authentication', async () => {
      const res = await chai.request(server).get('/api/v1/users/').set('Authorization', 'Bearer $sometoken');
      res.body.should.have.property('errorMessage').eql('Auth failed!');
      res.should.have.status(401);
    });

    it('Should deny non-staff', async () => {
      const res = await chai.request(server).get('/api/v1/users/').set('Authorization', `Bearer ${clientToken}`);
      res.body.should.have.property('errorMessage').eql('Clients can\'t access this route');
      res.should.have.status(403);
    });
  });

  it('Should get a single user', async () => {
    const res = await chai.request(server).get('/api/v1/users/1').set('Authorization', `Bearer ${adminToken}`);
    res.body.should.have.property('status');
    res.should.have.status(200);
    res.body.should.have.property('data');
  });


  it('Should accounts owned by a user', async () => {
    const res = await chai.request(server).get('/api/v1/users/joe@gmail.com/accounts').set('Authorization', `Bearer ${adminToken}`);
    res.body.should.have.property('status');
    res.should.have.status(200);
    res.body.should.have.property('data');
  });


  // Test case for creating an user/staff (by Admin)
  let newUserId = 0;
  describe('POST/DELETE /api/v1/users', () => {
    it('Should create a new user/staff', async () => {
      const newStaff = {
        firstName: 'Shola',
        lastName: 'Stevens',
        email: 'shola_steve@gmail.com',
        isAdmin: true,
        password: 'secret',
      };
      const res = await chai.request(server).post('/api/v1/users/').set('Authorization', `Bearer ${adminToken}`).send(newStaff);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(201);
      newUserId = res.body.data.id;
    });

    it('Should not create a new staff if data is incomplete', async () => {
      const newStaff = {
        firstName: '',
        lastName: 'Stevens',
        email: '',
        isAdmin: true,
        password: 'secret',
      };
      const res = await chai.request(server).post('/api/v1/users/').set('Authorization', `Bearer ${adminToken}`).send(newStaff);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });

    it('Should delete a user', async () => {
      const res = await chai.request(server).delete(`/api/v1/users/${newUserId}`).set('Authorization', `Bearer ${adminToken}`);
      res.body.should.have.property('status');
      res.body.should.have.property('message').eql('User successfully deleted');
      res.should.have.status(200);
    });
  });
});
