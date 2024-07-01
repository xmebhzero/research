const request = require('supertest');
const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const globalData = require('../../data/global.js');

describe('Get Project Detail', () => {
  const adminToken = process.env.ADMIN_TOKEN;

  it('Should successfully get project detail', (done) => {
    request(process.env.API_URL)
      .get(`/projects/${globalData.projectId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.code).to.be.equal(200);
        expect(res.body.message).to.be.equal('Success.');
        expect(res.body.data).to.include.all.keys([
          'id',
          'title',
          'objective',
          'type',
          'clientName',
          'clientEmail',
          'companyName',
          'isInternalProject',
          'status',
          'totalStudy',
          'StudyGroups',
        ]);

        done();
      });
  });
});
