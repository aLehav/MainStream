import React, { useEffect, useState } from "react";

function Home({ user, token }) {
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
      const topTracksIds = ['0IJFVS4gD6ZPxx46OvZZ6M','0k4d5YPDr1r7FX77VdqWez','4vwHBxN5OGtUqqUWvWClGd','6kHiTIk6sgPpMXaGaiLFli','0oigSejhoNen2EdNAIFcm5'];

      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setRecommendedTracks(data.tracks);
    };

    fetchData();
  }, []);

  return (
    <div>
      {recommendedTracks.map(({name, artists}) => (
        <p key={name}>
          {name} by {artists.map(artist => artist.name).join(', ')}
        </p>
      ))}
    </div>
  );
};

export default Home;
