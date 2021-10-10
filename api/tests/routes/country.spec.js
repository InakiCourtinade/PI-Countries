/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require("../../src/app.js")
const { conn } = require('../../src/db.js');
const axios = require("axios")


const agent = session(app)


// const getCountry = async()=> await axios.get("http://localhost:3001/countries")

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
});

describe('GET /countries/:id', () => {
  it('should get 200', () =>{
  return agent.get("/countries/ARG")
  .then(res=>{
    expect(res.status).to.equal(200)
  })
  });
  it('should respond with the country with that Id', ()=>{
    return agent.get("/countries/IRL")
  .then(res=>{
    expect(res.body[0].id).to.equal("IRL")
  })
  })
});
