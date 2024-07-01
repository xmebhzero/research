const request = require("supertest");
const expect = require('chai').expect;
const globalData = require('../mock/data/global.js');
const userAuthData = require('../mock/data/userAuth.json');

describe('Restful Booker API Tests', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com';
  var token;

  it('Should login successfully', (done) => {
    request(baseUrl)
      .post('/auth')
      .send(userAuthData)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.token).not.to.be.null;

        globalData.token = res.body.token;

        if (err) {
          console.error(err);
        }

        done();
      });
  });
});