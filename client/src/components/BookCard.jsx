import "./BookCard.css";

const statusColors = {
  "Read": "#4caf50",
  "In Progress": "#ff9800",
  "Not Started": "#f44336",
};

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderLeft: `6px solid ${statusColors[book.status]}` }}>
      <div className="book-card-header">
        <h3>{book.title}</h3>
        <span className="book-status" style={{ background: statusColors[book.status] }}>{book.status}</span>
      </div>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <div className="book-card-actions">
        <button className="edit-btn" onClick={() => onEdit(book)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(book._id)}>Delete</button>
      </div>
    </div>
  );
} 