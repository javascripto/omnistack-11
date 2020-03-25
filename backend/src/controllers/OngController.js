//@ts-check
const { randomBytes } = require('crypto');
const connection = require('../database/connection');

const index = async (request, response) => {
  const ongs = await connection('ongs').select('*');
  return response.json(ongs);
};

const store = async (request, response) => {
  const id = randomBytes(4).toString('HEX');
  const { name, email, whatsapp, city, uf } = request.body;
  await connection('ongs').insert({ id, name, email, whatsapp, city, uf });
  return response.json({ id });
}

module.exports = {
  index,
  store,
};
