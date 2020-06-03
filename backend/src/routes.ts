import express from 'express'

import ItemController from './app/controllers/ItemController'

const routes = express.Router()

routes.get('/items', ItemController.index);

export default routes;
