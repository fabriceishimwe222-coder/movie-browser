import { Link, useParams } from "react-router-dom";
import { movies } from "../data/movies";

export default function MovieDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <section className="empty-state detail-missing">
        <span className="empty-mark" aria-hidden="true">?</span>
        <h1>That film’s gone missing.</h1>
        <p>It might have been moved to another reel.</p>
        <Link className="primary-link" to="/">Back to the collection <span aria-hidden="true">→</span></Link>
      </section>
    );
  }

  const isFavorite = favorites.includes(movie.id);

  return (
    <article className="detail-page">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> Back to the collection
      </Link>
      <div className="detail-layout">
        <div
          className="detail-poster"
          style={{ "--poster-color": movie.color }}
          aria-label={`${movie.title} poster`}
        >
          <span className="detail-poster-note">REEL GOOD PICK&nbsp; · &nbsp;NO. {String(movie.id).padStart(2, "0")}</span>
          <span className="detail-poster-emoji" aria-hidden="true">{movie.emoji}</span>
          <span className="detail-poster-title">{movie.title}</span>
        </div>

        <div className="detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {movie.genre.toUpperCase()}</p>
          <h1>{movie.title}<span className="heading-period">.</span></h1>
          <div className="detail-meta">
            <span>{movie.year}</span>
            <span className="meta-divider" />
            <span className="detail-rating"><span aria-hidden="true">★</span> {movie.rating} <span className="rating-out-of">/ 10</span></span>
          </div>
          <p className="detail-description">{movie.description}</p>
          <div className="detail-rule" />
          <p className="detail-note">THE PERFECT PICK FOR YOUR NEXT NIGHT IN.</p>
          <button
            className={`detail-favorite${isFavorite ? " is-favorite" : ""}`}
            type="button"
            onClick={() => toggleFavorite(movie.id)}
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
            {isFavorite ? "Saved to your watchlist" : "Add to your watchlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
