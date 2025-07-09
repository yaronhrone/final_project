import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../service/APIService';
import '../styels/Register.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const  RegisterForm = () => {
  const navigate = useNavigate();
  const [singUp, setSingUp] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    address: '',
    email: '',
    phone: '',
    role: "USER"
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
    valibateForm(name, value);
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      console.log(formData);
      
      await register(formData);
      setSingUp(true);
      setTimeout(() => {
      setSingUp(false);
      navigate('/login');
      },2000)
    } catch (error) {
      console.error(error);
      if (error.status == 400 || error.status == 500) {
        setErrorFromServer(error.response.data);
      } if (error.code == 'ERR_NETWORK') {
        setErrorFromServer('Network Error , pleease try again later');
      }
      setTimeout(() => {
        setErrorFromServer('');
      }, 8000);

    }

  }
  const [error, setError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState('');
  const firstAndLastNameRegex = /^[A-Za-z\u0590-\u05FF]{2,30}$/;
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const addressRegex = /^[A-Za-z0-9\u0590-\u05FF\s,.'-]{5,100}$/; 

  const valibateForm = (name, value) => {
    let error = "";
    if (!value.trim() && ['first_name', 'last_name', 'username', 'password', 'address', 'email', 'phone'].includes(name)) {
      error = `${name.replace('_', ' ')} is required`;
    } else if (name === 'username' && !usernameRegex.test(value)) {
      error = 'Username must be at least 4 characters long and start with a letter';
    } else if (name === 'password' && !passwordRegex.test(value)) {
      error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    } else if (name === 'email' && !emailRegex.test(value)) {
      error = 'Invalid email address';
    } else if (name === 'phone' && !phoneRegex.test(value)) {
      error = 'Phone number must be a 10-digit number';
    } else if (name === 'address' && !addressRegex.test(value)) {
      error = 'Address must be at least 5 characters long';
    } else if (name === 'first_name' && !firstAndLastNameRegex.test(value)) {
      error = 'First name must be at least 2 characters long';
    } else if (name === 'last_name' && !firstAndLastNameRegex.test(value)) {
      error = 'Last name must be at least 2 characters long';
    }
    setError({
      ...error,
      [name]: error
    })

  }
  useEffect(() => {
    const { first_name, last_name, username, password, address, email, phone } = formData;
    setIsFormValid(
      Boolean(first_name && last_name && username && password && address && email && phone) &&
      Object.values(error).every(error => !error)
    )
  }, [error])

  return (
<>
    {singUp ? <h3 className='success'>You have successfully registered!</h3> :
    <div className='register-container'>
      {errorFromServer && <p className='error-text'>{errorFromServer}</p>}
      <div>
    </div>
      <form  onSubmit={handleSumbmit} className='register-form'>
        <h2>Sing up</h2>
        <input type="text" placeholder='First name' name='first_name'
          value={formData.first_name} onChange={handleChange}
          className={error.first_name ? "inpur-error" : ""} />
        {error.first_name && <p className='error'>{error.first_name}</p>}

        <input type="text" placeholder='Last name' name='last_name'
          value={formData.last_name} onChange={handleChange}
          className={error.last_name ? "inpur-error" : ""} />
        {error.last_name && <p className='error'>{error.last_name}</p>}

        <input type="text" placeholder='Username' name='username'
          value={formData.username} onChange={handleChange}
          className={error.username ? "inpur-error" : ""} />
        {error.username && <p className='error'>{error.username}</p>}

        <div style={{ position: "relative", marginBottom: "1rem", width: "100%" ,marginRight:"1rem"}}>
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password'
            value={formData.password} onChange={handleChange} className={error.password ? "input=error" : ""}
            style={{ width: "100%", paddingRight: "0", paddingLeft: "0.5rem", marginBottom: "0" }} />
          <span onClick={togglePasswordVisibility} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
           {showPassword ? <VisibilityIcon style={{ fontSize: "20px" }} /> : <VisibilityOffIcon style={{ fontSize: '"20px' }} />}
          </span>
        </div>
        {error.password && <p className='error'>{error.password}</p>}

        <input type="text" placeholder='Address' name='address'
          value={formData.address} onChange={handleChange}
          className={error.address ? "inpur-error" : ""} />
        {error.address && <p className='error'>{error.address}</p>}

        <input type="email" placeholder='Email' name='email'
          value={formData.email} onChange={handleChange}
          className={error.email ? "inpur-error" : ""} />
        {error.email && <p className='error'>{error.email}</p>}

        <input type="text" placeholder='Phone' name='phone'
          value={formData.phone} onChange={handleChange}
          className={error.phone ? "inpur-error" : ""} />
        {error.phone && <p className='error'>{error.phone}</p>}

        {errorFromServer && <p className='error-text'>{errorFromServer}</p>}

        <button type='sumbit' className="sing-up" disabled={!isFormValid}>Sing up</button>
   
      </form>
    </div>}
  </>
  )
}

export default RegisterForm
