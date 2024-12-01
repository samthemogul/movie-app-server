import { NextFunction, Request, Response } from "express";
import History from "../models/history.model";
import Movie from "../models/movie.model";

export const addMovieToHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tmdbId, title, description, genres, year } = req.body;
    const { userId } = req.params;

    // Find or create the user's history
    let history = await History.findOne({ userId });
    if (!history) {
      history = await History.create({ userId, movies: [] });
    }

    // Check if the movie already exists in the movies collection
    let movie = await Movie.findOne({ tmdbId });
    if (!movie) {
      movie = await Movie.create({
        tmdbId,
        title,
        description,
        genres,
        year,
      });
    }

    // Avoid adding duplicate movie IDs to the history
    if (!history.movies.includes(movie.id)) {
      history.movies.push(movie.id);
      await history.save();
    }

    // Fetch the full movie details for all movies in the history
    const historyMovies = await Promise.all(
      history.movies.map((id) => Movie.findById(id))
    );

    res.status(200).json({ historyMovies });
  } catch (error) {
    next(error);
  }
};
