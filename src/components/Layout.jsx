import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ favoritesCount }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Reel Good home">
            <span className="brand-mark" aria-hidden="true">R</span>
            <span>reel good<span className="brand-period">.</span></span>
          </NavLink>

          <nav className="nav" aria-label="Main navigation">
            <NavLink to="/" end>Discover</NavLink>
            <NavLink to="/favorites">
              Watchlist <span className="nav-count">{favoritesCount}</span>
            </NavLink>
          </nav>

          <span className="header-note">A little something for movie night</span>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span className="footer-brand">reel good.</span>
        <span>Made for picking your next movie night.</span>
        <span className="footer-local">A small, hand-picked collection</span>
      </footer>
    </div>
  );
}
