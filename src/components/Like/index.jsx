import React from 'react';
import PropTypes from 'prop-types';
import './Like.css';
import heartRed from '../../assets/images/heart-red.svg';
import heartGray from '../../assets/images/heart-gray.svg';

const Like = ({ isLiked, likesCount, onClick }) => (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className="like-container" onClick={onClick}>
    <img src={isLiked ? heartRed : heartGray} alt="" />
    <div className="likes-count">{likesCount}</div>
  </div>
);

export default Like;

Like.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
