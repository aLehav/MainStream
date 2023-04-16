import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SignInPage from './pages/SignInPage/SignInPage';
import GenrePage from './pages/GenrePage/GenrePage';
import CommunityMatchingPage from './pages/CommunityMatchingPage/CommunityMatchingPage'

/* Create a useState variable storing the person's chosen communities and pass the setState and actual
   variable to CommunityPage, update the variable when someone clicks on one of the communities, and change the color of
   communities when selected or not selected. Also update CSS if you'd like.
*/

const spotifyApi = new SpotifyWebApi();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [access_token, setAccessToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path='/'
          element={<SignInPage setAccessToken={setAccessToken} setUser={setUser} setLoggedIn={setLoggedIn}/>}
        />
        <Route path='/genre'
          element={<GenrePage user={user} token={access_token}/>}
        />
        <Route path='/community'
          element={<CommunityMatchingPage />}
        />
        {/* <Route path='/main'>
          <MainMatchingPage />
        </Route> */}
        {/* <Redirect to='/signin' /> */}
      </Routes>
    </Router>
  );
}

export default App;