import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateCandidate from './createCandidate';
// import UpdateCandidate from './UpdateCandidate';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} forceRefresh={true} />
      <Route path='/create' element={<CreateCandidate />} />
      {/* <Route path='/update' element={<UpdateCandidate />} /> */}
    </Routes>
  );
};

export default App;
