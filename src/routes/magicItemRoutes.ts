import { Router } from 'express';
import { addMagicItem, listMagicItems } from '../controllers/magicItemController';
import { validateMagicItem } from '../middlewares/validators';

const router = Router();

/**
 * @swagger
 * /magic-items:
 *   post:
 *     summary: Add a new magic item
 *     tags: [MagicItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Magic Wand"
 *               weight:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: The created magic item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MagicItem'
 *       400:
 *         description: Bad request
 */
router.post('/magic-items', validateMagicItem, addMagicItem);

/**
 * @swagger
 * /magic-items:
 *   get:
 *     summary: Get all magic items
 *     tags: [MagicItems]
 *     responses:
 *       200:
 *         description: List of all magic items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MagicItem'
 */
router.get('/magic-items', listMagicItems);

export default router;
