import { injectable } from 'tsyringe';
import { MagicItem, IMagicItem } from '../models/MagicItem';

/**
 * Service class for handling operations related to Magic Items.
 * @class
 */
@injectable()
export class MagicItemService {
  
  /**
   * Adds a new Magic Item to the database.
   * @param {Partial<IMagicItem>} data - The data of the Magic Item to be added.
   * @returns {Promise<IMagicItem>} A promise that resolves to the added Magic Item.
   * @throws {Error} If there's an error while adding the Magic Item.
   */
  async addMagicItem(data: Partial<IMagicItem>): Promise<IMagicItem> {
    const magicItem = new MagicItem(data);
    return await magicItem.save();
  }

  /**
   * Retrieves all Magic Items from the database.
   * @returns {Promise<IMagicItem[]>} A promise that resolves to an array of Magic Items.
   * @throws {Error} If there's an error while fetching the Magic Items.
   */
  async listMagicItems(): Promise<IMagicItem[]> {
    return await MagicItem.find().exec();
  }
}
