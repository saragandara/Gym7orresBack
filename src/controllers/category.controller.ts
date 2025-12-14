import { Request, Response } from 'express';
import Category from '../models/category.model';
import Exercise from '../models/exercise.model';

export const categoryController = {
  // Obtener todas las categorías
  getAll: async (req: Request, res: Response) => {
    try {
      const categories = await Category.find().sort({ name: 1 });
      res.json(categories);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  },

  // Obtener categoría por ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      
      if (!category) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      
      res.json(category);
    } catch (error) {
      console.error('Error getting category:', error);
      res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  },

  // Crear nueva categoría
  create: async (req: Request, res: Response) => {
    try {
      const { name, color } = req.body;

      // Validar datos
      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }

      const category = new Category({ name, color });
      await category.save();
      
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Error al crear la categoría' });
    }
  },

  // Actualizar categoría
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      if (!name && color === undefined) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar' });
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (color !== undefined) updateData.color = color;

      const category = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!category) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      res.json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  },

  // Eliminar categoría
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const category = await Category.findByIdAndDelete(id);

      if (!category) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      res.json({ message: 'Categoría eliminada correctamente', category });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
  },

  // Eliminar todos los ejercicios asociados a una categoría
  deleteExercisesByCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Verificar que la categoría existe
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      // Eliminar todos los ejercicios asociados a esta categoría
      const result = await Exercise.deleteMany({ categoryId: id });

      res.json({ 
        message: `Se eliminaron ${result.deletedCount} ejercicio(s) de la categoría ${category.name}`,
        deletedCount: result.deletedCount,
        category: {
          _id: category._id,
          name: category.name
        }
      });
    } catch (error) {
      console.error('Error deleting exercises by category:', error);
      res.status(500).json({ error: 'Error al eliminar los ejercicios de la categoría' });
    }
  }
};
