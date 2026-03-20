import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import UploadModal from '../components/UploadModal';
import { fetchBooks, uploadBook, deleteBook } from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (title, author, file) => {
    const result = await uploadBook(title, author, file);
    showToast(`✅ "${title}" uploaded successfully! (${result.total_chunks} chunks)`);
    await loadBooks();
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(bookId);
      setBooks((prev) => prev.filter((b) => b.book_id !== bookId));
      showToast('🗑️ Book deleted successfully');
    } catch (err) {
      showToast('Failed to delete book', 'error');
      console.error(err);
    }
  };

  const handleChat = (book) => {
    navigate(`/chat/${book.book_id}`, { state: { bookTitle: book.title } });
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div className={`toast animate-fade-in-up ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      <main className="home-main">
        <div className="home-header">
          <div>
            <h1 className="home-title">
              Your <span className="gradient-text">Library</span>
            </h1>
            <p className="home-subtitle">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowUpload(true)}
          >
            📤 Upload Book
          </button>
        </div>

        {loading ? (
          <div className="home-loading">
            <div className="loading-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card glass-card">
                  <div className="skeleton-cover shimmer"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-line shimmer" style={{ width: '80%' }}></div>
                    <div className="skeleton-line shimmer" style={{ width: '50%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="home-empty glass-card">
            <span className="empty-icon">⚠️</span>
            <h2>Connection Error</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadBooks}>
              🔄 Retry
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="home-empty glass-card">
            <span className="empty-icon">📚</span>
            <h2>Your library is empty</h2>
            <p>Upload your first book to start chatting with it!</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowUpload(true)}
            >
              📤 Upload Your First Book
            </button>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book, i) => (
              <div
                key={book.book_id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <BookCard
                  book={book}
                  onChat={handleChat}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
