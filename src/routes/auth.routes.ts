import express from 'express'
import { registerUser } from '../controllers/auth.register'
import { validateUser } from '../middlewares/validators/user.validator'

const router = express.Router()

router.post('/register', validateUser, registerUser)

export default router