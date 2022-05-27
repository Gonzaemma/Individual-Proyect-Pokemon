const { Pokemon, conn } = require('../../src/db.js');

describe("Modelo de pokemon", ()=>{
  beforeAll(()=>conn.authenticate().catch(err => {
    console.error("No se pudo conectar a la database: ", err.message);
  }));
  describe("Validadores", ()=>{
    beforeEach(()=> Pokemon.sync({force: true}));
    describe("name", ()=>{
      it("debería arrojar un error si el name es null.", (done)=>{
        Pokemon.create({}).then(()=> done(new Error("Requiere un nombre válido")))
        .catch(()=>done());
      });
      it("debería funcionar si el nombre es válido", ()=>{
        Pokemon.create({name: "PikaPika"}).catch(err => {
          console.error("Error al crear: formato de instancia de modelo errónea. ",err.message);
        });
      })
    })
  })
})


/* const { expect } = require('chai');





xdescribe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
}); */
