import mongoose from "mongoose";
interface IMovie {
  id: string;
  tmdbId: string;
  title: string;
  description: string;
  genres: string;
  year: string;
  watchlist: {}
}

const MovieSchema = new mongoose.Schema<IMovie>(
  {
    id: {
      type: String,
      required: true,
    },
    tmdbId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    genres: { type: String, required: true },
    year: { type: String },
    watchlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist", // Reference to the Watchlist model
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
export default Movie;
