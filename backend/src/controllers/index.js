const { celebrate, Segments, Joi } = require('celebrate');

const RequestValidators = {
  Profile: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),

  StoreOngs: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  }),

  DeleteIncident: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),

  Incidents: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),

  StoreIncident: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),

  Session: celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().required()
    })
  })
}

module.exports = {
  RequestValidators,
  OngController: require('./OngController'),
  ProfileController: require('./ProfileController'),
  SessionController: require('./SessionController'),
  IncidentController: require('./IncidentController'),
};
