import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const TrackPlayer = ({ trackId, token }) => {
  useEffect(() => {
    // Initialize the player
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'My cool web player',
        getOAuthToken: (cb) => { cb(token); }
      });

      // Connect to the player
      player.connect().then((success) => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');
        }
      });

      // Play the track
      player.addListener('ready', ({ device_id }) => {
        spotifyApi.play({ uris: [`spotify:track:${trackId}`], device_id: device_id }).then(() => {
          console.log(`Auto-playing track: ${trackId}`);
        });
      });
    };

    // Load the Spotify Web Playback SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [trackId]);

  return (
    <div id="spotify-player" />
  );
};

export default TrackPlayer;
