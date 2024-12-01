import express from "express"
import { getUserStreak } from "../controllers/user.getStreak"
import { getUser } from "../controllers/user.get"

const router = express.Router()

router.get('/:userId', getUser)
router.get('/:userId/current-streak', getUserStreak)


export default router