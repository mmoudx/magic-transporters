import { Schema, model, Document, Types } from 'mongoose';

/**
 * Interface representing a Magic Mover document.
 * Extends Mongoose Document.
 */
export interface IMagicMover extends Document {
  name: string;
  weightLimit: number;
  questState: 'resting' | 'loading' | 'on-mission';
  completedMissions: number;
  loadedItems: Array<{ item: Types.ObjectId}>;
}

/**
 * Mongoose schema for Magic Mover documents.
 */
const MagicMoverSchema = new Schema<IMagicMover>({
  name: { type: String, required: true },
  weightLimit: { type: Number, required: true },
  questState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting' },
  completedMissions: { type: Number, default: 0 },
  loadedItems: [{ item: { type: Schema.Types.ObjectId, ref: 'MagicItem' }}]
});

/**
 * Mongoose model for Magic Mover documents.
 */
export const MagicMover = model<IMagicMover>('MagicMover', MagicMoverSchema);
