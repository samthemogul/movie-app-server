import express from "express";
import { addMovie } from "../controllers/watchlist.add";
import { getWatchlist } from "../controllers/watchlist.get";

const router = express.Router();

router.post('/:userId/add-movie', addMovie)
router.get('/:userId', getWatchlist)


export default router;
