import { Router } from 'express';
import { exerciseController } from '../controllers/exercise.controller';

const router = Router();

router.get('/', exerciseController.getAll);
router.get('/category/:categoryId', exerciseController.getByCategory);
router.get('/:id', exerciseController.getById);
router.post('/', exerciseController.create);
router.put('/:id', exerciseController.update);
router.delete('/:id', exerciseController.delete);

export default router;
