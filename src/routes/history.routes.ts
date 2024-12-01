import express from "express";
import { addMovieToHistory } from "../controllers/history.add";
import { getHistory } from "../controllers/history.get";

const router = express.Router();

router.post("/:userId/add-movie", addMovieToHistory);
router.get("/:userId", getHistory);

export default router;
