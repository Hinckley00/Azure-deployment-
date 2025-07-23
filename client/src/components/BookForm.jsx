import { useState, useEffect } from "react";
import "./BookForm.css";
import PropTypes from "prop-types";

const statusOptions = ["Read", "In Progress", "Not Started"];

export default function BookForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    status: "Not Started",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre || !form.pages) {
      setError("All fields are required");
      return;
    }
    if (isNaN(Number(form.pages)) || Number(form.pages) < 1) {
      setError("Pages must be a positive number");
      return;
    }
    setError("");
    onSubmit({ ...form, pages: Number(form.pages) });
  }

  return (
    <div className="book-form-modal">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2>{initialData ? "Edit Book" : "Add Book"}</h2>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <input name="pages" placeholder="Pages" value={form.pages} onChange={handleChange} type="number" min="1" />
        <select name="status" value={form.status} onChange={handleChange}>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions">
          <button type="submit">{initialData ? "Update" : "Add"}</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}; 