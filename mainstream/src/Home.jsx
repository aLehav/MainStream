import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Home({ user }) {
  const [tracks, setTracks] = useState([]);
  const [audioFeatures, setAudioFeatures] = useState(null);

  useEffect(() => {
    // Get the user's saved tracks
    spotifyApi.getMySavedTracks({ limit: 10 }).then((data) => {
      setTracks(data.items);
      const lastTrack = data.items[0];
      spotifyApi.getAudioFeaturesForTrack(lastTrack.track.id)
          .then((data) => {
            setAudioFeatures(data);
          })
          .catch((error) => {
            console.error(error);
          });
    });
  }, []);

  return (
    <div>
      <h1>Welcome, {user.display_name}. You have {user.followers.total} followers.</h1>
      <img src={user.images[0].url} alt="Profile" style={{ width: 150, height: 150 }}/>
      <h2>Your saved tracks:</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.track.id}>{track.track.name}</li>
        ))}
      </ul>
      <h2>Your last saved track ({tracks[0].track.name}):</h2>
      {tracks.length > 0 && (
        <div>
          {audioFeatures && (
            <div>
              <p>Danceability: {audioFeatures.danceability}</p>
              <p>Energy: {audioFeatures.energy}</p>
              <p>Speechiness: {audioFeatures.speechiness}</p>
              <p>Acousticness: {audioFeatures.acousticness}</p>
              <p>Instrumentalness: {audioFeatures.instrumentalness}</p>
              <p>Liveness: {audioFeatures.liveness}</p>
              <p>Valence: {audioFeatures.valence}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
