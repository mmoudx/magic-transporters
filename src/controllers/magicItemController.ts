import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MagicItemService } from '../services/MagicItemService';
import { validationResult } from 'express-validator';

const magicItemService = container.resolve(MagicItemService);

/**
 * Add a new magic item.
 * POST /api/magic-items
 * @param req Request object containing the magic item data in req.body
 * @param res Response object to send back the added magic item or error response
 */
export const addMagicItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw { errors: errors.array() };
    }

    const magicItem = await magicItemService.addMagicItem(req.body);
    res.status(201).send(magicItem);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};

/**
 * Get all magic items.
 * GET /api/magic-items
 * @param _req Request object (not used here)
 * @param res Response object to send back the list of magic items or error response
 */
export const listMagicItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const magicItems = await magicItemService.listMagicItems();
    res.status(200).send(magicItems);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};

