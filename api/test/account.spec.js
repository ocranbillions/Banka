/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const PREFIX = '/api/v1';

const should = chai.should();

describe('Account routes', () => {
  describe(`GET ${PREFIX}/accounts`, () => {
    it('Should get all accounts', () => {
      chai.request(server)
        .get(`${PREFIX}/accounts/`)
        .end((err, res) => {
          res.body.should.have.property('data');
          res.body.should.have.property('status').eql('success');
          res.should.have.status(200);
        });
    });
  });

  // describe(`POST ${PREFIX}/accounts`, () => {
  //   it('should post a valid account', () => {
  //     const newAccount = {
  //       accountNumber: 12221333,
  //       firstName: 'Samuel',
  //       lastName: 'Ocran',
  //       email: 'sammiestt@gmail.com',
  //       type: 'savings',
  //       openingBalance: 400000.00,
  //     };

  //     chai.request(server)
  //       .post('/api/v1/accounts/')
  //       .send(newAccount)
  //       .end((err, res) => {
  //         res.body.should.have.property('data');
  //         res.body.should.have.property('status').eql('success');
  //         res.should.have.status(200);
  //       });
  //   });
  // });
});
