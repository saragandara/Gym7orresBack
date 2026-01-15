import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  categoryId: Types.ObjectId;
  repeticiones?: string;
}

const ExerciseSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  repeticiones: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
