import { Request, Response, NextFunction } from "express";
import { getRecommendations } from "./recommendations";
import User from "../models/user.model";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
};

export const getMovieRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const recommendedMovies = await getRecommendations(userId);
    if (recommendedMovies) {
      res.status(200).json(recommendedMovies);
    } else {
      const url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmNlMDM5YWMxYTg1MThmY2Y1M2Y5NjkzYmNlNWVhMyIsIm5iZiI6MTczMjA0MDM3OS40MjksInN1YiI6IjY3M2NkNmJiYWMzYWE3MTRmNDMyMjRmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oEIzP4VKNMKOclPxvCI_mCqfxArIZju9LoExaPx3Sbg",
        },
      };

      const response = await fetch(url, options);
      const data = res.json();
      if (response.status == 200) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "No recommendations found" });
      }
    }
  } catch (error) {
    next(error)
  }
};
