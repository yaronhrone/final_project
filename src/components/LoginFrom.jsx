import React, { useContext, useState } from 'react'
import '../styels/Login.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { fetchCurrentUser, login } from '../service/APIService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginFrom() {
  const {updateCurrentUserContext} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async (e) => {
    
    console.log(e);
    
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your username and password.");
      setTimeout(() => setError(''), 15000);
      return;
    }
    try {
      console.log(username + " " + password);
      await login({ username: username, password: password });
      console.log("login success");
      
      const { data } = await fetchCurrentUser();
      console.log(data+ "login data");
      
      updateCurrentUserContext(data);
      navigate("/");
    } catch (error) {
      console.dir(error);

      if (error.status === 403 || error.status == 500) {
        console.log(error.response.data);

        setError(error.response.data);
      }
      if (error.code == 'ERR_NETWORK') {
        setError('Network Error , please try again later');
      
      }
      setTimeout(() => {
        setError('');
      }, 18000);
    }

  }
  return (
    <form onSubmit={handleLogin} className='login-container'>
     
        <h2>Sing In</h2>
        <input type="text" placeholder='User Name' name='username' onChange={(e) => setUsername(e.target.value)} />

        <div style={{ position: 'relative', marginBottom: "1rem" }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password'
            value={password} onChange={e => setPassword(e.target.value)} className={error.password ? "input=error" : ""}
            style={{ width: "100%", paddingRight: "0", paddingLeft: "0.5rem", marginBottom: "0" }} />
          <span onClick={togglePasswordVisibility}
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}> 
            {showPassword ? <VisibilityIcon style={{ fontSize: "20px" }} /> : <VisibilityOffIcon style={{ fontSize: "20px" }} />}
           </span> 
        </div>
        {error && <p className='error'>{error}</p>}

        <div className='button-group'>
          <button type='submit' className='singin-btn'>Sing In</button>
          {/* <button type="button" onClick={() => navigate("/register")} className='singup-btn'>Sing Up</button> */}
        </div>
    </form>

  )
}

export default LoginFrom