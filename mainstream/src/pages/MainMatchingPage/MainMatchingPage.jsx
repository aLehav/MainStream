import React, { useEffect, useState } from "react";
import "./MainMatchingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function MainMatchingPage({ user, token, communities, clickedCommunities }) {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const playlists = clickedCommunities.map(clicked => {
    const community = communities.find(c => c[0] === clicked);
    return community ? community : null;
  }).filter(Boolean);

  const fetchPlaylistTracks = async (playlist) => {
    const response = await fetch(
      "https://api.spotify.com/v1/playlists/"+playlist[1]+"/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    const tracks = data.items.map((item) => item.track.id);
    // const randomTracks = shuffle(tracks).slice(0, 5);
    return tracks;
  };

  const fetchTracksForAllPlaylists = async (playlists) => {
    const tracks = await playlists.reduce(async (prevPromise, playlist) => {
      const prevTracks = await prevPromise;
      const playlistTracks = await fetchPlaylistTracks(playlist);
      return prevTracks.concat(playlistTracks);
    }, Promise.resolve([]));
    return tracks;
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
  const topTracksIds = await fetchTracksForAllPlaylists(playlists)
  console.log(shuffle(topTracksIds).slice(0,5))

  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=${shuffle(topTracksIds).slice(0,5).join(
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

  const handleAddSong = async (playlist) => {
      const songUri = recommendedTracks[0].uri;
      console.log(songUri)
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist[1]}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`          
          },
          body: JSON.stringify({
            uris: [songUri]
          })
        });
        
        if (response.ok) {
          console.log('Song added to playlist successfully!', response);
        } else {
          console.error('Error adding song to playlist:', response.status);
        }
      } catch (error) {
        console.error('Error adding song to playlist:', error);
      }
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
        style={{
          content: {
            width: "25%",
            height: "50%",
            marginTop: "10%",
            maxWidth: "none",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <h2>Add Song</h2>
        <p>Add this song to one of your own playlists</p>
        {playlists.map((playlist, i) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {playlists.map((playlist, i) => (
              <button key={i} onClick={() => {handleAddSong(playlist[1])}}>Add Song to {playlist[0]}</button>
            ))}
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