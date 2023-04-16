import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router-dom";
const spotifyApi = new SpotifyWebApi();

function SignInPage( {setAccessToken, setUser, setLoggedIn}) {
  const navigate = useNavigate()
  const handleLogin = () => {
    // Replace with your own client ID
    const client_id = "defc685be1564398bccd4fadf624b911";
    const client_secret = "d88a29b018b84f3a800e035537c252a9";
    const redirect_uri = "http://localhost:3000/";

    // Set the scope for the authentication request
    const scope = "user-library-read";

    // Create the authorization URL
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&scope=${scope}`;

    // Redirect the user to the authorization URL
    window.location.href = url;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace("#", ""));
    const access_token = params.get("access_token");

    if (access_token) {
      spotifyApi.setAccessToken(access_token);
      setAccessToken(access_token)

      // Get the user's profile
      spotifyApi.getMe().then((data) => {
        setUser(data);
        setLoggedIn(true);
        navigate('/genre');
      });
    }
  }, []);

  return (
    <div>
        <div>
          <h1>Please sign in to Spotify</h1>
          <button onClick={handleLogin}>Sign in</button>
        </div>
    </div>
  );
}

export default SignInPage;