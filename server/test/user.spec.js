/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('TEST ALL /USER ENDPOINTS', () => {
  it('Should get all users', async () => {
    const res = await chai.request(server).get('/api/v1/users/');
    res.body.should.have.property('data');
    res.body.should.have.property('status');
    res.should.have.status(200);
  });


  it('Should get a single user', async () => {
    const res = await chai.request(server).get('/api/v1/users/1');
    res.body.should.have.property('status');
    res.should.have.status(200);
    res.body.should.have.property('data');
  });


  it('Should get a single user', async () => {
    const res = await chai.request(server).get('/api/v1/users/sam@aol.com/accounts');
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
      const res = await chai.request(server).post('/api/v1/users/').send(newStaff);
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
      const res = await chai.request(server).post('/api/v1/users/').send(newStaff);
      res.body.should.have.property('errorMessage');
      res.should.have.status(400);
    });

    it('Should delete a user', async () => {
      const res = await chai.request(server).delete(`/api/v1/users/${newUserId}`);
      res.body.should.have.property('status');
      res.body.should.have.property('message').eql('User successfully deleted');
      res.should.have.status(200);
    });
  });
});
