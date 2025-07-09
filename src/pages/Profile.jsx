import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { deleteCurrentUser, removeAuthHeader, updateCurrentUser } from '../service/APIService';
import '../styels/Profile.css';
function Profile() {
  const { currentUser, updateCurrentUserContext, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const [formDate, setFormDate] = useState(null);
  const [isEdinting, setIsEdinting] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [error, setError] = useState({});
  const [errorFromServer, setErrorFromServer] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const phoneRegex = /^[0-9]{10}$/;
  const addressRegex = /^[A-Za-z0-9\u0590-\u05FF\s,.'-]{5,100}$/;
  const firstAndLastNameRegex = /^[A-Za-z\u0590-\u05FF]{2,30}$/;


  const valibateField = (name, value) => {
    let error = "";
    if (!value.trim() && ['first_name', 'last_name', 'email', 'phone', 'address'].includes(name)) {
      error = `${name.replace('_', ' ')} is required`;
    } else if (name == 'phone' && !phoneRegex.test(value)) {
      error = 'Phone number must be a 10-digit number';
    } else if (name === 'address' && !addressRegex.test(value)) {
      error = 'Address must be at least 5 characters long';
    } else if (name == 'first_name' && !firstAndLastNameRegex.test(value)) {
      error = 'First name must be at least 2 characters long and contain only letters';
    } else if (name == 'last_name' && !firstAndLastNameRegex.test(value)) {
      error = 'Last name must be at least 2 characters long and contain only letters';
    }
    setError({
      ...error,
      [name]: error
    })
  }
  useEffect(() => {
    if (currentUser) {
      setFormDate(currentUser);
    }
  }, [currentUser]);
  useEffect(() => {
    if (formDate) {
      const { first_name, last_name, email, phone, address } = formDate;
      setIsFormValid(
        Boolean(first_name && last_name && email && phone && address) &&
        Object.values(error).every(error => !error)
      )

    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDate({
      ...formDate,
      [name]: value
    });
    valibateField(name, value);
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      console.log(formDate);
      const { data } = await updateCurrentUser(formDate);
      updateCurrentUserContext(data);
      setIsEdinting(false);

    } catch (error) {
      console.error(error);
      if (error.status === 400 || error.status === 500) {
        setErrorFromServer(error.response.date);
      } if (error.code == 'ERR_NETWORK') {
        setErrorFromServer('Network Error , pleease try again later');
      }
      setTimeout(() => {
        setErrorFromServer('');
      }, 8000);
    }
  }
  const handleDeleteAccount = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!shouldDelete) return;
    try {
      await deleteCurrentUser();
      setIsDeleteAccount(true);
      setTimeout(() => {
        removeAuthHeader();
        updateCurrentUserContext(null);
        navigate('/');
      }, 5000);
      updateCurrentUserContext(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.status === 400 || error.status === 500) {
        setErrorFromServer(error.response.date);
      } if (error.code == 'ERR_NETWORK') {
        setErrorFromServer('Network Error , pleease try again later');
      }
      setTimeout(() => {
        setErrorFromServer('');
      }, 8000);
    }
  }

  return (

    <div className='profile-container'>
      {currentUser &&
        <div>
          {(formDate && !isDeleteAccount) &&
            <div className='profile-form'>
              <h1>Your Profile</h1>
                <h4>Username: {currentUser.username}</h4>
                 <h4>Email: {currentUser.email} </h4>
              <form onSubmit={handleSumbmit}>
                <div className='form-group'>
                  <label htmlFor="first_name">First Name:</label>
                  <input type="text" id="first_name" name="first_name" value={formDate?.first_name} onChange={handleChange} disabled={!isEdinting} />
                  {error.first_name && <p className="error">{error.first_name}</p>}
                </div>
                <div className='form-group'>
                  <label htmlFor="last_name">Last Name:</label>
                  <input type="text" id="last_name" name="last_name" value={formDate?.last_name} onChange={handleChange} disabled={!isEdinting} />
                  {error.last_name && <p className="error">{error.last_name}</p>}
                </div>
                <div className='form-group'>
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" id="phone" name="phone" value={formDate?.phone} onChange={handleChange} disabled={!isEdinting} />
                  {error.phone && <p className="error">{error.phone}</p>}
                </div>
                <div className='form-group'>
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name="address" value={formDate?.address} onChange={handleChange} disabled={!isEdinting} />
                  {error.address && <p className="error">{error.address}</p>}
                </div>
                {errorFromServer && <p className="error">{errorFromServer}</p>}

                {!isEdinting && <button type="button" className='edit-btn' onClick={() => setIsEdinting(true)}>Edit</button>}
                {isEdinting && <button type="submit" className='save-btn'>Save</button>}
              </form>
            </div>
          }
          {isDeleteAccount ? <p className="error">Your Account Is deleted</p>
          : <button type="button" className='delete-btn' onClick={handleDeleteAccount}>Delete Account</button>
        }
        </div>
      }
      {(isRequstToGetCurrentUserDone && !currentUser && !isDeleteAccount) &&
        <div className='center'>
          <h2>Unauthorized Access</h2>
          <h3>You need to login to access this page.</h3>
          <button className='login-btn' onClick={() => navigate("/login")}>Login</button>
        </div>
      }

    </div>
  )
}

export default Profile