import express from 'express';
export const userRouter = express.Router();
import { verifyJwt } from '../middlewares/index.js';
import {
    getCurrentUser,
    logout,
    login,
} from '../controllers/user.controller.js';

userRouter.route('/login').patch(login);

userRouter.use(verifyJwt);

userRouter.route('/logout').get(logout);

userRouter.route('/').get(getCurrentUser);
