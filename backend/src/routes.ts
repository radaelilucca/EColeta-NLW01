import express from 'express'

import ItemController from './app/controllers/ItemController'
import PointController from './app/controllers/PointController'


const routes = express.Router()

routes.get('/items', ItemController.index);
routes.post('/points', PointController.store);
routes.get('/points/:id', PointController.show);
routes.get('/points', PointController.index);

export default routes;
