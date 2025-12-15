import { Router } from 'express';
import { tableHistoryController } from '../controllers/table-history.controller';

const router = Router();

// CRUD básico
router.get('/', tableHistoryController.getAll);
router.get('/:id', tableHistoryController.getById);
router.post('/', tableHistoryController.create);
router.put('/:id', tableHistoryController.update);
router.delete('/:id', tableHistoryController.delete);

// Operaciones sobre el array de tables
router.post('/:id/tables', tableHistoryController.addTable);
router.delete('/:id/tables/:tableIndex', tableHistoryController.removeTable);

export default router;
