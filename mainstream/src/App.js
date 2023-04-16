import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import SignInPage from './pages/SignInPage/SignInPage';
import GenrePage from './pages/GenrePage/GenrePage';
import CommunityMatchingPage from './pages/CommunityMatchingPage/CommunityMatchingPage'


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