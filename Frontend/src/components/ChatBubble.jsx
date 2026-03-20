import './ChatBubble.css';

export default function ChatBubble({ message, isUser }) {
  return (
    <div className={`chat-bubble-wrapper ${isUser ? 'user' : 'ai'}`}>
      {!isUser && <div className="chat-avatar">🤖</div>}
      <div className={`chat-bubble ${isUser ? 'user' : 'ai'}`}>
        <p>{message}</p>
      </div>
      {isUser && <div className="chat-avatar user-avatar">👤</div>}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="chat-bubble-wrapper ai">
      <div className="chat-avatar">🤖</div>
      <div className="chat-bubble ai typing-bubble">
        <div className="typing-dots">
          <span className="typing-dot" style={{ animationDelay: '0s' }}></span>
          <span className="typing-dot" style={{ animationDelay: '0.15s' }}></span>
          <span className="typing-dot" style={{ animationDelay: '0.3s' }}></span>
        </div>
      </div>
    </div>
  );
}
