import mongoose from "mongoose";
interface IWatchlist {
  id: string;
  userId: string;
  movies: string[];
}

const WatchlistSchema = new mongoose.Schema<IWatchlist>(
  {
    id: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // Reference to the Movie model
      },
    ],
  },
  { timestamps: true }
);

const Watchlist = mongoose.model<IWatchlist>(
  "Watchlist",
  WatchlistSchema
);
export default Watchlist;
