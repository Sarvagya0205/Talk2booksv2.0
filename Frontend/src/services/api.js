const API_BASE = 'http://localhost:8000';

export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books/`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function uploadBook(title, author, file) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/books/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload book');
  return res.json();
}

export async function deleteBook(bookId) {
  const res = await fetch(`${API_BASE}/books/delete?book_id=${bookId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
}

export async function sendChat(question, bookId) {
  const res = await fetch(`${API_BASE}/chat/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, book_id: bookId }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function searchBooks(query) {
  const res = await fetch(`${API_BASE}/search/?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}
