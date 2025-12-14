import { Router } from 'express';
import { tableController } from '../controllers/table.controller';

const router = Router();

router.get('/', tableController.getAll);
router.get('/:id', tableController.getById);
router.post('/', tableController.create);
router.put('/:id', tableController.update);
router.delete('/:id', tableController.delete);

// Rutas para gestionar ejercicios dentro de una tabla
router.post('/:id/exercises', tableController.addExercise);
router.delete('/:id/exercises/:exerciseId', tableController.removeExercise);

export default router;
