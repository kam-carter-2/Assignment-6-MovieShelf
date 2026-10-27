import MovieGrid from '../components/MovieGrid';
import { useMovies } from '../contexts/MovieContext';

function Watchlist() {
  const { watchlist } = useMovies();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch</p>
      </div>

      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty.</p>
          <p>Go to Home and add movies you want to watch!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;