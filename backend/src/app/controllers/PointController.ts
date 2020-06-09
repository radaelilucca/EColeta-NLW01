import knex from '../../database/connection'
import { Request, Response, request} from 'express'

class Point {
  async store(req: Request, res: Response){

    const trx = await knex.transaction()

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
      image: req.file.filename,  
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(point).returning('id')

    const point_id = insertedIds[0]

    const pointItems = items
    .split(',')
    .map((item: string) => Number(item.trim()))
    .map((item_id: number) =>
      {
        return {
          item_id,
          point_id
        }
      })



    await trx('point_items').insert(pointItems)

    await trx.commit()


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
   
   const serializedPoint = {    
    ...point,        
    image_url: `${process.env.API_URL}/uploads/${point.image}`    
  }

   const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id')
   .where('point_items.point_id', id).select('items.title')

  

   return res.json({point: serializedPoint, items})
  }

  async index(req: Request, res: Response){
    //Cidade, UF, items
    const {city, uf, items} = req.query;

    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item.trim()));

    const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...point,        
        image_url: `${process.env.API_URL}/uploads/${point.image}`
      }
    })

   

    return res.json(serializedPoints)
  }

  
}

export default new Point()