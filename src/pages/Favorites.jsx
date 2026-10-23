import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Favorites({ favorites, toggleFavorite }) {
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <section className="watchlist-page" aria-labelledby="watchlist-title">
      <div className="page-heading">
        <p className="eyebrow"><span className="eyebrow-line" /> SAVED FOR LATER</p>
        <h1 id="watchlist-title">Your watchlist<span className="heading-period">.</span></h1>
        <p className="page-description">
          The films you’ve saved for a night that feels just right.
        </p>
      </div>

      {favoriteMovies.length > 0 ? (
        <>
          <div className="watchlist-summary">
            <span>{favoriteMovies.length} {favoriteMovies.length === 1 ? "film" : "films"} saved</span>
            <span>GOOD TASTE, BY THE WAY</span>
          </div>
          <div className="movie-grid">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite
                onToggleFavorite={() => toggleFavorite(movie.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state watchlist-empty">
          <span className="empty-mark heart-mark" aria-hidden="true">♡</span>
          <h2>Nothing saved. Yet.</h2>
          <p>Your next favorite is out there. Add a film and it’ll be waiting here.</p>
          <Link className="primary-link" to="/">
            Browse the collection <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
