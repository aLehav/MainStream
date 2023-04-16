import React, { useState } from 'react';
import './UserCommunitiesPage.css';
import { useNavigate,Link } from 'react-router-dom';

function UserCommunitiesPage({ communities, clickedCommunities, testprop}){
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
            <Link to='/'>{title}</Link>
           <br/>
            {Math.floor(Math.random() * 999) + 1}
            <br/>
            Listeners
            </div>
       ))}
        </div>
        <button onClick={handleNextClick}>Main</button>
      </div>
    );
  }
  
export default UserCommunitiesPage;