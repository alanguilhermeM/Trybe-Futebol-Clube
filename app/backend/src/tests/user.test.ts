// tests/integration/Book.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import { user, token, login, loginWithNoEmail, loginWithWrongEmail, loginWithNoPass } from './mock/user.mock';
import jwtUtil from '../utils/jwt.util';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('User Test', function() {
  it('Retorna um token ao realizar login', async function() {
    const UserMock = SequelizeUser.build(user);

    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(SequelizeUser, 'findOne').resolves(UserMock);
    sinon.stub(jwtUtil, 'sign').returns(token.token);

      // Act
      const httpResponse = await chai.request(app).post('/login').send(login);

      // Assert
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal(token);
  });

  it('Retorna erro ao inserir um email inexistente', async function() {
    // const UserMock = SequelizeUser.build(user);
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // Act
    const httpResponse = await chai.request(app).post('/login').set('authorization', 'validToken')
    .send(loginWithWrongEmail);

      // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna erro ao não inserir um email', async function() {
    // const UserMock = SequelizeUser.build(user);
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // Act
    const httpResponse = await chai.request(app).post('/login').set('authorization', 'validToken')
    .send(loginWithNoEmail);

      // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Retorna erro ao não inserir uma senha', async function() {
    // const UserMock = SequelizeUser.build(user);
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
      // Act
    const httpResponse = await chai.request(app).post('/login').set('authorization', 'validToken')
    .send(loginWithNoPass);

      // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  afterEach(sinon.restore);
});