import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">📚</span>
          <span className="navbar-title">Talk2Books</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/home"
            className={`navbar-link ${isActive('/home') ? 'active' : ''}`}
          >
            Library
          </Link>
        </div>

        <Link to="/login" className="btn btn-primary btn-sm navbar-cta">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
