import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SongCategories.css';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { GET_ALL_SONGS } from '../../constants/apiEndPoints';
import iconGrid from '../../assets/images/icon-grid.svg';
import SongCard from '../SongCard';
import genreIcons from '../../constants/genreIcons';

const SongCategories = () => {
  const [songCategorized, setSongsCategorized] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    makeRequest(GET_ALL_SONGS, {}, navigate).then((response) => {
      const songs = response.data;
      const categorizedSongs = songs.reduce(
        (acc, song) => {
          const category = song.genre.name;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(song);
          return acc;
        },
        {},
      );
      setSongsCategorized(categorizedSongs);
    });
  }, []);

  return (
    <div className="songs-body">
      <div className="songs-header">
        <div>
          <h1>Genres</h1>
        </div>
        <button onClick={() => navigate('/')} className="btn-grid" type="button">
          <img src={iconGrid} alt="icon_grid" />
        </button>
      </div>
      <div className="category-body">
        {Object.keys(songCategorized).map((category) => (
          <div className="category-container">
            <div className="category-header">
              <img src={genreIcons[category.toLowerCase()]} alt={category} />
              <h3>{category}</h3>
            </div>
            <div className="category-songs">
              {songCategorized[category].map((song) => (
                <SongCard song={song} />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>

  );
};

export default SongCategories;
