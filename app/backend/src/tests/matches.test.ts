import * as sinon from 'sinon';
import * as chai from 'chai';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';
import matchesMock from './mocks/matchesMocks';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe('Verifica a rota "/matches"', () => {
  let authToken = '';

  beforeEach(function () { sinon.restore(); });

  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    authToken = response.body.token;
  });

  it('Verifica se a rota retorna todas partidas', async function () {
    
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock as any);
    
    const response = await chai.request(app).get("/matches");
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesMock);
  });

  it('Verifica se a rota "/matches?inProgress=true" retorna todas partidas em progresso', async function () {
    
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock as any);
    
    const response = await chai.request(app).get("/matches?inProgress=true");
    
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].inProgress).to.be.true;
  });

  it('Verifica se a rota "/matches?inProgress=false" responde todas partidas finalizadas', async function () {
    
    sinon.stub(MatchesModelSequelize, 'findAll').resolves(matchesMock as any);
    
    const response = await chai.request(app).get("/matches?inProgress=false");
    
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].inProgress).to.be.false;
  });

  it('Verifica se a rota "/matches/1/finish retorna como esperado', async function () {
    
    const response = await chai.request(app).patch("/matches/1/finish ").set(
      'Authorization', `Bearer ${authToken}`);
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: "Finished"
    });
  });

  it('Verifica se a rota "/matches/99/finish retorna como esperado', async function () {
    
    const response = await chai.request(app).patch("/matches/99/finish ").set(
      'Authorization', `Bearer ${authToken}`);
    
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "Invalid id"
    });
  });

  it('Verifica se a rota "/matches/1/finish", sem token, retorna como esperado', async function () {
    
    const response = await chai.request(app).patch("/matches/1/finish ")
    
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: "Token not found"
    });
  });

  it('Verifica se a rota "/matches/1" retorna como esperado', async function () {
    
    const response = await chai.request(app).patch("/matches/1").set(
      'Authorization', `Bearer ${authToken}`).send({ homeTeamGoals: 2, awayTeamGoals: 0 });
    
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "Must be a game in progress"
    });
  });

  it('Verifica se a rota "/matches/48" retorna como esperado', async function () {
    
    const response = await chai.request(app).patch("/matches/48").set(
      'Authorization', `Bearer ${authToken}`).send({ homeTeamGoals: 2, awayTeamGoals: 2 });
    
    expect(response.status).to.equal(200);
    expect(response.body).to.an('object');
  });
});