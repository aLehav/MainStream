import React, { useEffect, useState } from "react";
import "./MainMatchingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function MainMatchingPage({ user, token }) {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const playlists = ['0JNZ6fXVVCjnqIFFDAgxBs'];

  const fetchPlaylistTracks = async () => {
    const response = await fetch(
      "https://api.spotify.com/v1/playlists/"+playlists[0]+"/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    const tracks = data.items.map((item) => item.track.id);
    const randomTracks = shuffle(tracks).slice(0, 5);
    return randomTracks;
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  };

const fetchData = async () => {
  const topTracksIds = await fetchPlaylistTracks();

  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=${topTracksIds.join(
      ","
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  setRecommendedTracks(data.tracks);
};

  useEffect(() => {
    fetchData();

    // Add event listener for the arrow key press
    const handleArrowPress = async (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      }
      else if (event.key === "ArrowLeft") {
        handleReject();
      }
    };

    document.addEventListener("keydown", handleArrowPress);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener("keydown", handleArrowPress);
    };
  }, []);

  const handleNext = async () => {
    setShowModal(true);
  };

  const handleReject = async () => {
    setShowModal(false);
    await fetchData();
  }

  const handleModalClose = async () => {
    setShowModal(false);
    await fetchData();
  }

  return (
    <div
      className="container"
      style={{
        backgroundImage: recommendedTracks[0]?.album?.images[0]?.url && `url(${recommendedTracks[0].album.images[0].url})`
      }}
    >
    <Modal
        isOpen={showModal}
        onRequestClose={() => {handleModalClose()}}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2>Modal Title</h2>
        <p>Modal Content</p>
        {playlists.map((playlist, i) => (
          <div key={i}>
            Playlist:
            {playlist}
          </div>
        ))}
    </Modal>
    {recommendedTracks.map(({name, artists, album}) => (
      <div className="song-container" key={name}>
        <img src={album.images[0].url} alt="cover" className="song-cover" />
        <div className="song-details">
          <p className="song-name">{name}</p>
          <p className="song-artist">{artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
    ))}
    <div className="buttons-container">
      <button className="next-button" onClick={handleNext}>
      <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <button className="reject-button" onClick={handleReject}>
      <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  </div>
  );
};

export default MainMatchingPage;
