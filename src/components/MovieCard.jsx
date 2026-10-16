
import { useState } from 'react';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    return favorites.some((item) => item.id === movie.id);
  });

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'N/A';

  function toggleFavorite() {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites, movie];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event('favoritesUpdated'));
  }

  return (
    <div className="movie-card">
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

        <button
          className="favorite-button"
          onClick={toggleFavorite}
          type="button"
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
