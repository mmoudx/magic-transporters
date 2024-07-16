import { injectable } from 'tsyringe';
import { MagicMover, IMagicMover } from '../models/MagicMover';
import {  IMagicItem, MagicItem } from '../models/MagicItem';
import { Types } from 'mongoose';

/**
 * Service class for handling operations related to Magic Movers.
 * @class
 */
@injectable()
export class MagicMoverService {
/**
 * Find a Magic Mover by ID.
 * @param moverId - ID of the Magic Mover.
 * @returns The found Magic Mover or null if not found.
 */
 async  getOneMagicMover(moverId: string): Promise<IMagicMover | null> {
  if (!Types.ObjectId.isValid(moverId)) {
    throw new Error('Invalid ID format');
  }

  return await MagicMover.findById(moverId).populate('loadedItems.item');
}

  /**
   * Retrieves all Magic Movers from the database.
   * @returns {Promise<IMagicMover[]>} A promise that resolves to an array of Magic Movers.
   * @throws {Error} If there's an error while fetching the Magic Movers.
   */
  async getAllMagicMovers(): Promise<IMagicMover[]> {
    try {
      return await MagicMover.find().exec();
    } catch (error) {
      throw new Error(`Failed to get all Magic Movers: ${error}`);
    }
  }

  /**
   * Adds a new Magic Mover to the database.
   * @param {Partial<IMagicMover>} data - The data of the Magic Mover to be added.
   * @returns {Promise<IMagicMover>} A promise that resolves to the added Magic Mover.
   * @throws {Error} If there's an error while adding the Magic Mover.
   */
  async addMagicMover(data: Partial<IMagicMover>): Promise<IMagicMover> {
    try {
      const magicMover = new MagicMover(data);
      return await magicMover.save();
    } catch (error) {
      throw new Error(`Failed to add Magic Mover: ${error}`);
    }
  }

/**
 * Load a Magic Mover with items.
 * @param moverId - ID of the Magic Mover.
 * @param itemIds - Array of item IDs to load onto the Magic Mover.
 * @returns The updated Magic Mover.
 * @throws Error if the mover is not found, is not in the resting state or weight limit is exceeded.
 */
async loadMagicMover(moverId: string, itemIds: string[]): Promise<IMagicMover | null> {
  
  // Find the Magic Mover by ID
  const magicMover = await MagicMover.findById(moverId);
  if (!magicMover) {
    throw new Error('Mover not found');
  }

  // Check if the Magic Mover is in the resting state
  if (magicMover.questState !== 'resting') {
    throw new Error('Mover is not in resting state');
  }
  
  // Fetch the Magic Items by their IDs
  const items = await MagicItem.find({ '_id': { $in: itemIds.map(id => new Types.ObjectId(id)) } });

  // Calculate the total weight of the items
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  // Check if the total weight exceeds the Magic Mover's weight limit
  if (totalWeight > magicMover.weightLimit) {
    throw new Error('Weight limit exceeded');
  }

  // Update the Magic Mover's state to loading
  magicMover.questState = 'loading';
  magicMover.activityLog.push({
    type: magicMover.questState,
    message: `Started loading for mover '${magicMover.name}' with items: ${items.map(item => item.name).join(', ')}`,
    timestamp: new Date() });

  // Save the updated Magic Mover and return it
  return await magicMover.save();
}

  /**
   * Starts a mission for a Magic Mover by updating its state to 'on-mission'.
   * @param {string} moverId - The ID of the Magic Mover to start the mission for.
   * @returns {Promise<IMagicMover | null>} A promise that resolves to the Magic Mover with updated state.
   * @throws {Error} If the Magic Mover is not found or is not in loading state.
   */
  async startMission(moverId: string): Promise<IMagicMover | null> {
    try {
      const magicMover = await MagicMover.findById(moverId).populate('loadedItems.item');

      if (!magicMover) {
        throw new Error('Magic Mover not found');
      }

      if (magicMover.questState !== 'loading') {
        console.log(magicMover.questState);
        throw new Error('Magic Mover is not in loading state');
      }

    // Access the names of the loaded items
    const itemNames = magicMover.loadedItems.map((loadedItem) => {
      const item = loadedItem.item as unknown as IMagicItem;
      return item.name;
    });

      magicMover.questState = 'on-mission';
      magicMover.activityLog.push({
        type: magicMover.questState,
        message: `Mover '${magicMover.name}' is now On-Mission with items: ${itemNames.join(', ')}`,
        timestamp: new Date() });

      return await magicMover.save();

    } catch (error) {
      // Log the error or handle it accordingly
      throw new Error(`Failed to start mission: ${error}`);
    }
  }

  /**
   * Ends a mission for a Magic Mover by updating its state to 'resting' and incrementing completed missions.
   * @param {string} moverId - The ID of the Magic Mover to end the mission for.
   * @returns {Promise<IMagicMover | null>} A promise that resolves to the Magic Mover with updated state.
   * @throws {Error} If the Magic Mover is not found or is not currently on a mission.
   */
  async endMission(moverId: string): Promise<IMagicMover | null> {
    try {
      const magicMover = await MagicMover.findById(moverId).populate('loadedItems.item');

      if (!magicMover) {
        throw new Error('Magic Mover not found');
      }

      if (magicMover.questState !== 'on-mission') {
        throw new Error('Magic Mover is not currently on a mission');
      }

    // Access the names of the loaded items
    const itemNames = magicMover.loadedItems.map((loadedItem) => {
      const item = loadedItem.item as unknown as IMagicItem;
      return item.name;
    });

      magicMover.questState = 'resting';
      magicMover.completedMissions += 1;
      magicMover.activityLog.push({
        type: magicMover.questState,
        message: `Mover '${magicMover.name}' Done his mission with items: ${itemNames.join(', ')}`,
        timestamp: new Date() });

      return await magicMover.save();
    } catch (error) {
      // Log the error or handle it accordingly
      throw new Error(`Failed to end mission: ${error}`);
    }
  }

  /**
   * Retrieves the top Magic Movers based on completed missions, sorted in descending order.
   * @returns {Promise<IMagicMover[]>} A promise that resolves to an array of Magic Movers.
   * @throws {Error} If there's an error while fetching the Magic Movers.
   */
  async listTopMagicMovers(): Promise<IMagicMover[]> {
    try {
      return await MagicMover.find().sort({ completedMissions: -1 }).exec();
    } catch (error) {
      // Log the error or handle it accordingly
      throw new Error(`Failed to list magic movers: ${error}`);
    }
  }

}
