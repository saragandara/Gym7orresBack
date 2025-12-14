import { Request, Response } from 'express';
import Table from '../models/table.model';
import Exercise from '../models/exercise.model';
import Category from '../models/category.model';

export const tableController = {
  // Obtener todas las tablas
  getAll: async (req: Request, res: Response) => {
    try {
      const tables = await Table.find().sort({ name: 1 });
      res.json(tables);
    } catch (error) {
      console.error('Error getting tables:', error);
      res.status(500).json({ error: 'Error al obtener las tablas' });
    }
  },

  // Obtener tabla por ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const table = await Table.findById(id).populate('exercises.exerciseId');
      
      if (!table) {
        return res.status(404).json({ error: 'Tabla no encontrada' });
      }
      
      res.json(table);
    } catch (error) {
      console.error('Error getting table:', error);
      res.status(500).json({ error: 'Error al obtener la tabla' });
    }
  },

  // Crear nueva tabla
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, exercises } = req.body;

      // Validar datos
      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }

      // Si se proporcionan ejercicios, validar que existan
      if (exercises && exercises.length > 0) {
        for (const ex of exercises) {
          if (!ex.exerciseId || ex.order === undefined) {
            return res.status(400).json({ 
              error: 'Cada ejercicio debe tener exerciseId y order' 
            });
          }

          const exerciseExists = await Exercise.findById(ex.exerciseId);
          if (!exerciseExists) {
            return res.status(400).json({ 
              error: `El ejercicio con ID ${ex.exerciseId} no existe` 
            });
          }

          // Validar longitud de name si se proporciona
          if (ex.name && (ex.name.length < 1 || ex.name.length > 200)) {
            return res.status(400).json({ 
              error: 'El nombre del ejercicio debe tener entre 1 y 200 caracteres' 
            });
          }

          // Validar longitud de color si se proporciona
          if (ex.color && ex.color.length > 20) {
            return res.status(400).json({ 
              error: 'El color debe tener máximo 20 caracteres' 
            });
          }

          // Si se proporciona categoryId, validar que existe
          if (ex.categoryId) {
            const categoryExists = await Category.findById(ex.categoryId);
            if (!categoryExists) {
              return res.status(400).json({ 
                error: `La categoría con ID ${ex.categoryId} no existe` 
              });
            }
          }
        }
      }

      const table = new Table({ 
        name, 
        description,
        exercises: exercises || []
      });
      await table.save();
      
      res.status(201).json(table);
    } catch (error) {
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Error al crear la tabla' });
    }
  },

  // Actualizar tabla
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, exercises } = req.body;

      if (!name && !description && !exercises) {
        return res.status(400).json({ 
          error: 'Debe proporcionar al menos un campo para actualizar' 
        });
      }

      // Si se actualizan ejercicios, validar que existan
      if (exercises) {
        for (const ex of exercises) {
          if (!ex.exerciseId || ex.order === undefined) {
            return res.status(400).json({ 
              error: 'Cada ejercicio debe tener exerciseId y order' 
            });
          }

          const exerciseExists = await Exercise.findById(ex.exerciseId);
          if (!exerciseExists) {
            return res.status(400).json({ 
              error: `El ejercicio con ID ${ex.exerciseId} no existe` 
            });
          }

          // Validar longitud de name si se proporciona
          if (ex.name && (ex.name.length < 1 || ex.name.length > 200)) {
            return res.status(400).json({ 
              error: 'El nombre del ejercicio debe tener entre 1 y 200 caracteres' 
            });
          }

          // Validar longitud de color si se proporciona
          if (ex.color && ex.color.length > 20) {
            return res.status(400).json({ 
              error: 'El color debe tener máximo 20 caracteres' 
            });
          }

          // Si se proporciona categoryId, validar que existe
          if (ex.categoryId) {
            const categoryExists = await Category.findById(ex.categoryId);
            if (!categoryExists) {
              return res.status(400).json({ 
                error: `La categoría con ID ${ex.categoryId} no existe` 
              });
            }
          }
        }
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (exercises) updateData.exercises = exercises;

      const table = await Table.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!table) {
        return res.status(404).json({ error: 'Tabla no encontrada' });
      }

      res.json(table);
    } catch (error) {
      console.error('Error updating table:', error);
      res.status(500).json({ error: 'Error al actualizar la tabla' });
    }
  },

  // Eliminar tabla
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const table = await Table.findByIdAndDelete(id);

      if (!table) {
        return res.status(404).json({ error: 'Tabla no encontrada' });
      }

      res.json({ message: 'Tabla eliminada correctamente', table });
    } catch (error) {
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Error al eliminar la tabla' });
    }
  },

  // Agregar ejercicio a una tabla
  addExercise: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { exerciseId, order, name, color, categoryId } = req.body;

      if (!exerciseId || order === undefined) {
        return res.status(400).json({ 
          error: 'exerciseId y order son requeridos' 
        });
      }

      // Verificar que el ejercicio existe
      const exerciseExists = await Exercise.findById(exerciseId);
      if (!exerciseExists) {
        return res.status(400).json({ error: 'El ejercicio no existe' });
      }

      // Validar longitud de name si se proporciona
      if (name && (name.length < 1 || name.length > 200)) {
        return res.status(400).json({ 
          error: 'El nombre del ejercicio debe tener entre 1 y 200 caracteres' 
        });
      }

      // Validar longitud de color si se proporciona
      if (color && color.length > 20) {
        return res.status(400).json({ 
          error: 'El color debe tener máximo 20 caracteres' 
        });
      }

      // Si se proporciona categoryId, validar que existe
      if (categoryId) {
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
          return res.status(400).json({ error: 'La categoría no existe' });
        }
      }

      const table = await Table.findById(id);
      if (!table) {
        return res.status(404).json({ error: 'Tabla no encontrada' });
      }

      // Agregar el ejercicio
      table.exercises.push({ exerciseId, order, name, color, categoryId });
      await table.save();

      res.json(table);
    } catch (error) {
      console.error('Error adding exercise to table:', error);
      res.status(500).json({ error: 'Error al agregar ejercicio a la tabla' });
    }
  },

  // Eliminar ejercicio de una tabla
  removeExercise: async (req: Request, res: Response) => {
    try {
      const { id, exerciseId } = req.params;

      const table = await Table.findById(id);
      if (!table) {
        return res.status(404).json({ error: 'Tabla no encontrada' });
      }

      // Filtrar el ejercicio a eliminar
      table.exercises = table.exercises.filter(
        ex => ex.exerciseId.toString() !== exerciseId
      );
      await table.save();

      res.json(table);
    } catch (error) {
      console.error('Error removing exercise from table:', error);
      res.status(500).json({ error: 'Error al eliminar ejercicio de la tabla' });
    }
  }
};
