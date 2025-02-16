
import React, { useState } from "react";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Documentary",
];

const Preferences = ({ onSubmitPreferences }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = () => {
    if (selectedGenres.length > 0) {
      onSubmitPreferences(selectedGenres);
    } else {
      alert("Please select at least one genre");
    }
  };

  return (
    <div className="preferences">
      <h2>Select Your Preferred Genres</h2>
      <div className="genres">
        {genres.map((genre) => (
          <div key={genre}>
            <label>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Preferences</button>
    </div>
  );
};

export default Preferences;
