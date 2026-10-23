import { useState } from "react";
import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Home({ favorites, toggleFavorite }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All films");
  const genres = ["All films", ...new Set(movies.map((movie) => movie.genre))];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = `${movie.title} ${movie.genre}`
      .toLowerCase()
      .includes(normalizedSearch);
    return matchesSearch && (genre === "All films" || movie.genre === genre);
  });

  function resetFilters() {
    setSearch("");
    setGenre("All films");
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR SEAT IS WAITING</p>
          <h1>Find your<br /><em>next favorite.</em></h1>
          <p className="hero-description">
            Good stories, good company, and something<br className="desktop-break" />
            worth staying in for.
          </p>
          <a className="hero-link" href="#collection">
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-star star-one">✳</span>
          <span className="hero-star star-two">✳</span>
          <div className="hero-ticket">
            <span className="ticket-top">TONIGHT’S FEATURE</span>
            <span className="ticket-emoji">🎬</span>
            <span className="ticket-bottom">A GOOD FILM &nbsp;·&nbsp; 2 HOURS</span>
          </div>
          <span className="hero-art-caption">THE GOOD<br />STUFF ONLY</span>
        </div>
        <div className="hero-bottom">
          <span>01 — 0{movies.length}</span>
          <span>Curated for your next night in</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      <section className="collection" id="collection" aria-labelledby="collection-title">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">THE MOVIE SHELF</p>
            <h2 id="collection-title">Tonight’s collection<span className="collection-count">{filteredMovies.length.toString().padStart(2, "0")}</span></h2>
          </div>
          <label className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a film..."
              aria-label="Search films by title or genre"
            />
            {search && (
              <button
                className="clear-search"
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>

        <div className="collection-toolbar">
          <div className="genre-list" aria-label="Filter by genre">
            {genres.map((item) => (
              <button
                key={item}
                className={`genre-chip${genre === item ? " selected" : ""}`}
                type="button"
                onClick={() => setGenre(item)}
                aria-pressed={genre === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="collection-caption">HAND-PICKED, NEVER ALGORITHMIC</span>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={() => toggleFavorite(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">⌕</span>
            <h3>No films on this reel.</h3>
            <p>Try another title or genre to find your next favorite.</p>
            <button className="text-button" type="button" onClick={resetFilters}>
              Show all films <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>
    </>
  );
}
