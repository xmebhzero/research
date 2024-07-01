const request = require('supertest');
const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const globalData = require('../../data/global.js');
const projectData = require('../../data/project.json');

describe('Create Project', () => {
  const adminToken = process.env.ADMIN_TOKEN;

  it('Should successfully create new Project', (done) => {
    request(process.env.API_URL)
      .post('/projects')
      .send(projectData)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.code).to.be.equal(200);
        expect(res.body.message).to.be.equal('Project created successfully.');
        expect(res.body.data).to.have.property('id');

        // Set ProjectId in globalData so other test can use it
        globalData.projectId = res.body.data.id;

        done();
      });
  });
});
