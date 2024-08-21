import express from 'express';
import { generateRefreshToken } from '../controllers/generateRefreshToken.controller.js';
const router = express.Router();

router.route('/').get(generateRefreshToken);

export { router };
