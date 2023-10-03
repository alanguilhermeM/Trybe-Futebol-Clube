import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, matchesInProgress, matchesInProgressDB} from './mock/matche.mock';
import MatcheService from '../services/MatchesService';
import { IMatche2 } from '../Interfaces/matches/IMatche';

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
    console.log(body);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });

  afterEach(sinon.restore);
})
