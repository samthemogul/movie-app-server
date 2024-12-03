import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const getUserStreak = async (
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

    const lastWatched = new Date(user.lastWatch).getTime();
    const currentDate = Date.now()
    if((lastWatched - currentDate) > (24 * 60 * 60 * 1000)) {
      user.streakCount = 0
      await user.save()
      res.status(200).json({ streak: 0})
      return
    } else {
      res.status(200).json({ streak: user.streakCount})
    }
  } catch (error) {

  }
};


export const addStreak = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    // If the user has already watched a movie today, don't update streak
    if (
      user.lastWatch &&
      new Date(user.lastWatch).setHours(0, 0, 0, 0) ===
        today.getTime()
    ) {
      res.status(200).json({ streak: user.streakCount });
      return
    }

    // If the user watched a movie on the previous day, increment the streak
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0); // Normalize to midnight

    if (
      user.lastWatch &&
      new Date(user.lastWatch).setHours(0, 0, 0, 0) ===
        yesterday.getTime()
    ) {
      // If the user watched yesterday, increment the streak
      user.streakCount += 1;
    } else {
      // If not consecutive, reset the streak
      user.streakCount = 1;
    }

    // Update last watched date to today
    user.lastWatch = now;
    await user.save();

    res.status(200).json({ streak: user.streakCount });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const addStreak = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);
//     const now = new Date();
//     now.setHours(0, 0, 0, 0)
//     const lastWatchDate = new Date(user.lastWatch)
//     lastWatchDate.setHours(0, 0, 0, 0)
//     const yesterday = new Date()
//     yesterday.setDate(now.getDate() - 1)
//     yesterday.setHours(0, 0, 0, 0)
//     if(lastWatchDate.getTime() === yesterday.getTime()) {

//     }
//   } catch (error) {}
// };
