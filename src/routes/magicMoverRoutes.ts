import { Router } from 'express';
import {
  getAllMagicMovers,
  addMagicMover,
  loadMagicMover,
  startMission,
  endMission,
  listTopMagicMovers
} from '../controllers/magicMoverController';
import {
  validateMagicMover,
  validateLoadMagicMover,
  validateMission
} from '../middlewares/validators';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: MagicMovers
 *   description: API for managing magic movers
 */

/**
 * @swagger
 * /magic-movers:
 *   get:
 *     summary: Get all magic movers
 *     tags: [MagicMovers]
 *     responses:
 *       200:
 *         description: List of all magic movers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagicMover'
 */
router.get('/magic-movers', getAllMagicMovers);

/**
 * @swagger
 * /magic-movers:
 *   post:
 *     summary: Add a new magic mover
 *     tags: [MagicMovers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MagicMover'
 *     responses:
 *       201:
 *         description: The created magic mover
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Bad request
 */
router.post('/magic-movers', validateMagicMover, addMagicMover);

/**
 * @swagger
 * /magic-movers/{moverId}/load:
 *   post:
 *     summary: Load items to a magic mover
 *     tags: [MagicMovers]
 *     parameters:
 *       - in: path
 *         name: moverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the magic mover
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["item1", "item2"]
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: The updated magic mover
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Bad request
 */
router.post('/magic-movers/:moverId/load', validateLoadMagicMover, loadMagicMover);

/**
 * @swagger
 * /magic-movers/{moverId}/start-mission:
 *   post:
 *     summary: Start a mission for a magic mover
 *     tags: [MagicMovers]
 *     parameters:
 *       - in: path
 *         name: moverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the magic mover
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               missionDetails:
 *                 type: string
 *                 example: "Deliver package to XYZ"
 *     responses:
 *       200:
 *         description: The updated magic mover
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Bad request
 */
router.post('/magic-movers/:moverId/start-mission', validateMission, startMission);

/**
 * @swagger
 * /magic-movers/{moverId}/end-mission:
 *   post:
 *     summary: End a mission for a magic mover
 *     tags: [MagicMovers]
 *     parameters:
 *       - in: path
 *         name: moverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the magic mover
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               missionResult:
 *                 type: string
 *                 example: "Mission completed successfully"
 *     responses:
 *       200:
 *         description: The updated magic mover
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicMover'
 *       400:
 *         description: Bad request
 */
router.post('/magic-movers/:moverId/end-mission', validateMission, endMission);

/**
 * @swagger
 * /magic-movers/completed-missions:
 *   get:
 *     summary: Get list of top magic movers by completed missions
 *     tags: [MagicMovers]
 *     responses:
 *       200:
 *         description: List of top magic movers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagicMover'
 */
router.get('/magic-movers/completed-missions', listTopMagicMovers);

export default router;
