import knex from '../../database/connection'


class ItemController {
  async index(req, res) {

    const items = await knex('items').select('*')
    return res.json(items)
  }
}

export default new ItemController()