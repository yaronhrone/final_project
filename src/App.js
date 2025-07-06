
import { useEffect, useState } from 'react';
import './App.css';
import UserContext from './contexts/UserContext';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { fetchCurrentUser } from './service/APIService';
import Items from './components/Items';
import { dividerClasses } from '@mui/material';
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRequstToGetCurrentUserDone, setIsRequstToGetCurrentUserDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateCurrentUserContext = (user) => {
    setCurrentUser(user);

  };
  const getCurrentUserForContext = async () => {
    try {
      if (localStorage.getItem("token")) {
        const { data } = await fetchCurrentUser();
        updateCurrentUserContext(data);
   
      }

    } catch (error) {
      console.error(" Error fetching user:", error);
    }
    setIsRequstToGetCurrentUserDone(true);

  }
  useEffect(() => {
    getCurrentUserForContext();
  }, []);
  return (
    <div className="App">
    <UserContext.Provider value={{ currentUser, updateCurrentUserContext, isRequstToGetCurrentUserDone }}>
      <Router>
        <Navbar onSearch={setSearchTerm} />
     
         <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorite searchTerm={searchTerm}/>} />
          <Route path="/orders" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider> 
    </div>

  );
}

export default App;
