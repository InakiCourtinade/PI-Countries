const { Country,  conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    describe('Country model', async ()=> {
      
      it('should contain attributes: id, name, image, region, subregion, capital and area', 
      async () => {
        const country = await Country.findOne({where:{id: 'ARG'}});
        expect(country.dataValues).to.have.own.property('id');
        expect(country.dataValues).to.have.own.property('name');
        expect(country.dataValues).to.have.own.property('image');
        expect(country.dataValues).to.have.own.property('continent');
        expect(country.dataValues).to.have.own.property('subregion');
        expect(country.dataValues).to.have.own.property('capital');
        expect(country.dataValues).to.have.own.property('area');
      });
     
      it('attribute name must be a string', async () => {
        const country = await Country.findOne({where:{id: 'ARG'}});
        expect(country.dataValues.name).to.be.a('string')
      })
    })
});
