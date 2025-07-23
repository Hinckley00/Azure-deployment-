import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import "./App.css";
import PropTypes from "prop-types";

function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // New state for search and filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  // Fetch books from backend with filters
  async function fetchBooks(params = {}) {
    setLoading(true);
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(
        `${API_BASE}/api/books${query ? `?${query}` : ""}`
      );
      setBooks(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch books");
    }
    setLoading(false);
  }

  // Fetch books on mount and when filters/search change
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (genreFilter) params.genre = genreFilter;
    fetchBooks(params);
  }, [search, statusFilter, genreFilter]);

  async function handleAdd(book) {
    try {
      await axios.post(`${API_BASE}/api/books`, book);
      fetchBooks();
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  }

  async function handleEdit(book) {
    try {
      await axios.put(`${API_BASE}/api/books/${book._id}`, book);
      fetchBooks();
      setEditBook(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${API_BASE}/api/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book");
    }
  }

  // Get unique genres for filter dropdown
  const genres = Array.from(new Set(books.map((b) => b.genre)));

  return (
    <div className="container">
      <header className="app-header">
        <h1>📚 Track "A" Book</h1>
        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setEditBook(null);
          }}
        >
          + Add Book
        </button>
      </header>
      {/* Search and Filters */}
      <div className="filters-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, author, or genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Read">Read</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
        <select
          className="filter-select"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <BookList
          books={books}
          onEdit={(book) => {
            setEditBook(book);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
      {showForm && (
        <BookForm
          initialData={editBook}
          onSubmit={
            editBook ? (b) => handleEdit({ ...editBook, ...b }) : handleAdd
          }
          onCancel={() => {
            setShowForm(false);
            setEditBook(null);
          }}
        />
      )}
    </div>
  );
}

App.propTypes = {};

export default App;
