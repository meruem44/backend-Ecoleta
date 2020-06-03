import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = Router();

import ItemsController from './app/controllers/ItemsControllers';
import PointController from './app/controllers/PointControllers';
import FileController from './app/controllers/ImageUploadController';

routes.get('/items', ItemsController.index);
routes.post('/items',ItemsController.store);

routes.post('/points',PointController.store);
routes.get('/points', PointController.index);
routes.get('/points/:id', PointController.show);
routes.post('/file', multer(multerConfig).single('file'), FileController.store);


export default routes;