import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
/**
 * Custom error interface extending native Error.
 * @interface CustomError
 * @extends Error
 * @property {number} [statusCode] - Optional HTTP status code for the error response.
 * @property {ValidationError[]} [errors] - Optional array of validation errors.
 */
interface CustomError extends Error {
  statusCode?: number;
  errors?: ValidationError[];
}

/**
 * Express middleware for handling errors.
 * Sends an appropriate JSON response based on the error type.
 * @param {CustomError} err - The error object thrown or passed to the middleware.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object to send the error response.
 * @param {NextFunction} _next - The next function to call the next middleware in the chain.
 */
export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction)=> {
  if (err.errors) {
    // If the error contains validation errors, send a 400 Bad Request response
    return res.status(400).json({ errors: err.errors });
  }

  // Determine the HTTP status code to send with the response
  const statusCode = err.statusCode || 500;

  // Send a JSON response with the error message and optional stack trace in development
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
