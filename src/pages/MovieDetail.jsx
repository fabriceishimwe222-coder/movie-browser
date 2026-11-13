import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { movies } from "../data/movies";

export default function MovieDetail({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === Number(id));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [localVideoUrl, setLocalVideoUrl] = useState(null);
  const localVideo =
    movie && selectedVideo?.movieId === movie.id ? selectedVideo.file : null;
  const activeLocalVideoUrl =
    movie && localVideoUrl?.movieId === movie.id ? localVideoUrl.url : null;

  useEffect(() => {
    if (!localVideo || !movie) {
      setLocalVideoUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(localVideo);
    setLocalVideoUrl({ movieId: movie.id, url });
    return () => URL.revokeObjectURL(url);
  }, [localVideo, movie]);

  function handleVideoFileChange(event) {
    const file = event.target.files?.[0];
    if (file && movie) {
      setSelectedVideo({ movieId: movie.id, file });
    }
    event.currentTarget.value = "";
  }

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
      <section className="movie-player-section" aria-label={`${movie.title} playback`}>
        <h2>Watch this film</h2>
        <label className="movie-file-label">
          Choose a video file
          <input
            className="movie-file-input"
            type="file"
            accept="video/*"
            onChange={handleVideoFileChange}
          />
        </label>
        {activeLocalVideoUrl || movie.videoSrc ? (
          <video
            className="movie-player"
            controls
            playsInline
            preload="metadata"
            src={activeLocalVideoUrl || movie.videoSrc}
          >
            Your browser does not support video playback.
          </video>
        ) : (
          <p className="movie-player-unavailable">
            Choose a video file above, or add a direct video URL as
            <code> videoSrc</code> in <code>src/data/movies.js</code>.
          </p>
        )}
      </section>
    </article>
  );
}
