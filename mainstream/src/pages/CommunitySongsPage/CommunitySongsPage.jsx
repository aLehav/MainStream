import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './CommunitySongs.css'
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useNavigate ,Link } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const handleNextClick = () => {
    // Navigate to the next page
    navigate('/main');    
  };

  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{ display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faMusic} style={{ marginRight: '1rem' }} />
    {playlist}
    <FontAwesomeIcon icon={faMusic} style={{ marginLeft: '1rem' }} />
  </h1>
  <ul style={{ listStyle: 'none', margin: '2rem 0', padding: 0 }}>
    {songs.map((song) => (
      <li key={song.id} style={{ margin: '-2rem 0' }}>
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
          <span style={{ fontSize: '2.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '1px solid black',
              boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
              marginBottom: '2rem'
            }}>
              <FontAwesomeIcon icon={faChevronUp} style={{ cursor: 'pointer' }} onClick={() => handleVote(song.id, true)} />
            </div>
            <span style={{marginBottom: '2.0rem', marginTop: '-0.25rem', marginLeft: '.25rem', marginRight: '.25rem'}}>{song.votes}</span>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '1px solid black',
              boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
              marginBottom: '2.3rem'
            }}>
              <FontAwesomeIcon icon={faChevronDown} style={{ cursor: 'pointer' }} onClick={() => handleVote(song.id, false)} />
            </div>
          </span>
        </div>
      </li>
    ))}
  </ul>
  <div  style={{ alignContent: "right" }}>
    <button style={{ color: "white", background: "black"}} onClick={handleNextClick}>Main</button>
  </div>
</div>
  );
};

export default CommunitySongsPage;