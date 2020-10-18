import React from 'react';

import Routes from './routes';

import './styles/global.css'

// Log
console.log(process.env.REACT_APP_NAME);
console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BASE_URL);

function App() {
  return (
    <Routes />
  );
}

export default App;
