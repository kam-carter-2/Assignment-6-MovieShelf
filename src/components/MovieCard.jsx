import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.some((item) => item.id === movie.id);
    } catch {
      return false;
    }
  });

  const savedToWatchlist = isInWatchlist(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'N/A';

  function toggleFavorite() {
    let favorites = [];

    try {
      favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      favorites = [];
    }

    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('favoritesUpdated'));
  }

  function toggleWatchlist() {
    if (savedToWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  function openDetails() {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  }

  return (
    <div className="movie-card">
      <Link
        to={`/movie/${movie.id}`}
        state={{ movie }}
        className="movie-details-link"
        onClick={openDetails}
      >
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>

          <div className="movie-details">
            <span className="movie-rating">
              ⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}
            </span>
            <span className="movie-year">{year}</span>
          </div>
        </div>
      </Link>

      <div className="movie-actions">
        <button
          className="favorite-button"
          onClick={toggleFavorite}
          type="button"
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>

        <button
          className="watchlist-button"
          onClick={toggleWatchlist}
          type="button"
        >
          {savedToWatchlist
            ? '✓ Remove from Watchlist'
            : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;