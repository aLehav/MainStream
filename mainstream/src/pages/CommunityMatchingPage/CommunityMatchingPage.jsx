import React, { useState } from 'react';
import './CommunityMatchingPage.css';
import { useNavigate, Link } from 'react-router-dom';

function CommunityMatchingPage({ communities, clickedCommunities, setClickedCommunities}) {
  const navigate = useNavigate();

  // An array of the communities to be displayed in the grid
  

   // State to keep track of the clicked communities

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
    navigate('/profile');
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
           className={`community-circle ${clickedCommunities.includes(community[0]) ? 'clicked' : ''}`} 
           key={index} 
           onClick={() => handleCommunityClick(community[0])}
         >
           {community[0]}
         </div>
       ))}
      </div>
      <Link to="/main"><button onClick={handleNextClick}>Next</button></Link>
    </div>
  );
}

export default CommunityMatchingPage;
