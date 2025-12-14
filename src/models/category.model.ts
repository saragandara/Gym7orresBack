import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  color?: string;
}

const CategorySchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    maxlength: 20
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model<ICategory>('Category', CategorySchema);
