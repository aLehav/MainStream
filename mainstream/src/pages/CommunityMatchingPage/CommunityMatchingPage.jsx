import React, { useState } from 'react';
import './CommunityMatchingPage.css';
import { useNavigate } from 'react-router-dom';

function CommunityMatchingPage() {
  const navigate = useNavigate();

  // An array of the communities to be displayed in the grid
  const communities = [
    'Gym', 'Office', 'USC', 'Study', 'Party', 'Pregame',
    'Cooking', 'Hiking', 'LA', '420', 'Basketball', 'Snow Sports',
    'Beach Lovers', 'Racing', 'Real Ravers', 'Y2K', 'Alcoholics', 'Goth'
  ];

   // State to keep track of the clicked communities
 const [clickedCommunities, setClickedCommunities] = useState([]);

 const handleCommunityClick = (community) => {
   // Add or remove the clicked communities from the state
   if (clickedCommunities.includes(community)) {
    setClickedCommunities(clickedCommunities.filter(c => c !== community));
   } else {
    setClickedCommunities([...clickedCommunities, community]);
   }
 };


  const handleNextClick = () => {
    // Navigate to the next page
    navigate('/');
  };

  return (
    <div className="community-matching-page">
      <h1>Select your communities</h1>
      <h2>Choose community playlists to contribute and listen to</h2>
      <div className="community-grid">
        {/* {communities.map((community, index) => (
          <div className="community-circle" key={index}>
            {community}
          </div>
        ))} */}
        {communities.map((community, index) => (
         <div 
           className={`community-circle ${clickedCommunities.includes(community) ? 'clicked' : ''}`} 
           key={index} 
           onClick={() => handleCommunityClick(community)}
         >
           {community}
         </div>
       ))}
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default CommunityMatchingPage;
