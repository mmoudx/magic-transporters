import { body, param } from 'express-validator';

/**
 * Validation middleware for validating Magic Mover data.
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateMagicMover = [
  body('name').isString().withMessage('Name must be a string'),
  body('weightLimit').isNumeric().withMessage('Weight limit must be a number')
];

/**
 * Validation middleware for validating Magic Item data.
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateMagicItem = [
  body('name').isString().withMessage('Name must be a string'),
  body('weight').isNumeric().withMessage('Weight must be a number')
];

/**
 * Validation middleware for validating the payload to load items for a Magic Mover.
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateLoadMagicMover = [
  param('moverId').isMongoId().withMessage('Invalid mover ID'),
  body('itemIds').isArray().withMessage('Item IDs must be an array')
];

/**
 * Validation middleware for validating the payload to start or end a mission for a Magic Mover.
 * @type {import('express-validator').ValidationChain[]}
 */
export const validateMission = [
  param('moverId').isMongoId().withMessage('Invalid mover ID')
];
