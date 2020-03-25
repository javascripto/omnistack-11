//@ts-check
const connection = require('../database/connection');

class SessionController {
  static async store(request, response) {
    const ong = await connection('ongs')
      .where('id', request.body.id)
      .select('name')
      .first();

    if (!ong)
      return response.status(404).json('Not found')

    return response.json(ong);
  }
}

module.exports = SessionController;
