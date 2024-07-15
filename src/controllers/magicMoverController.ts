import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { MagicMoverService } from '../services/MagicMoverService';
import { IMagicMover } from '../models/MagicMover';

const magicMoverService = container.resolve(MagicMoverService);

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
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(400).send(error);
  }
};


/**
 * Load items onto a magic mover.
 * POST /api/magic-movers/:moverId/load
 * @param req Request object containing the moverId in params and itemIds, quantity in req.body
 * @param res Response object to send back the updated magic mover or error response
 */
export const loadMagicMover = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moverId } = req.params;
    const { itemIds, quantity } = req.body;

    const magicMover = await magicMoverService.loadMagicMover(moverId, itemIds, quantity);
    res.status(200).send(magicMover);
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(400).send(error);
  }
};

