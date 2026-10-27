import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './contexts/MovieContext';
import './App.css';

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;