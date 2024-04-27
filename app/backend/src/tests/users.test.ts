import * as chai from 'chai';
import { app } from '../app';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe('Verifica a rota Login', () => {
  let authToken = '';

  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    authToken = response.body.token;
  });

  it('Verifica se a rota retorna um objeto com token', async function () {
    
    const response = await chai.request(app).post("/login").send(
      { email: 'admin@admin.com', password: 'secret_admin' });
  
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.equal(authToken);
  });

  it('Verifica se a rota retorna um erro quando não há email e senha', async function () {
    
    const response = await chai.request(app).post("/login").send();
    
    expect(response.status).to.equal(400);
    expect(response.body).to.be.an("object");
  });

  it('Verifica se a rota retorna um erro quando a senha for incorreta', async function () {
  
    const response = await chai.request(app).post("/login").send(
      { email: 'admin@admin.com', password: 'sec' });
    
    expect(response.status).to.equal(401);
    expect(response.body).to.be.an("object");
  });

  it('Verifica se a rota retorna um erro quando o email for incorreto', async function () {
    
    const response = await chai.request(app).post("/login").send(
      { email: 'admin@admin.com1', password: 'secret_admin' });
    
    expect(response.status).to.equal(401);
    expect(response.body).to.be.an("object");
  });

  it('Verifica autenticação com token correto', async function () {
    
    const response = await chai.request(app).get("/login/role").set(
      'Authorization', `Bearer ${authToken}`);
    
    expect(response.status).to.equal(200);;
    expect(response.body).to.deep.equal({
      role: 'admin'
    });
  });

  it('Verifica a autenficação sem token', async function () {
  
    const response = await chai.request(app).get("/login/role").set({});
    
    expect(response.status).to.equal(401);;
    expect(response.body).to.deep.equal({
      message: 'Token not found'
    });
  });

  it('Verifica a autenficação com token errado', async function () {
    
    const response = await chai.request(app).get("/login/role").set(
      'Authorization', `Bearer asdfs6546`);
    
    expect(response.status).to.equal(401);;
    expect(response.body).to.deep.equal({
      message: 'Token must be a valid token'
    });
  });
});