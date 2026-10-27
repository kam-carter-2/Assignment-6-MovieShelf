import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useMovies();

  const [movie, setMovie] = useState(() => {
    if (String(location.state?.movie?.id) === id) {
      return location.state.movie;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('selectedMovie') || 'null');
      return String(saved?.id) === id ? saved : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (String(location.state?.movie?.id) === id) {
      setMovie(location.state.movie);
    }
  }, [id, location.state]);

  if (!movie) {
    return (
      <main className="main-content">
        <h2>Movie details unavailable</h2>
        <p>Open this movie from the Home page to view its details.</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </main>
    );
  }

  const saved = isInWatchlist(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster';

  return (
    <main className="main-content">
      <div className="details-page">
        <img
          className="details-poster"
          src={posterUrl}
          alt={movie.title}
        />

        <div className="details-info">
          <h2>{movie.title}</h2>

          <p>
            <strong>Release date:</strong>{' '}
            {movie.release_date || 'Not available'}
          </p>

          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10
          </p>

          <p className="movie-overview">
            {movie.overview || 'No overview is available for this movie.'}
          </p>

          <button
            type="button"
            className="watchlist-button"
            onClick={() =>
              saved
                ? removeFromWatchlist(movie.id)
                : addToWatchlist(movie)
            }
          >
            {saved ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
          </button>

          <p>
            <Link to="/" className="back-link">Back to Home</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;