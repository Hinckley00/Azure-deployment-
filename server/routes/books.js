import express from "express";
import Book from "../models/Book.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// GET /api/books - fetch all books (with optional search and filters)
router.get("/", async (req, res) => {
  try {
    const { search, status, genre } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;
    if (genre) query.genre = genre;
    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/books - create a new book
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("pages")
      .isInt({ min: 1 })
      .withMessage("Pages must be a positive number"),
    body("status")
      .optional()
      .isIn(["Read", "In Progress", "Not Started"])
      .withMessage("Invalid status"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { title, author, genre, pages, status } = req.body;
    try {
      const newBook = new Book({ title, author, genre, pages, status });
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (err) {
      res.status(500).json({ error: err.message || "Server error" });
    }
  }
);

// PUT /api/books/:id - update a book
router.put(
  "/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("pages")
      .isInt({ min: 1 })
      .withMessage("Pages must be a positive number"),
    body("status")
      .optional()
      .isIn(["Read", "In Progress", "Not Started"])
      .withMessage("Invalid status"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { title, author, genre, pages, status } = req.body;
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, genre, pages, status },
        { new: true, runValidators: true }
      );
      if (!updatedBook)
        return res.status(404).json({ error: "Book not found" });
      res.json(updatedBook);
    } catch (err) {
      res.status(500).json({ error: err.message || "Server error" });
    }
  }
);

// DELETE /api/books/:id - delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
