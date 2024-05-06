import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

const currentUserRouter = express.Router();

currentUserRouter.post(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  (request: Request, response: Response) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { currentUserRouter };
