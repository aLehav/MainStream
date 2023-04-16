import React, { useState } from 'react';
import './UserCommunitiesPage.css';
import { useNavigate } from 'react-router-dom';

function UserCommunitiesPage({ communities, clickedCommunities, testprop}){
       // console.log(clickedCommunities)
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
            {title}
           <br/>
            {Math.floor(Math.random() * 999) + 1}
            <br/>
            Listeners
            </div>
       ))}
        </div>
      </div>
    );
  }
  
export default UserCommunitiesPage;