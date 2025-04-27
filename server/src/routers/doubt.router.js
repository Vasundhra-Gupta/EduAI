import express from 'express';
import { addDoubt } from '../controllers/doubt.controller.js';
// import { verifyJwt } from '../middlewares.js';
export const doubtRouter = express.Router();

// doubtRouter.use(verifyJwt);
doubtRouter.route('/add-doubt').post(addDoubt);
