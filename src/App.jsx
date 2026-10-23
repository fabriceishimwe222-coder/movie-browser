import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { movies } from "./data/movies";
import Layout from "./components/Layout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

function readFavorites() {
  try {
    const savedFavorites = localStorage.getItem("favorites");
    if (!savedFavorites) return [];

    const parsedFavorites = JSON.parse(savedFavorites);
    if (!Array.isArray(parsedFavorites)) return [];

    return parsedFavorites.filter(
      (id) => Number.isInteger(id) && movies.some((movie) => movie.id === id),
    );
  } catch (error) {
    console.error("Could not read saved favorites.", error);
    return [];
  }
}

export default function App() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id],
    );
  }

  return (
    <Routes>
      <Route element={<Layout favoritesCount={favorites.length} />}>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
