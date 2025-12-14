import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';

const router = Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

// Ruta para eliminar ejercicios de una categoría
router.delete('/:id/exercises', categoryController.deleteExercisesByCategory);

export default router;
