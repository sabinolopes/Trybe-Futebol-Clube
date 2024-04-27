import * as sinon from 'sinon';
import * as chai from 'chai';
import TeamsModel from '../database/models/TeamsModelSequelize'
import teamsMock, { teamByIdMock, teamIdErrorMock } from './mocks/teamsMocks';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe('Verifica a rota Teams', () => {
  beforeEach(function () { sinon.restore(); });
  it('Verifica se a rota "/teams" retorna todos os times', async function () {
  
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);
    
    const response = await chai.request(app).get("/teams");
    
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
  it('Verifica se a rota "/teams/:id" retorna 1 time', async function () {
   
    sinon.stub(TeamsModel, 'findByPk').withArgs(1).resolves(teamByIdMock as any);
    
    const response = await chai.request(app).get("/teams/1");
  
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamByIdMock);

    
    const errorResponse = await chai.request(app).get("/teams/2");
    
    expect(errorResponse.status).to.equal(400);
    expect(errorResponse.body).to.deep.equal(teamIdErrorMock);

  });
});