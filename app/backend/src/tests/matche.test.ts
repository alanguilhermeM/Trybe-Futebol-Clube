import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, isValidToken, matcheById, matchesInProgress, updateReq, createMatch, createdMatch, sameTeamMatch, noTeamMatch} from './mock/matche.mock';
import jwtUtil from '../utils/jwt.util';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Rota Matches', () => {
  it('retorna todas as partidas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('retorna as partidas não finalizadas', async function() {

    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    console.log(body);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });
  
  it('retorna as partidas finalizadas', async function() {

    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    // console.log(body);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  it('Finaliza uma partida', async function() {

    sinon.stub(jwtUtil, 'verify').callsFake(() => isValidToken);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matcheById as any).returnsThis();
    sinon.stub(SequelizeMatch, 'update').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken');
    // console.log(body);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('Não é possivel finalizar uma partida sem o token', async function() {

    sinon.stub(jwtUtil, 'verify').callsFake(() => isValidToken);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matcheById as any).returnsThis();
    sinon.stub(SequelizeMatch, 'update').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1/finish');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('Não é possivel finalizar uma partida sem um token valido', async function() {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matcheById as any).returnsThis();
    sinon.stub(SequelizeMatch, 'update').resolves();

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', 'validToken');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Cria uma partida', async function() {
    // const mockMatche = SequelizeMatch.build(updatedMatch);

    sinon.stub(jwtUtil, 'verify').callsFake(() => isValidToken);
    sinon.stub(SequelizeMatch, 'create').resolves(createdMatch as any);

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 'validToken').send(createMatch);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(createdMatch);
  });

  it('não é possivel criar uma partida com dois times iguais', async function() {
    // const mockMatche = SequelizeMatch.build(updatedMatch);

    sinon.stub(jwtUtil, 'verify').callsFake(() => isValidToken);
    sinon.stub(SequelizeMatch, 'create').resolves();

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 'validToken').send(sameTeamMatch);

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('não é possivel criar uma partida caso algum dos times não esteja cadastrado no banco', async function() {
    // const mockMatche = SequelizeMatch.build(updatedMatch);

    sinon.stub(jwtUtil, 'verify').callsFake(() => isValidToken);
    sinon.stub(SequelizeMatch, 'create').resolves();

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 'validToken').send(noTeamMatch);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });

  afterEach(sinon.restore);
})
