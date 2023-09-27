// tests/integration/Book.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mock/team.mock';
// import Validations from '../../src/middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Books Test', function() {
  it('retorna todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

//   it('should return a book by id', async function() {
//     sinon.stub(SequelizeBook, 'findOne').resolves(book as any);

//     const { status, body } = await chai.request(app).get('/books/1');

//     expect(status).to.equal(200);
//     expect(body).to.deep.equal(book);
//   });

//   it('should return not found if the book doesn\'t exists', async function() {
//     sinon.stub(SequelizeBook, 'findOne').resolves(null);

//     const { status, body } = await chai.request(app).get('/books/1');

//     expect(status).to.equal(404);
//     expect(body.message).to.equal('Book 1 not found');
//   });
  afterEach(sinon.restore);
});