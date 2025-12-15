import mongoose, { Schema, Document } from 'mongoose';

export interface ITableHistory extends Document {
  name: string;
  tables: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TableHistorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  tables: {
    type: [String],
    required: true,
    default: []
  }
}, {
  timestamps: true, // Esto crea automáticamente createdAt y updatedAt
  collection: 'tables_history'
});

// Índices para mejorar el rendimiento
TableHistorySchema.index({ name: 1 });
TableHistorySchema.index({ createdAt: -1 });

export default mongoose.model<ITableHistory>('TableHistory', TableHistorySchema);
