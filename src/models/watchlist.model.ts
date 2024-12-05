import mongoose from "mongoose";
interface IWatchlist {
  id: string;
  userId: string;
  movies: string[];
}

const WatchlistSchema = new mongoose.Schema<IWatchlist>(
  {
    userId: { type: String, required: true },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
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
