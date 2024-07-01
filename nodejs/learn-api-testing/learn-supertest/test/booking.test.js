const request = require("supertest");
const expect = require('chai').expect;
const globalData = require('../mock/data/global.js');
const bookingData = require('../mock/data/booking.json');
const updatedBookingData = require('../mock/data/updatedBooking.json');

describe('Restful Booker API Tests', () => {
  const baseUrl = 'https://restful-booker.herokuapp.com';
  var bookingId;

  it('Should succesfully create a new booking', (done) => {
    request(baseUrl)
      .post("/booking")
      .send(bookingData)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);

        bookingId = res.body.bookingid;

        done();
      });
  });

  it('Should successfully update previous booking', (done) => {
    console.log(`🚀 ~ it ~ globalData.token:`, globalData.token);

    request(baseUrl)
      .put(`/booking/${bookingId}`)
      .send(updatedBookingData)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Cookie', `token=${globalData.token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.totalprice).to.be.equal(updatedBookingData.totalprice);
        expect(res.body.bookingdates.checkin).to.be.equal(updatedBookingData.bookingdates.checkin);
        expect(res.body.bookingdates.checkout).to.be.equal(updatedBookingData.bookingdates.checkout);

        done();
      });
  });
});