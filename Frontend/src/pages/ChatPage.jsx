import { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ChatBubble, { TypingIndicator } from '../components/ChatBubble';
import { sendChat } from '../services/api';
import './ChatPage.css';

export default function ChatPage() {
  const { bookId } = useParams();
  const location = useLocation();
  const bookTitle = location.state?.bookTitle || 'Book';

  const [messages, setMessages] = useState([
    {
      text: `Hi! I'm your AI reading assistant. Ask me anything about "${bookTitle}" and I'll find the answer from the book. 📖`,
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await sendChat(userMessage, bookId);
      setMessages((prev) => [
        ...prev,
        { text: response.answer, isUser: false },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, I encountered an error. Please make sure the backend server is running and try again.',
          isUser: false,
        },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-page">
      {/* Chat Header */}
      <header className="chat-header">
        <div className="chat-header-inner">
          <Link to="/home" className="back-btn" aria-label="Back to library">
            ← Back
          </Link>
          <div className="chat-header-info">
            <span className="chat-header-icon">📖</span>
            <div>
              <h1 className="chat-header-title">{bookTitle}</h1>
              <p className="chat-header-status">
                {isLoading ? 'Thinking...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="chat-header-actions">
            <div className="status-dot"></div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="chat-messages">
        <div className="chat-messages-inner">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder={`Ask about "${bookTitle}"...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
