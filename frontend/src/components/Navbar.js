import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logout = async() => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <h1 className='has-text-weight-bold is-size-2'>BUS AJA</h1>
        </a>
    
        <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={logout} className="button is-primary">
                Log Out
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar