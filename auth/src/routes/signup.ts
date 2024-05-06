import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { build, User } from '../models/user';
import { Password } from '../services/password';
import  jwt  from 'jsonwebtoken';

const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        'passowrd must have a length of between 4 and 20 characters'
      ),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    await User.deleteMany({});

    const hashedPassword = await Password.toHash('password');

    const userObject = new User({ email, password: hashedPassword });

    const savedUser = await userObject.save()


    const jwtToken = jwt.sign(
      {
        id: savedUser.id,
        email: savedUser.email,
      },
      'asdf'
    );

    request.session = { jwt: jwtToken };

    response.status(201).send(savedUser);
  }
);

export { signupRouter };
