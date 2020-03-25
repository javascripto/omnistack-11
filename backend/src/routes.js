//@ts-check
const { Router } = require('express');

const { OngController, ProfileController, IncidentController, SessionController } = require('./controllers');

const routes = Router();

routes.route('/ongs')
    .get(OngController.index)
    .post(OngController.store);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
