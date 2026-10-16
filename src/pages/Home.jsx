
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import {
  getPopularMovies,
  searchMovies,
} from '../services/movieService';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const query = searchParams.get('search') || '';

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError('');

        const results = query.trim()
          ? await searchMovies(query.trim())
          : await getPopularMovies();

        setMovies(results);
      } catch (err) {
        console.error('Error loading movies:', err);
        setError(err.message || 'Unable to load movies.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{query ? `Search Results: ${query}` : 'Popular Movies'}</h2>
        <p>
          {query
            ? 'Movies matching your search'
            : 'Discover and save your favorite films'}
        </p>
      </div>

      {loading && <p>Loading movies...</p>}

      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found. Try another search.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}

export default Home;
