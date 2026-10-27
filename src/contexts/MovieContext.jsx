import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext(null);

function getSavedWatchlist() {
  try {
    return JSON.parse(localStorage.getItem('watchlist') || '[]');
  } catch {
    return [];
  }
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(getSavedWatchlist);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((current) =>
      current.some((item) => item.id === movie.id)
        ? current
        : [...current, movie]
    );
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((current) =>
      current.filter((movie) => movie.id !== movieId)
    );
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId);
  }

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovies must be used inside MovieProvider');
  }

  return context;
}