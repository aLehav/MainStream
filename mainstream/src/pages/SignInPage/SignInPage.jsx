import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

function SignInPage( {setAccessToken, setUser, setLoggedIn, spotifyApi, setPlaylist}) {
  const navigate = useNavigate()
  const handleLogin = () => {
    // Replace with your own client ID
    const client_id = "defc685be1564398bccd4fadf624b911";
    const client_secret = "d88a29b018b84f3a800e035537c252a9";
    // const redirect_uri = "https://mainstream-ae719.web.app/";
    const redirect_uri = "http://localhost:3000/"

    // Set the scope for the authentication request
    // const write_scope = "user-library-read";
    const scope = "playlist-modify-public,playlist-read-private,user-library-read";

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
        // setPlaylist("Alcoholics");
        navigate('/genre');
      });
    }
  }, []);

  return (
  <div className="signin-container">
      <div className="background"/>
      <div className="signin-box" style={{ backgroundColor: "#E4F9F5"}}>
      <h1>Go mainStream</h1>
        <button className="signin-button" onClick={handleLogin} style={{ backgroundColor: "black", fontWeight: "bold"}}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignInPage;