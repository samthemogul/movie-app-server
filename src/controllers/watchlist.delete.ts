import { NextFunction, Request, Response } from "express";
import Watchlist from "../models/watchlist.model";
import Movie from "../models/movie.model";

export const deleteMovie =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tmdbId } = req.body;
    const { userId } = req.params;
    let watchlist = await Watchlist.findOne({ userId });
    if(!watchlist) {
      throw new Error("No watchlist found")
    }
    let movie = await Movie.findOne({ tmdbId });
    if(!movie) {
      throw new Error("Movie not found")
    }
    if(watchlist.movies.includes(movie.id)) {
      const indexOfMovie = watchlist.movies.indexOf(movie.id)
      watchlist.movies.splice(indexOfMovie, 1)
      watchlist.save()
      res.status(200).json(watchlist)
    }
  } catch (error) {
    next(error)
  }
}