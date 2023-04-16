import React from 'react';
import './GenrePage.css';
import { useNavigate } from 'react-router-dom';

function GenrePage() {
  const navigate = useNavigate();

  // An array of the genres to be displayed in the grid
  const genres = [
    'Rock', 'Classical', 'Pop', 'Indie', 'K Pop', 'Latin', 
    'Hip-Hop', 'Jazz', 'Blues', 'Dance', 'Gospel', 'EDM', 
    'Reggaeton', 'RnB', 'Folk', 'Oldies', '80s', 'Classic Rock'
  ];

  const handleNextClick = () => {
    // Navigate to the next page
    navigate('/');
  };

  return (
    <div className="genre-page">
      <h1>Your favorite genres...</h1>
      <h2>Choose these to get songs curated towards who you are</h2>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <div className="genre-square" key={index}>
            {genre}
          </div>
        ))}
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default GenrePage;
