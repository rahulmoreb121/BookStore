import express from 'express';
import { userLogin, userLogout, userRegister } from '../controllers/auth.controller.js';
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);

export { router };
