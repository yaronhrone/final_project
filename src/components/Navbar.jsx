import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import  UserContext  from '../contexts/UserContext';
import { removeAuthHeader} from '../service/APIService';
import CoustomLink from './CoustomLink.jsx';
import '../styels/Navbar.css';
import CloseIcon from '@mui/icons-material/Close';
const Navbar = ({ onSearch }) => {
  const { currentUser, updateCurrentUserContext, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    onSearch(e.target.value);
  }
  const handleCleen = () => {
    onSearch("");
    document.querySelector('.navbar-search').value = '';
  }

  const loguot = () => {
    setTimeout(() => {
      removeAuthHeader();
      updateCurrentUserContext(null);
      navigate('/');
    }, 1000);
  }

  return (
    <div className='navbar'>
      <CoustomLink to={"/"} className='navbar-logo'><img src="https://bcassetcdn.com/social/6ru57xswrs/preview.png" width={"200px"} height={"100px"} alt="logo" /></CoustomLink>
      <div className='navbar-search-container'>
      <input className='navbar-search' type="text" placeholder='Search Perfume' onChange={handleChange} /> 
      <CloseIcon onClick={handleCleen} style={{ cursor: "pointer" , color: "white" }}/>
      </div>
      <div className='navbar-links'>
       {currentUser && <h5>Welcome  <span style={{ color: "green" }}>{currentUser.username}</span></h5>}
        {(isRequstToGetCurrentUserDone && !currentUser) &&
          <div >
            <CoustomLink to={'/login'}>Sing in</CoustomLink>
            <CoustomLink to={'/register'}>Sing up</CoustomLink>
          </div>}
          {currentUser && 
          <div>
            <CoustomLink to= {'/favorites'}>Favorites</CoustomLink>
            <CoustomLink to= {'/orders'}>Orders</CoustomLink>
            <CoustomLink to={'/profile'}>Profile</CoustomLink>
            <CoustomLink to={'/logout'} onClick={loguot}>Logout</CoustomLink>
          </div>
          }
      </div>
    </div>
  )
}

export default Navbar