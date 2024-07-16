import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MagicMoverService } from '../services/MagicMoverService';

const magicMoverService = container.resolve(MagicMoverService);

/**
 * Controller to find a Magic Mover by ID.
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const getOneMagicMover = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moverId } = req.params;
    const magicMover = await magicMoverService.getOneMagicMover(moverId);

    if (!magicMover) {
      res.status(404).send({ message: 'Magic Mover not found' });
      return;
    }

    res.status(200).send(magicMover);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};

/**
 * Get all magic movers.
 * GET /api/magic-movers
 * @param req Request object (not used here)
 * @param res Response object to send back the list of magic movers or error response
 */
export const getAllMagicMovers = async (req: Request, res: Response): Promise<void> => {
  try {
    const magicMovers = await magicMoverService.getAllMagicMovers();
    res.status(200).send(magicMovers);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};


/**
 * Add a new magic mover.
 * POST /api/magic-movers
 * @param req Request object containing the magic mover data in req.body
 * @param res Response object to send back the added magic mover or error response
 */
export const addMagicMover = async (req: Request, res: Response): Promise<void> => {
  try {
    const magicMover = await magicMoverService.addMagicMover(req.body);
    res.status(201).send(magicMover);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};


/**
 * Load items onto a magic mover.
 * POST /api/magic-movers/:moverId/load
 * @param req Request object containing the moverId in params and itemIds in req.body
 * @param res Response object to send back the updated magic mover or error response
 */
export const loadMagicMover = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moverId } = req.params;
    const { itemIds } = req.body;

    const magicMover = await magicMoverService.loadMagicMover(moverId, itemIds);
    res.status(200).send(magicMover);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};


/**
 * Start a mission for a magic mover.
 * POST /api/magic-movers/:moverId/start-mission
 * @param req Request object containing the moverId in params
 * @param res Response object to send back the updated magic mover or error response
 */
export const startMission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moverId } = req.params;
    const magicMover = await magicMoverService.startMission(moverId);
    res.status(200).send(magicMover);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};



/**
 * End a mission for a magic mover.
 * POST /api/magic-movers/:moverId/end-mission
 * @param req Request object containing the moverId in params
 * @param res Response object to send back the updated magic mover or error response
 */
export const endMission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moverId } = req.params;
    const magicMover = await magicMoverService.endMission(moverId);
    res.status(200).send(magicMover);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};


/**
 * Get a list of top magic movers based on completed missions.
 * GET /api/magic-movers/completed-missions
 * @param _req Request object (not used here)
 * @param res Response object to send back the list of top magic movers or error response
 */
export const listTopMagicMovers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const magicMovers = await magicMoverService.listTopMagicMovers();
    res.status(200).send(magicMovers);
  } catch (error:any) {
    res.status(400).send({ message: error.message });
  }
};

