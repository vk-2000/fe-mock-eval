import React from 'react';
import Navbar from '../../components/Navbar';
import './PageNotFound.css';

const PageNotFound = () => (
  <div>
    <Navbar />
    <div className="page-not-found">
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </div>
    </div>
  </div>
);

export default PageNotFound;
