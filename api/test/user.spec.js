/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const should = chai.should();

describe('TEST ALL /USER ENDPOINTS', () => {
  // Test case for getting all users
  describe('GET /api/v1/users', () => {
    it('Should get all users', () => {
      chai.request(server)
        .get('/api/v1/users/')
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.should.have.status(200);
        });
    });
  });

  // Test case for getting a single user
  // describe('GET /api/v1/users/:userId', () => {
  //   it('Should get a single user', () => {
  //     chai.request(server)
  //       .get('/api/v1/users/1')
  //       .end((err, res) => {
  //         res.body.should.have.property('data');
  //         res.body.should.have.property('status');
  //         res.should.have.status(200);
  //       });
  //   });
  // });

  // // Test case for creating an user/staff (by Admin)
  // describe('POST /api/v1/users', () => {
  //   it('Should create a new user/staff', () => {
  //     const newStaff = {
  //       firstName: 'Shola',
  //       lastName: 'Stevens',
  //       email: 'shola_steve@gmail.com',
  //       type: 'staff',
  //       password: 'secret',
  //       isAdmin: 1,
  //     };

  //     chai.request(server)
  //       .post('/api/v1/users/')
  //       .send(newStaff)
  //       .end((err, res) => {
  //         res.body.should.have.property('data');
  //         res.body.should.have.property('status');
  //         res.should.have.status(201);
  //       });
  //   });
  // });

  // // Test case for deleting a user
  // describe('DELETE /api/v1/users/:userId', () => {
  //   it('Should delete a user', () => {
  //     chai.request(server)
  //       .delete('/api/v1/users/2')
  //       .end((err, res) => {
  //         res.body.should.have.property('status');
  //         res.body.should.have.property('message').eql('User successfully deleted');
  //         res.should.have.status(202);
  //       });
  //   });
  // });
});
