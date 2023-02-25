import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sync.css';

const Sync = () => {
  const navigate = useNavigate();
  return (
    <div className="sync-container">
      <div>
        <h1>:((</h1>
        <h2>Seems a bit empty in here</h2>
        <button type="button" onClick={() => navigate('/')}>
          Sync
        </button>
      </div>
    </div>
  );
};

export default Sync;
