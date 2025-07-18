import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  UserContext  from '../contexts/UserContext';
import { removeAuthHeader} from '../service/APIService';
import CoustomLink from './CoustomLink.jsx';
import '../styels/Navbar.css';
import CloseIcon from '@mui/icons-material/Close';
const Navbar = ({ onSearch }) => {
  const { currentUser, updateCurrentUserContext, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    onSearch(e.target.value);
  }
  const handleCleen = () => {
    onSearch("");
    document.querySelector('.navbar-search').value = '';
  }

  const loguot = () => {
    closeMenu();
    setTimeout(() => {
      removeAuthHeader();
      updateCurrentUserContext(null);
      navigate('/');
    }, 1000);
  }

  return (
    <div className='navbar'>
      <CoustomLink to={"/"} ><img src="https://bcassetcdn.com/social/6ru57xswrs/preview.png" alt="logo"  className='navbar-logo'/></CoustomLink>
      <div className="navbar-search-container">
      <input className='navbar-search' type="text" placeholder='Search Perfume' onChange={handleChange} /> 
      <CloseIcon onClick={handleCleen} style={{ cursor: "pointer" , color: "white" }}/>
      </div>
           <div className="hamburger" onClick={toggleMenu}>☰</div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        
       {currentUser && <h5>Welcome  <span style={{ color: "green" }}>{currentUser.username}</span></h5>}
        {(isRequstToGetCurrentUserDone && !currentUser) &&
          <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <CoustomLink to={'/login'} onClick={closeMenu}>Sign in</CoustomLink>
            <CoustomLink to={'/register'}onClick={closeMenu}>Sign up</CoustomLink>
          </div>}
          {currentUser && 
          <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <CoustomLink to= {'/favorites'}onClick={closeMenu}>Favorites</CoustomLink>
            <CoustomLink to= {'/orders'}onClick={closeMenu}>Orders</CoustomLink>
            <CoustomLink to={'/profile'}onClick={closeMenu}>Profile</CoustomLink>
            <CoustomLink to={'/'} onClick={loguot}>Logout</CoustomLink>
          </div>
          }
      </div>
    </div>
  )
}

export default Navbar