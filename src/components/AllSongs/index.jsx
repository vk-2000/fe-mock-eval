import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_SONGS } from '../../constants/apiEndPoints';
import iconGenre from '../../assets/images/icon-genre.svg';
import makeRequest from '../../utils/makeRequest/makeRequest';
import './AllSongs.css';
import SongCard from '../SongCard';

const AllSongs = () => {
  const [songs, setSongs] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(GET_ALL_SONGS, {}, navigate).then((response) => {
      const allSongs = response.data;
      if (allSongs.length === 0) {
        navigate('/no-records');
      }
      setSongs(allSongs);
    });
  }, []);
  return (
    (songs) ? (
      <div className="songs-body">
        <div className="songs-header">
          <div>
            <h1>All Songs</h1>
          </div>
          <button data-testid="btn-genre" className="btn-genre" type="button" onClick={() => navigate('/categories')}>
            <img src={iconGenre} alt="icon_genre" />
          </button>
        </div>
        <div className="songs-container">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    )
      : <div>Loading...</div>

  );
};

export default AllSongs;
