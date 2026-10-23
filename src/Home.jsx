import { movies } from "../data/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {
  return (
    <div>
      <h1>All Movies</h1>
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            emoji={movie.emoji}
            year={movie.year}
            rating={movie.rating}
          />
        ))}
      </div>
    </div>
  );
}