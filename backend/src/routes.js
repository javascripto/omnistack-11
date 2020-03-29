//@ts-check
const { Router } = require('express');

const { RequestValidators } = require('./controllers');
const { OngController, ProfileController, IncidentController, SessionController } = require('./controllers');


const routes = Router();

routes.route('/ongs')
  .get(OngController.index)
  .post(RequestValidators.StoreOngs, OngController.store);

routes.get('/profile', RequestValidators.Profile, ProfileController.index);

routes.post('/sessions', RequestValidators.Session, SessionController.store);

routes.get('/incidents', RequestValidators.Incidents, IncidentController.index);
routes.post('/incidents', RequestValidators.StoreIncident, IncidentController.store);
routes.delete('/incidents/:id', RequestValidators.DeleteIncident, IncidentController.delete);

module.exports = routes;
