import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import './CommunitySongs.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6z2rHuCtDPkL2YZd5vXfArcJ0tLh9LZA",
  authDomain: "mainstream-ae719.firebaseapp.com",
  projectId: "mainstream-ae719",
  storageBucket: "mainstream-ae719.appspot.com",
  messagingSenderId: "419387976210",
  appId: "1:419387976210:web:a831bc5b744b9a5ac706cb",
  measurementId: "G-GHJ05N7MZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const CommunitySongsPage = ({ playlist, token }) => {
  const [songs, setSongs] = useState([]);
  const [tracks, setTracks] = useState([]);
  console.log(playlist)
  useEffect(() => {
    const db = getFirestore();
    const songsRef = collection(db, playlist);

    onSnapshot(songsRef, (querySnapshot) => {
      const songsList = [];
      querySnapshot.forEach((doc) => {
        songsList.push({ id: doc.id, ...doc.data() });
      });
      setSongs(songsList);
    });

    if (songs.length > 0) {
      const trackIds = songs.map(song => song.id);
      const limit = 5; // you can set the number of recommended tracks to fetch
      
      fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${trackIds.join()}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.tracks);
        })
        .catch((error) => {
          console.error("Error fetching recommended tracks", error);
        });
    }
  }, [playlist]);

  return (
    <div>
      <h1>{playlist}</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.id} with votes of {song.votes}
          </li>
        ))}
        {/* {recommendedTracks.map(({name, artists, album}) => (
          <div className="song-container" key={name}>
            <img src={album.images[0].url} alt="cover" className="song-cover" />
            <div className="song-details">
              <p className="song-name">{name}</p>
              <p className="song-artist">{artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))} */}
      </ul>
    </div>
  );
};

export default CommunitySongsPage;