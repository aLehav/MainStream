import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import GenrePage from './pages/GenrePage/GenrePage';
import CommunityMatchingPage from './pages/CommunityMatchingPage/CommunityMatchingPage'
import MainMatchingPage from './pages/MainMatchingPage/MainMatchingPage'
import UserCommunitiesPage from './pages/UserCommunitiesPage/UserCommunitiesPage';

/* Create a useState variable storing the person's chosen communities and pass the setState and actual
   variable to CommunityPage, update the variable when someone clicks on one of the communities, and change the color of
   communities when selected or not selected. Also update CSS if you'd like.
*/

const spotifyApi = new SpotifyWebApi();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [clickedCommunities, setClickedCommunities] = useState([]);

  const communities = [
    ['Gym', "4RfmVp5Cbqb3oTckjf17o6"], ['Office', "0GTW51Vyz1U7gwbIy0mezR"], ['USC', "5cenpF6YjGxhEWZem0NUCE"], ['Study', "4KwNadVCs3npNPt9aa5KRQ"], ['Party', "0Q4UkzQROHUhO1SXHiLjlZ"], ['Pregame', "21dZhooV02njlh9p0V2gXm"],
    ['Cooking', "65nXi2iPImAgDcqyockUoW"], ['Hiking', "1syo8sUvBHjzCkefwKXH47"], ['LA', "779t1AfVXUPcPieXJ5vkoq"], ['420', "3r4gdxyLWZUz7zasdQFSi4"], ['Basketball', "4tSBI12TPQgs61huq7yHoJ"], ['Snow Sports', "7KIEXjW1kKR1t1fuESFVux"],
    ['Beach Lovers', "3MKAOgmwe431oQulfI7GsZ"], ['Racing', "5x0d6DZNJjoodsfDvJA96Q"], ['Real Ravers', "4wLcHfw7FszWZCgrfsVAbt"], ['Y2K', "55K7VfHWtCJ4c4Nyd99DK8"], ['Alcoholics', "3UXGLQRTjV0w3poxN0QSV9"], ['Goth', "20KdCAN0lcqyfuXFCPJJ4K"]
  ];

  return (
    <Router>
      <Routes>
        <Route path='/'
          element={<SignInPage setAccessToken={setAccessToken} setUser={setUser} setLoggedIn={setLoggedIn} spotifyApi={spotifyApi}/>}
        />
        <Route path='/genre'
          element={<GenrePage user={user} token={access_token}/>}
        />
        <Route path='/community'
          element={<CommunityMatchingPage communities={communities} clickedCommunities={clickedCommunities} setClickedCommunities={setClickedCommunities}/>}
        />
        <Route path='/main'
          element={<MainMatchingPage user={user} token={access_token} communities={communities} clickedCommunities={clickedCommunities}/>}
        />
        <Route path='/usercommunities'
          element={<UserCommunitiesPage communities={communities} clickedCommunities={clickedCommunities}/>}
        />
        <Route path='/profile'
          element={<ProfilePage user={user} token={access_token}/>}
        />
        {/* <Redirect to='/signin' /> */}
      </Routes>
    </Router>
  );
}

export default App;