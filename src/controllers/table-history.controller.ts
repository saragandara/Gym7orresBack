import { Request, Response } from 'express';
import TableHistory from '../models/table-history.model';

export const tableHistoryController = {
  // Obtener todos los historiales de tablas
  getAll: async (req: Request, res: Response) => {
    try {
      const tableHistories = await TableHistory.find().sort({ createdAt: -1 });
      res.json(tableHistories);
    } catch (error) {
      console.error('Error getting table histories:', error);
      res.status(500).json({ error: 'Error al obtener los historiales de tablas' });
    }
  },

  // Obtener historial por ID
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tableHistory = await TableHistory.findById(id);
      
      if (!tableHistory) {
        return res.status(404).json({ error: 'Historial de tabla no encontrado' });
      }
      
      res.json(tableHistory);
    } catch (error) {
      console.error('Error getting table history:', error);
      res.status(500).json({ error: 'Error al obtener el historial de tabla' });
    }
  },

  // Crear nuevo historial de tabla
  create: async (req: Request, res: Response) => {
    try {
      const { name, tables } = req.body;

      // Validar datos requeridos
      if (!name) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }

      if (!tables || !Array.isArray(tables)) {
        return res.status(400).json({ error: 'El campo tables debe ser un array' });
      }

      // Validar que todos los elementos del array sean strings
      if (tables.some(table => typeof table !== 'string')) {
        return res.status(400).json({ error: 'Todos los elementos de tables deben ser strings' });
      }

      const tableHistory = new TableHistory({
        name,
        tables
      });

      const savedTableHistory = await tableHistory.save();
      res.status(201).json(savedTableHistory);
    } catch (error) {
      console.error('Error creating table history:', error);
      res.status(500).json({ error: 'Error al crear el historial de tabla' });
    }
  },

  // Actualizar historial de tabla
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, tables } = req.body;

      // Validar que el historial existe
      const tableHistory = await TableHistory.findById(id);
      if (!tableHistory) {
        return res.status(404).json({ error: 'Historial de tabla no encontrado' });
      }

      // Validar datos
      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
          return res.status(400).json({ error: 'El nombre debe ser un string no vacío' });
        }
        tableHistory.name = name;
      }

      if (tables !== undefined) {
        if (!Array.isArray(tables)) {
          return res.status(400).json({ error: 'El campo tables debe ser un array' });
        }
        if (tables.some(table => typeof table !== 'string')) {
          return res.status(400).json({ error: 'Todos los elementos de tables deben ser strings' });
        }
        tableHistory.tables = tables;
      }

      const updatedTableHistory = await tableHistory.save();
      res.json(updatedTableHistory);
    } catch (error) {
      console.error('Error updating table history:', error);
      res.status(500).json({ error: 'Error al actualizar el historial de tabla' });
    }
  },

  // Eliminar historial de tabla
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const tableHistory = await TableHistory.findByIdAndDelete(id);
      
      if (!tableHistory) {
        return res.status(404).json({ error: 'Historial de tabla no encontrado' });
      }
      
      res.json({ 
        message: 'Historial de tabla eliminado correctamente',
        deletedTableHistory: tableHistory
      });
    } catch (error) {
      console.error('Error deleting table history:', error);
      res.status(500).json({ error: 'Error al eliminar el historial de tabla' });
    }
  },

  // Agregar una tabla al array de tables
  addTable: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { table } = req.body;

      if (!table || typeof table !== 'string') {
        return res.status(400).json({ error: 'El campo table es requerido y debe ser un string' });
      }

      const tableHistory = await TableHistory.findById(id);
      
      if (!tableHistory) {
        return res.status(404).json({ error: 'Historial de tabla no encontrado' });
      }

      // Evitar duplicados
      if (tableHistory.tables.includes(table)) {
        return res.status(400).json({ error: 'La tabla ya existe en el historial' });
      }

      tableHistory.tables.push(table);
      const updatedTableHistory = await tableHistory.save();
      
      res.json(updatedTableHistory);
    } catch (error) {
      console.error('Error adding table to history:', error);
      res.status(500).json({ error: 'Error al agregar la tabla al historial' });
    }
  },

  // Eliminar una tabla del array de tables
  removeTable: async (req: Request, res: Response) => {
    try {
      const { id, tableIndex } = req.params;

      const tableHistory = await TableHistory.findById(id);
      
      if (!tableHistory) {
        return res.status(404).json({ error: 'Historial de tabla no encontrado' });
      }

      const index = parseInt(tableIndex);
      
      if (isNaN(index) || index < 0 || index >= tableHistory.tables.length) {
        return res.status(400).json({ error: 'Índice de tabla inválido' });
      }

      tableHistory.tables.splice(index, 1);
      const updatedTableHistory = await tableHistory.save();
      
      res.json(updatedTableHistory);
    } catch (error) {
      console.error('Error removing table from history:', error);
      res.status(500).json({ error: 'Error al eliminar la tabla del historial' });
    }
  }
};
