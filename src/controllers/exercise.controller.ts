import { Request, Response } from 'express';
import Exercise from '../models/exercise.model';
import Category from '../models/category.model';

export const exerciseController = {
  // Obtener todos los ejercicios
  getAll: async (req: Request, res: Response) => {
    try {
      const exercises = await Exercise.find().sort({ name: 1 });
      res.json(exercises);
    } catch (error) {
      console.error('Error getting exercises:', error);
      res.status(500).json({ error: 'Error al obtener los ejercicios' });
    }
  },

  // Obtener ejercicios por categoría
  getByCategory: async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      const exercises = await Exercise.find({ categoryId }).sort({ name: 1 });
      res.json(exercises);
    } catch (error) {
      console.error('Error getting exercises by category:', error);
      res.status(500).json({ error: 'Error al obtener los ejercicios por categoría' });
    }
  },

  // Obtener ejercicio por ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const exercise = await Exercise.findById(id);
      
      if (!exercise) {
        return res.status(404).json({ error: 'Ejercicio no encontrado' });
      }
      
      res.json(exercise);
    } catch (error) {
      console.error('Error getting exercise:', error);
      res.status(500).json({ error: 'Error al obtener el ejercicio' });
    }
  },

  // Crear nuevo ejercicio
  create: async (req: Request, res: Response) => {
    try {
      const { name, categoryId } = req.body;

      // Validar datos
      if (!name || !categoryId) {
        return res.status(400).json({ error: 'Nombre y categoryId son requeridos' });
      }

      // Verificar que la categoría existe (buscar por _id de MongoDB)
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'La categoría especificada no existe' });
      }

      const exercise = new Exercise({ name, categoryId });
      await exercise.save();
      
      res.status(201).json(exercise);
    } catch (error) {
      console.error('Error creating exercise:', error);
      res.status(500).json({ error: 'Error al crear el ejercicio' });
    }
  },

  // Actualizar ejercicio
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, categoryId } = req.body;

      if (!name && !categoryId) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
      }

      // Si se proporciona categoryId, verificar que existe
      if (categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
          return res.status(400).json({ error: 'La categoría especificada no existe' });
        }
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (categoryId) updateData.categoryId = categoryId;

      const exercise = await Exercise.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!exercise) {
        return res.status(404).json({ error: 'Ejercicio no encontrado' });
      }

      res.json(exercise);
    } catch (error) {
      console.error('Error updating exercise:', error);
      res.status(500).json({ error: 'Error al actualizar el ejercicio' });
    }
  },

  // Eliminar ejercicio
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const exercise = await Exercise.findByIdAndDelete(id);

      if (!exercise) {
        return res.status(404).json({ error: 'Ejercicio no encontrado' });
      }

      res.json({ message: 'Ejercicio eliminado correctamente', exercise });
    } catch (error) {
      console.error('Error deleting exercise:', error);
      res.status(500).json({ error: 'Error al eliminar el ejercicio' });
    }
  }
};
