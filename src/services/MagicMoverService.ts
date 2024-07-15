import { injectable } from 'tsyringe';
import { MagicMover, IMagicMover } from '../models/MagicMover';
import { MagicItem } from '../models/MagicItem';
import { Schema } from 'mongoose';

/**
 * Service class for handling operations related to Magic Movers.
 * @class
 */
@injectable()
export class MagicMoverService {
  
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
   * Loads items onto a Magic Mover, updating its state and loaded items.
   * @param {string} moverId - The ID of the Magic Mover to load items onto.
   * @param {string[]} itemIds - The IDs of the items to load.
   * @param {number} quantity - The quantity of each item to load.
   * @returns {Promise<IMagicMover | null>} A promise that resolves to the updated Magic Mover.
   * @throws {Error} If the Magic Mover is not found, is not in resting state, or weight limit is exceeded.
   */
  async loadMagicMover(moverId: string, itemIds: string[], quantity: number): Promise<IMagicMover | null> {
    const magicMover = await MagicMover.findById(moverId);
    if (!magicMover) {
      throw new Error('Mover not found');
    }
    if (magicMover.questState !== 'resting') {
      throw new Error('Mover is not in resting state');
    }

    // Calculate the total weight of the items with the given quantity
    const items = await MagicItem.find({ '_id': { $in: itemIds } });
    let totalWeight = items.reduce((sum, item) => sum + item.weight * quantity, 0);

    // Check if the total weight exceeds the MagicMover's weight limit
    if (totalWeight > magicMover.weightLimit) {
      throw new Error('Weight limit exceeded');
    }

    // Update the MagicMover's state to loading
    magicMover.questState = 'loading';

    // Add the items to the MagicMover's loadedItems with the specified quantity
    items.forEach(item => {
      const existingItemIndex = magicMover.loadedItems.findIndex(
        loadedItem => loadedItem.item === item._id);

      if (existingItemIndex > -1) {
        magicMover.loadedItems[existingItemIndex].quantity += quantity;
      } else {
        magicMover.loadedItems.push({ item: item._id as Schema.Types.ObjectId, quantity });
      }
    });

    // Save the updated MagicMover and return it
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
      const magicMover = await MagicMover.findById(moverId);

      if (!magicMover) {
        throw new Error('Magic Mover not found');
      }

      if (magicMover.questState !== 'loading') {
        throw new Error('Magic Mover is not in loading state');
      }

      magicMover.questState = 'on-mission';
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
      const magicMover = await MagicMover.findById(moverId);

      if (!magicMover) {
        throw new Error('Magic Mover not found');
      }

      if (magicMover.questState !== 'on-mission') {
        throw new Error('Magic Mover is not currently on a mission');
      }

      magicMover.questState = 'resting';
      magicMover.completedMissions += 1;

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
