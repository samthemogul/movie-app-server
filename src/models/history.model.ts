import mongoose from "mongoose";
interface IHistory {
  id: string;
  userId: string;
  movies: string[];
}

const HistorySchema = new mongoose.Schema<IHistory>(
  {
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

const History = mongoose.model<IHistory>(
  "History",
  HistorySchema
);
export default History;
