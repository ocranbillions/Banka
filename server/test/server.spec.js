/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('TEST ALL /USER ENDPOINTS', () => {
  it('Should get all users', async () => {
    const res = await chai.request(server).get('/');
    res.should.have.status(200);
  });
});
//