import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITableExercise {
  exerciseId: Types.ObjectId;
  order: number;
  name?: string;
  color?: string;
  categoryId?: Types.ObjectId;
}

export interface ITable extends Document {
  name: string;
  description?: string;
  exercises: ITableExercise[];
}

const TableExerciseSchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Exercise'
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  name: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  color: {
    type: String,
    trim: true,
    maxlength: 20
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { _id: false });

const TableSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  exercises: {
    type: [TableExerciseSchema],
    required: true,
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<ITable>('Table', TableSchema);
