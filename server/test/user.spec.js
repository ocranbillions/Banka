/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(require('chai-as-promised'));

chai.use(chaiHttp);


const should = chai.should();

describe('TEST ALL /USER ENDPOINTS', () => {
  // Test case for getting all users
  describe('GET /api/v1/users', () => {
    it('Should get all users', async () => {
      const res = await chai.request(server).get('/api/v1/users/');
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(200);
    });
  });

  // Test case for getting a single user
  describe('GET /api/v1/users/:userId', () => {
    it('Should get a single user', async () => {
      const res = await chai.request(server).get('/api/v1/users/1');
      res.body.should.have.property('status');
      res.should.have.status(200);
      res.body.should.have.property('data');
    });
  });

  // // Test case for creating an user/staff (by Admin)
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
      const res = await chai.request(server).post('/api/v1/users/').send(newStaff);
      res.body.should.have.property('data');
      res.body.should.have.property('status');
      res.should.have.status(201);
      newUserId = res.body.data.id;
    });

    it('Should delete a user', async () => {
      const res = await chai.request(server).delete(`/api/v1/users/${newUserId}`);
      res.body.should.have.property('status');
      res.body.should.have.property('message').eql('User successfully deleted');
      res.should.have.status(200);
    });
  });
});
