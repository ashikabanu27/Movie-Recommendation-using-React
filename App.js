// App.js
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import Login from "./Login";
import Preferences from "./Preferences";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null); // State to track user login status
  const [preferences, setPreferences] = useState(null); // State for genre preferences

  useEffect(() => {
    if (preferences) {
      fetchRecommendedMovies(preferences);
    }
  }, [preferences]);

  const fetchRecommendedMovies = async (genres) => {
    const genreString = genres.join(",");
    // Fetch movies based on preferred genres
    const response = await fetch(`${API_URL}&s=${genres[0]}`); // Simplified search based on the first genre for demonstration
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handlePreferencesSubmit = (selectedGenres) => {
    setPreferences(selectedGenres);
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : !preferences ? (
        <Preferences onSubmitPreferences={handlePreferencesSubmit} />
      ) : (
        <>
          <h1>MovieLand</h1>
          <p>Welcome, {user.name}!</p>
          <div className="search">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies"
            />
            <img
              src={SearchIcon}
              alt="search"
              onClick={() => fetchRecommendedMovies([searchTerm])}
            />
          </div>

          {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
