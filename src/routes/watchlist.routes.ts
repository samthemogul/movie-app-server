import express from "express";
import { addMovie } from "../controllers/watchlist.add";
import { getWatchlist } from "../controllers/watchlist.get";
import { deleteMovie } from "../controllers/watchlist.delete";

const router = express.Router();

router.post('/:userId/add-movie', addMovie)
router.get('/:userId', getWatchlist)
router.delete('/:userId', deleteMovie)


export default router;
