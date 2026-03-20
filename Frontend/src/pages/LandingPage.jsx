import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />

      {/* Animated background orbs */}
      <div className="landing-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">✨ AI-Powered Reading Companion</div>
          <h1 className="hero-title">
            Talk to Your <span className="gradient-text">Books</span>
          </h1>
          <p className="hero-subtitle">
            Upload any PDF book and have an intelligent conversation with it.
            Ask questions, explore ideas, and discover insights — powered by
            advanced RAG technology.
          </p>
          <div className="hero-actions">
            <Link to="/home" className="btn btn-primary btn-lg">
              🚀 Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In →
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Books Analyzed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Questions Asked</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">99%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2 className="section-title animate-fade-in-up">
            Why <span className="gradient-text">Talk2Books</span>?
          </h2>
          <div className="features-grid">
            {features.map((feat, i) => (
              <div
                key={i}
                className="feature-card glass-card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="feature-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content glass-card animate-fade-in-up">
          <h2>Ready to start a conversation<br />with your books?</h2>
          <p>Upload your first book and experience the magic of AI-powered reading.</p>
          <Link to="/home" className="btn btn-primary btn-lg">
            📚 Start Reading Smarter
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 Talk2Books — Built with ❤️ and AI</p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '📤',
    title: 'Upload Any PDF',
    desc: 'Simply drag and drop your PDF books. We process and index them instantly for conversation.',
  },
  {
    icon: '💬',
    title: 'Natural Conversations',
    desc: 'Ask questions in plain English. Our AI understands context and provides accurate, cited answers.',
  },
  {
    icon: '🔍',
    title: 'Deep Search',
    desc: 'Search across all your uploaded books simultaneously. Find exactly what you need in seconds.',
  },
  {
    icon: '🧠',
    title: 'RAG Technology',
    desc: 'Powered by Retrieval-Augmented Generation for precise, hallucination-free responses grounded in your books.',
  },
  {
    icon: '📚',
    title: 'Personal Library',
    desc: 'Build and manage your digital book collection. Access your entire library from one dashboard.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Vector-powered search returns results in milliseconds. No waiting, just answers.',
  },
];
