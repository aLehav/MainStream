import React, { useEffect, useState } from "react";
import "./MainMatchingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

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
    const songID = recommendedTracks[0].id;
    setShowModal(false);
  
    try {
      await fetch(`https://api.spotify.com/v1/me/tracks?ids=${songID}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      console.log('Track saved!');
    } catch (error) {
      console.error('Error saving track:', error);
    }
  
    await fetchData();
  }

  return (
    <div className="centerContent">
    <div
      className="container"
      style={{
        backgroundImage: recommendedTracks[0]?.album?.images[0]?.url && `url(${recommendedTracks[0].album.images[0].url})`
      }}
    >
    <div className="pfpImage">
      <Link to="/profile">
        <img src={user.images[0].url} alt="Profile" style={{
        position: "absolute", /* Add this rule */
        top: 0, /* Add this rule */
        right: 0, /* Add this rule */
        width: 150,
        height: 150,
        borderRadius: "50%",
        marginTop: '40px',
        marginRight: '40px'
      }}/>
    </Link>
  </div>
    {recommendedTracks[0] && (<iframe
      title="Spotify Embed: Recommendation Playlist "
      src={`https://open.spotify.com/embed/track/${recommendedTracks[0].id}?utm_source=generator&theme=0&autoplay=1`}
      width="30%"
      height="100%"
      style={{ minHeight: '360px' }}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />)}
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
            backgroundColor: "white"
          },
        }}
      >
        <h2 style={{ fontSize: "35px"}} >Add to community playlist</h2>
        <p>Which community playlist is the best fit for this song?</p>
        {playlists.map((playlist, i) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <button key={i} onClick={() => {handleAddSong(playlist[1])}} style={{ backgroundColor: "black", color: "white"}}>Add to {playlist[0]}</button>
          </div>
        ))}
    </Modal>
    {/* {recommendedTracks.map(({name, artists, album}) => (
      <div className="song-container" key={name}>
        <img src={album.images[0].url} alt="cover" className="song-cover" />
        <div className="song-details">
          <p className="song-name">{name}</p>
          <p className="song-artist">{artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
    ))} */}
    <div className="buttons-container">
      <button className="next-button" onClick={handleNext} style={{ backgroundColor: "white"}}>
      <FontAwesomeIcon icon={faHeart} />
      </button>
      <button className="reject-button" onClick={handleReject} style={{ backgroundColor: "white"}}>
      <FontAwesomeIcon icon={faX} />
      </button>
    </div>
    </div>
  </div>
  );
};

export default MainMatchingPage;