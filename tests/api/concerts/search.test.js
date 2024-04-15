const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model");
const Seat = require("../../../models/seat.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts", () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: "5d9f1140f10a81216cfd4408",
      performer: "U2",
      genre: "rock",
      price: 300,
      day: 1,
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee48",
      performer: "Kult",
      genre: "rock",
      price: 50,
      day: 2,
    });
    await testConcertTwo.save();

    const testConcertTree = new Concert({
      _id: "5d9f1159f84ce8d1ef2bee48",
      performer: "Madonna",
      genre: "pop",
      price: 450,
      day: 3,
    });
    await testConcertTree.save();

    const testSeatOne = new Seat({
      day: 3,
      seat: 49,
      client: "John Doe",
      email: "jphndoe@example.com",
      concert: "5d9f1159f84ce8d1ef2bee48",
    });
    await testSeatOne.save();

    const testSeatTwo = new Seat({
      day: 3,
      seat: 48,
      client: "John Doe",
      email: "jphndoe@example.com",
      concert: "5d9f1159f84ce8d1ef2bee48",
    });
    await testSeatTwo.save();
  });

  it("/ should return all concerts with ticketLeft", async () => {
    const res = await request(server).get("/api/concerts");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.ticketLeft).to.not.be.null;
  });

  it("/:performer should return all concerts by :performer ", async () => {
    const res = await request(server).get("/api/concerts/performer/U2");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(1);
  });

  it("/:genre should return all concerts by :genre ", async () => {
    const res = await request(server).get("/api/concerts/genre/rock");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:price_min/:price_max should return all concerts with price between price_min and price_max ", async () => {
    const res = await request(server).get("/api/concerts/price/200/500");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:day should return all concerts by day ", async () => {
    const res = await request(server).get("/api/concerts/day/3");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(1);
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });
});
