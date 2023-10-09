import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import jwtUtil from '../utils/jwt.util';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Rota Matches', () => {
  it('ao fazer requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos', async function() {

  });

  it('ao fazer requisição ao endpoint /leaderboard/home serão retornados os campos e valores corretos, de forma ordenada', async function() {

  });

  it('após acrescentar a partida Corinthians 2 X 1 Internacional e fazer a requisição ao endpoint /leaderboard/home, serão retornados os campos e valores corretos, de forma ordenada', async function() {

  });

  afterEach(sinon.restore);
})
