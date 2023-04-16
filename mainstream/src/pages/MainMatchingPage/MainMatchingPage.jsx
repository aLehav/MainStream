import React, { useEffect, useState } from "react";
import "./MainMatchingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function MainMatchingPage({ user, token, communities, clickedCommunities }) {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allTracks, setAllTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const response = await fetch (
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const playlistids = data.items.map((item) => [item.name, item.id]);
    const playlists = clickedCommunities.map(clicked => {
      const community = playlistids.find(c => c[0] === clicked);
      if (community) {
        console.log(`${clicked} found`);
        return community[1];
      } else {
        console.log(`${clicked} added as a playlist`);
        return makePlaylist(clicked);
      }
    }).filter(Boolean);
    console.log(playlists);
    setPlaylists(playlists);
    return(playlists);
  }

  const makePlaylist = async (name) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const fetchPlaylistTracks = async (playlist) => {
    const response = await fetch(
      "https://api.spotify.com/v1/playlists/"+playlist+"/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    const tracks = data.items.map((item) => item.track.id);
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

const fetchData = async (tracks) => {
  
  const topTracksIds = await shuffle(tracks).slice(0,5);

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
    const does = async () => {
      const playlists = await fetchPlaylists()
      const tracks = await playlists.map(async playlist => {
        return await fetchPlaylistTracks(playlist)
      });
      setAllTracks(tracks)
      fetchData(tracks)
    }
    does()

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
    await fetchData(allTracks);
  }

  const handleModalClose = async () => {
    setShowModal(false);
    await fetchData(allTracks);
  }

  const handleAddSong = async (playlist) => {
      const songUri = recommendedTracks[0].uri;
      console.log(songUri)
      try {
          // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
        const token = 'BQBARu8wL_zDBHxvfLGubDVtaR7BhmcMcCNAWMTiES9tTaladC3j_nEwFc68OLz8U5Akc5UIi4H6CdzqJN64nsp6py4IpW3xvEXY2ouGzPDx1EGEiTV6wzLnpaW6QFOEhdV2o5l2kGDHua81kncdV0d2SVC5tsk9kZ6ZnfFOBWsdwVPc2N64ieNEfZcqVUZsUZ9yKaOAmWc362VJvPdEyf5JUgAVaB59YCf1gArkjaSZeBTLqD7iaorszry4cT27xnQhS4OXAphKSDd3Ual4LGM-5-VI0PRv7P5ITlGGUUYnUyBkSzOulSfiUrjZxQ828OdA1g-iUpYQPSlLAcuFYc8118JHIeo-fDF_0HMs13FHhj4';
        async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method,
          body:JSON.stringify(body)
        });
        return await res.json();
      }

      // const tracksUri = [
        // 'spotify:track:0IJFVS4gD6ZPxx46OvZZ6M','spotify:track:38xXr3MkiKNzNDv4JDJagF','spotify:track:0k4d5YPDr1r7FX77VdqWez','spotify:track:1ayV64ur8VWgc6OPtPRl1q','spotify:track:4vwHBxN5OGtUqqUWvWClGd','spotify:track:3DczK9W32LbRORCP80kz6o','spotify:track:6kHiTIk6sgPpMXaGaiLFli','spotify:track:3lzX0mU3pfXOQRnH0ryZJR','spotify:track:0oigSejhoNen2EdNAIFcm5','spotify:track:10VswkKQPr9AuvtbgB5NXH'
      // ];
      const tracksUri = [songUri]
      const user_id = '21kotrleim5po6yhvs4fjf6zy';

      async function createPlaylist(tracksUri){
        // return await fetchWebApi(
        //   `v1/users/${user_id}/playlists`, 'POST', {
        //     "name": "My recommendation playlist",
        //     "description": "Playlist created by the tutorial on developer.spotify.com",
        //     "public": false
        // }).then(playlist => {
        //   fetchWebApi(
        //     `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        //     'POST'
        //   );
        //   return playlist;
        // })
        return await fetchWebApi(
          `v1/playlists/4RfmVp5Cbqb3oTckjf17o6/tracks?uris=${tracksUri.join(',')}`,
          'POST'
        );
      }

      const createdPlaylist = await createPlaylist(tracksUri);
      console.log(createdPlaylist.name, createdPlaylist.id);

      
        // const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
        //   method: 'POST',
        //   headers: {
        //     Authorization: `Bearer ${token}`          
        //   },
        //   body: JSON.stringify({
        //     uris: [songUri]
        //   })
        // });
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
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
        <h2>Modal Title</h2>
        <p>Modal Content</p>
        {playlists.map((playlist, i) => (
          <div key={i}>
            Playlist:
            <button onClick={() => {handleAddSong(playlist)}}>Add Song to {playlist}</button>
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
