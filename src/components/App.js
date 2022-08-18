import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Settings from './pages/Settings.js';
import Scrum from './pages/Scrum.js';
import Error from './pages/Error.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/scrum' element={<Scrum />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}
export default App;
