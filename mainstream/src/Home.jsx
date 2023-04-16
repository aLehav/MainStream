import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Home({ user }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Get the user's saved tracks
    spotifyApi.getMySavedTracks({ limit: 10 }).then((data) => {
      setTracks(data.items);
    });
  }, []);

  return (
    <div>
      <h1>Welcome, {user.display_name}</h1>
      <h2>Your saved tracks:</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.track.id}>{track.track.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
