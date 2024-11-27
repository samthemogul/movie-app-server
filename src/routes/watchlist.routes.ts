import express from "express";
import { addMovie } from "../controllers/watchlist.add";

const router = express.Router();

router.post('/:userId/addMovie', addMovie)
router.get('/:userId', getWatchlist)


export default router;
