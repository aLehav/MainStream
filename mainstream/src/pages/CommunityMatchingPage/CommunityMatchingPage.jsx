import React, { useState } from 'react';
import './CommunityMatchingPage.css';
import { useNavigate } from 'react-router-dom';

function CommunityMatchingPage() {
  const navigate = useNavigate();

  // An array of the communities to be displayed in the grid
  const communities = [
    'Gym', 'Office', 'USC', 'Study', 'Party', 'Pregame',
    'Cooking', 'Hiking', 'LA', '420', 'Basketball', 'Snow Sports',
    'Beach Lovers', 'Racing', 'Real Ravers', 'Y2K'
  ];

  const handleNextClick = () => {
    // Navigate to the next page
    navigate('/');
  };

  return (
    <div className="community-matching-page">
      <h1>Choose your communities</h1>
      <h2>Description about how this suggests/customizes the songs to you</h2>
      <div className="community-grid">
        {communities.map((community, index) => (
          <div className="community-circle" key={index}>
            {community}
          </div>
        ))}
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default CommunityMatchingPage;
