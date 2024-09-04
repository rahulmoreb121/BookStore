import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { router as authRouter } from './routes/auth.route.js';
import { router as bookRouter } from './routes/book.route.js';
import { router as refreshTokenRouter } from './routes/refreshToken.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApiError } from './utils/ApiError.js';

import { globalErrorHandler } from './middlewares/globalErrorHandler.midddleware.js';
import { verifyAccessToken } from './middlewares/verifyAccessToken.middleware.js';
import { upload } from './middlewares/multerPhotoUpload.middleware.js';
const app = express();
app.use(
  express.json({
    limit: '50kb',
  })
);
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(cookieParser());
app.use(cors());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', verifyAccessToken, upload, bookRouter);
app.use('/api/v1/refreshToken', refreshTokenRouter);

app.all('*', (req, res, next) => {
  const error = new ApiError(404, `Route not found ${req.originalUrl}`);
  next(error);
});

app.use(globalErrorHandler);
export { app };
