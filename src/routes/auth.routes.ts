import express from 'express'
import { registerUser } from '../controllers/auth.register'
import { validateUser } from '../middlewares/validators/user.validator'
import { loginUser } from '../controllers/auth.login'
import { grantToken } from '../middlewares/authenticators/jwt'

const router = express.Router()

router.post(
  "/register",
  validateUser,
  registerUser,
  grantToken,
  (req, res) => {
    const user = req['user'];
    res.status(201).json(user);
  }
);
router.post(
  "/login",
  validateUser,
  loginUser,
  grantToken,
  (req, res) => {
    const user = req["user"];
    res.status(200).json(user);
  }
);

export default router