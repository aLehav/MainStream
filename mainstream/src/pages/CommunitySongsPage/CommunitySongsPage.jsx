import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
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

const CommunitySongsPage = ({ playlist }) => {
  const [songs, setSongs] = useState([]);
  console.log(playlist)
  useEffect(() => {
    const db = getFirestore();
    const songsRef = collection(db, playlist);

    onSnapshot(songsRef, (querySnapshot) => {
      const songsList = [];
      querySnapshot.forEach((doc) => {
        songsList.push({ id: doc.id, ...doc.data() });
      });
      songsList.sort((a,b) => b.votes - a.votes)
      setSongs(songsList);
    });
  }, [playlist]);

  const handleVote = async (songId, increment) => {
    const db = getFirestore();
    const songRef = doc(db, playlist, songId);
    const songDoc = await getDoc(songRef);
    const votes = songDoc.data().votes;
    await updateDoc(songRef, { votes: increment ? votes + 1 : votes - 1 });
  }

  return (
    <div>
      <h1>{playlist}</h1>
      <ul style={{ listStyle: 'none', margin: '1rem 0' }}>
        {songs.map((song) => (
          <li key={song.id} style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              <iframe
                src={`https://open.spotify.com/embed/track/${song.id}`}
                width="500"
                height="120"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                style={{ marginRight: '1rem' }}
              ></iframe>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '1rem', display: 'inline-flex', flexDirection: 'column', justifyContent: 'center' }}>{song.votes}
                <FontAwesomeIcon icon={faChevronUp} style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={() => handleVote(song.id, true)} />
                <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '0.5rem', cursor: 'pointer' }} onClick={() => handleVote(song.id, false)} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySongsPage;