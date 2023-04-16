import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

function ProfilePage({ user, spotifyApi }) {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's saved tracks
    spotifyApi.getMySavedTracks({ limit: 6 }).then((data) => {
      setTracks(data.items);
    });
  }, []);

  return (
<div className="app">
  <div className="black-section" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <div id="divImg" style={{ marginLeft: '50px' }}>
    <div id="divImg2">
        <img src={user.images[0].url} alt="Profile" style={{ width: 250, height: 250, borderRadius: '50%'}}/>
    </div>
    </div>
    <div id="div1" style={{ marginLeft: '50px'}}>
        <h1 style={{ fontSize: '100px' }} >{user.display_name} is going mainstream.</h1>
    </div>
  </div>
  <div className="white-section">
    <div className="blue-square">
        <h1 className="square-title" style={{ textAlign: 'center' }}>Liked songs</h1>
        <div className="square-content">
            <div className="album-grid">
                {tracks.slice(0, 6).map((track) => (
                    <div key={track.track.id} className="album-container">
                    <img src={track.track.album.images[0].url} alt={track.track.album.name} style={{ height: '130px' }}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    <div className="blue-square">
        <h1 className="square-title" style={{ textAlign: 'center' }}>Communities</h1>
        <div className="square-content">

        </div>
    </div>
    <div className="blue-square">
        <h1 className="square-title" style={{ textAlign: 'center' }}>Services</h1>
        <div className="square-content">
            <div className="image-grid">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" alt="Image 1" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png" alt="Image 4" />
                <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png" alt="Image 2" />
                <img src="https://cdn-icons-png.flaticon.com/512/145/145809.png" alt="Image 3" />
            </div>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" alt="apple" /> */}
        </div>
    </div>
  </div>
</div>

  );
}

export default ProfilePage;
