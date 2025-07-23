import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length)
    return (
      <div style={{ marginTop: "2rem", textAlign: "center", color: "#888" }}>
        No books found. Add your first book!
      </div>
    );
  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
