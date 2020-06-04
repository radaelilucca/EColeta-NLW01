import knex from '../../database/connection'
import { Request, Response} from 'express'

class Point {
  async store(req: Request, res: Response){

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const point = {
      image: 'image-fake',  
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await knex('points').insert(point).returning('id')

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id: number) =>
      {
        return {
          item_id,
          point_id
        }
      })



    await knex('point_items').insert(pointItems)


    return res.json({
      id: point_id,
      ...point,

    })
  }

  async show(req: Request, res: Response){
    const {id} = req.params;

   const point = await knex('points').select('*').where(
     'id', id,
   ).first()

   if(!point) {
     return res.status(404).json({error: 'Point not found - check the ID and try again'})
   }

   return res.json(point)
  }

  
}

export default new Point()