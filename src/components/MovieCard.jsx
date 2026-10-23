import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <article className="movie-card">
      <Link
        className="movie-card-link"
        to={`/movie/${movie.id}`}
        aria-label={`View ${movie.title} details`}
      >
        <div
          className="movie-poster"
          style={{ "--poster-color": movie.color }}
        >
          <span className="poster-emoji" aria-hidden="true">{movie.emoji}</span>
          <span className="poster-label">REEL GOOD PICK</span>
        </div>
      </Link>

      <div className="movie-card-info">
        <div className="movie-card-heading">
          <div>
            <p className="movie-genre">{movie.genre}</p>
            <h3>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </h3>
          </div>
          <span className="rating"><span aria-hidden="true">★</span> {movie.rating}</span>
        </div>
        <p className="movie-meta">{movie.year}</p>
        <button
          className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
          type="button"
          onClick={onToggleFavorite}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${movie.title} ${isFavorite ? "from" : "to"} your watchlist`}
          aria-pressed={isFavorite}
        >
          <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
          {isFavorite ? "In watchlist" : "Add to watchlist"}
        </button>
      </div>
    </article>
  );
}
