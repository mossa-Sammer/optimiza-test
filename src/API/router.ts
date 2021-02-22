import { Router } from 'express';

import { isAuthed } from './middlewares';

import controller from '../controllers/index';

const router = Router();

router.use('/user', controller.authController); // if you have more than login & signup, you need to handle auth there

router.use(isAuthed);

router.get('/upload-image', controller.uploadImage);
router.use('/product', controller.productsController);
router.use('/category', controller.categoriesController);

export default router;
