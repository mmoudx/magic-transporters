import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing a Magic Item document.
 * Extends Mongoose Document.
 */
export interface IMagicItem extends Document {
  name: string;
  weight: number;
}

/**
 * Mongoose schema for Magic Item documents.
 */
const MagicItemSchema: Schema = new Schema<IMagicItem>({
  name: { type: String, required: true },
  weight: { type: Number, required: true }
});

/**
 * Mongoose model for Magic Item documents.
 */
export const MagicItem = model<IMagicItem>('MagicItem', MagicItemSchema);
