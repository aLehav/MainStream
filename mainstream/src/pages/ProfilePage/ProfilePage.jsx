import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage({ user, spotifyApi, communities, clickedCommunities }) {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's saved tracks
    spotifyApi.getMySavedTracks({ limit: 6 }).then((data) => {
      setTracks(data.items);
    });
  }, []);

  const handleNextClick = () => {
    // Navigate to the main page
    navigate('/main');
  };

  return (
<div className="app">
  <div className="black-section" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>  <div id="divImg" style={{ marginLeft: '50px' }}>
    <div id="divImg2">
        <img src={user.images[0].url} alt="Profile" style={{ width: 250, height: 250, borderRadius: '50%', marginBottom: '-150px'}}/>
    </div>
    </div>
    <div id="div1" style={{ marginLeft: '50px'}}>
        <h1 style={{ fontSize: '50px' }} >{user.display_name} is going mainStream.</h1>
    </div>
    <button onClick={handleNextClick} style={{marginTop: '25px', marginLeft: '20px', backgroundColor: "black", color: "white"}} >Find new tracks</button>
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
            {/* <button onClick={handleNextClick}>Find new tracks</button> */}
        </div>
    </div>
        <div className="blue-square">
            <h1 className="square-title" style={{ textAlign: 'center' }}>Social groups</h1>
            <div className="square-content">
            <Link to="/usercommunities">
                <div className="commCircle">
                        <p>My <br></br> community playlists</p>
                        </div>
                    </Link>
            </div>
        </div>
    <div className="blue-square">
        <h1 className="square-title" style={{ textAlign: 'center' }}>Synced Services</h1>
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
