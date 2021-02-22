import { Router } from 'express';

import addCategory from './addCategory';
import getCategories from './getCategories';

const router = Router();

router.get('/', getCategories);
router.post('/', addCategory);

export default router;
