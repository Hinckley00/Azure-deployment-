import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["Reading", "In Progress", "Not Started", "Completed"],
    default: "Not Started",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Book", BookSchema);
