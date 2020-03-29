//@ts-check
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp:  '47000000000',
        city: 'Rio do Sul',
        uf: 'SC',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to create an ONG, incident and read the incidents created', async () => {
    const createOngPayload = {
      name: 'APAD',
      email: 'contato@apad.com.br',
      whatsapp:  '47000000000',
      city: 'Rio do Sul',
      uf: 'SC',
    };
    const createIncidentPayload = {
      value: 0,
      title: 'Titulo',
      description: 'Descricao',
    };

    const createOngResponse = await request(app)
      .post('/ongs')
      .send(createOngPayload);

    const createIncidentResponse = await request(app)
      .post('/incidents')
      .set('Authorization', createOngResponse.body.id)
      .send(createIncidentPayload);

    const profileIncidentsResponse = await request(app)
      .get('/profile')
      .set('Authorization', createOngResponse.body.id)
      .send();


    const expectedProfileResponse = [{
      id: 1,
      ...createIncidentPayload,
      ong_id: createOngResponse.body.id
    }];

    expect(profileIncidentsResponse.body).toEqual(expectedProfileResponse);
  })
});
