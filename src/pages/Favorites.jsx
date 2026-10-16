
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    function loadFavorites() {
      const savedFavorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );

      setFavoriteMovies(savedFavorites);
    }

    loadFavorites();

    window.addEventListener('storage', loadFavorites);
    window.addEventListener('favoritesUpdated', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
      window.removeEventListener('favoritesUpdated', loadFavorites);
    };
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>

      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
