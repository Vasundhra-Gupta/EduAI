import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { CORS_OPTIONS, OK } from './constants/index.js';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public'));
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));

// Routes

import { userRouter, doubtRouter } from './routers/index.js';
import { errorMiddleware } from './middlewares/index.js';

app.use('/api/users', userRouter);
app.use('/api/doubts', doubtRouter);

app.get('/', (req, res) => {
    res.status(OK).json({ message: 'Welcome to EduAI!' });
});

app.use(errorMiddleware);
