import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SongCard.css';
import { useNavigate } from 'react-router-dom';
import { GET_SONG_LIKES, UPDATE_LIKES } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest/makeRequest';

import Like from '../Like';

const SongCard = ({ song }) => {
  const [likesCount, setLikesCount] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(GET_SONG_LIKES(song.id), {}, navigate).then((response) => {
      setLikesCount(response.data.count);
      setIsLiked(response.data.like);
    });
  }, []);

  const handleLikeClick = () => {
    makeRequest(UPDATE_LIKES(song.id), { data: { like: !isLiked } }, navigate).then((response) => {
      setLikesCount(response.data.count);
      setIsLiked(response.data.like);
    });
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };
  return (
    <div data-testid="song-card" className="song-card">
      <div className="song-img-container">
        <img src={song.imageUrl} alt="songIcon" />
      </div>
      <div className="song-info">
        <div>
          <div className="song-name">{song.name}</div>
          <div className="artist-name">{song.artist.name}</div>
        </div>
        <Like isLiked={isLiked} likesCount={likesCount} onClick={handleLikeClick} />
      </div>
    </div>
  );
};
export default SongCard;

SongCard.propTypes = {
  song: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
