import './BookCard.css';

export default function BookCard({ book, onChat, onDelete }) {
  return (
    <div className="book-card glass-card">
      <div className="book-card-cover">
        <span className="book-card-icon">📖</span>
      </div>
      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
      </div>
      <div className="book-card-actions">
        <button className="btn btn-primary btn-sm" onClick={() => onChat(book)}>
          💬 Chat
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.book_id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
