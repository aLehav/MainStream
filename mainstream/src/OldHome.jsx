import React, { useEffect, useState } from "react";

const Home = () => {
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
      const token = 'BQCbioXI-T3tifwLcQgJ6SYZrYhAZFCyyfZeViPRW94y6RLapgdf2r9anUXwdEbP-hbIW8NBsseGjAh8JiOzTj9NGh5fQJu5-u3rLb75Ny91zPdljtTJz4TysIr62WdtSHDlnbXrJ0elxqdgsNybETewfl0jjGnR6DDwhOpS06V1qEhu3TsHODK0AgUA3wPGl4OvkDXtNGzJV-hxYoibNrCPAEYspqw2l6vKZ030NVWr-NrDwB_tVdXxmekHBlUbN9a3qrW7pKyoUpFQEKDbzNPK0h8ZTjovQ4JZdvtufFOXlfqUq0clkLNMbM0lEVTLUcHdoOlpTPIjvCrShaHpr19uoTpH1T3tghV-YGBemyhGHiw';
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
