import React, { useState } from 'react';
import './UserCommunitiesPage.css';
import { useNavigate,Link } from 'react-router-dom';

function UserCommunitiesPage({ communities, clickedCommunities, setPlaylist}){
       // console.log(clickedCommunities)
    const navigate = useNavigate();
    
    const handleNextClick = () => {
    // Navigate to the next page
    navigate('/main');    
  };

       return (
        <div className="user-communities-page2">
        <h1>Your communities</h1>
        <div className="community-grid2">
          {/* {communities.map((community, index) => (
            <div className="community-circle" key={index}>
              {community}
            </div>
          ))} */}
            {clickedCommunities.map((title, index) => (
            <div
            className={`community-circle2`} 
            key={index}>
            <span onClick={() => {
              setPlaylist(title)
              navigate('/communitysongs')
            }} style={{ color: "Black", textDecoration: "none", fontSize: "30px", cursor: "pointer"}}>
              {title}
            </span>
            <p>{Math.floor(Math.random() * 10000) + 1}
            <br/>
            Listeners</p>
            </div>
       ))}
        </div>
        <button onClick={handleNextClick}>Main</button>
      </div>
    );
  }
  
export default UserCommunitiesPage;