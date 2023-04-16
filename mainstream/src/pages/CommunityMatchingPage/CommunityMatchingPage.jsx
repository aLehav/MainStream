import React, { useState } from 'react';
import './CommunityMatchingPage.css';
import { useNavigate } from 'react-router-dom';

function CommunityMatchingPage() {
  const navigate = useNavigate();

  // An array of the communities to be displayed in the grid
  const communities = [
    ['Gym', "4RfmVp5Cbqb3oTckjf17o6"], ['Office', "0GTW51Vyz1U7gwbIy0mezR"], ['USC', "5cenpF6YjGxhEWZem0NUCE"], ['Study', "4KwNadVCs3npNPt9aa5KRQ"], ['Party', "0Q4UkzQROHUhO1SXHiLjlZ"], ['Pregame', "21dZhooV02njlh9p0V2gXm"],
    ['Cooking', "65nXi2iPImAgDcqyockUoW"], ['Hiking', "1syo8sUvBHjzCkefwKXH47"], ['LA', "779t1AfVXUPcPieXJ5vkoq"], ['420', "3r4gdxyLWZUz7zasdQFSi4"], ['Basketball', "4tSBI12TPQgs61huq7yHoJ"], ['Snow Sports', "7KIEXjW1kKR1t1fuESFVux"],
    ['Beach Lovers', "3MKAOgmwe431oQulfI7GsZ"], ['Racing', "5x0d6DZNJjoodsfDvJA96Q"], ['Real Ravers', "4wLcHfw7FszWZCgrfsVAbt"], ['Y2K', "55K7VfHWtCJ4c4Nyd99DK8"], ['Alcoholics', "3UXGLQRTjV0w3poxN0QSV9"], ['Goth', "20KdCAN0lcqyfuXFCPJJ4K"]
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
           className={`community-circle ${clickedCommunities.includes(community[0]) ? 'clicked' : ''}`} 
           key={index} 
           onClick={() => handleCommunityClick(community[0])}
         >
           {community[0]}
         </div>
       ))}
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default CommunityMatchingPage;
