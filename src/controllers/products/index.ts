import { Router } from 'express';

import getProducts from './getProducts';
import getProductById from './getProductById';
import addProduct from './addProduct';
import updateProduct from './updateProduct';
import deleteProduct from './deleteProduct';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', addProduct);
router.patch('/', updateProduct);
router.delete('/', deleteProduct);

export default router;
