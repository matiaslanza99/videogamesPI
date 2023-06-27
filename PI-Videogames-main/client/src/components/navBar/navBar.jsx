import React from 'react';
import './navBar.style.css';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/searchBar'

const NavBar = () => {
  return (
    <div className='navBar-container'>

        <div className='logo-container'>
            <img src='mandologo.png' alt='Logo' className='logo-image' />
        </div>


      <div className='navBar-links'>

        <Link to='/home'>
          <button className='button'>Home</button>
        </Link>
        <Link to='/create'>
          <button className='button'>Carga tu Juego</button>
        </Link>

        <SearchBar />
      </div>

    </div>
  );
};

export default NavBar;
