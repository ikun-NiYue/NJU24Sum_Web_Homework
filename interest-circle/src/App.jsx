import React from 'react';
import { Routes,Route,Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/LoginForm'/> } />
          <Route path='/LoginForm' element={<LoginForm/> } />
          <Route path='/RegisterForm' element={<RegisterForm/>} />
          <Route path='/HomePage/*' element={<HomePage/> } />
        </Routes>
      </div>
    </>
  );
}

export default App;