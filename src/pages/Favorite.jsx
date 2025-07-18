import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { addItem, getFavoriteItems, getFavoriteItemsBySearch, removeItemFromFavorite } from '../service/APIService';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';


const Favorite = ({ searchTerm }) => {
  const { currentUser, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();
  const [isFavoriteItem] = useState(true);

  const fetchFavoriteItems = async () => {
    try {
      if (searchTerm.trim() !== '') {
        const { data } = await getFavoriteItemsBySearch(searchTerm);
        setFavoriteItems(data);
        return;
      }
      const { data } = await getFavoriteItems();
      if (data.length === 0) {
        return setFavoriteItems([]);
      };
      setFavoriteItems(data);

    } catch (error) {
      console.error(error);
    }
  }

  const removeTheItemToFavorite = (itemsId) => {
    try {
      removeItemFromFavorite(itemsId);
      setFavoriteItems((favoriteItems) => favoriteItems.filter((item) => item.id !== itemsId));
    } catch (error) {
      console.log(error);
    }
  };

  const addTheItemToOrder = (itemsId) => {
    try {
      addItem(itemsId);
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    fetchFavoriteItems();
  }, [searchTerm]);
  return (
    <div >
      {(isRequstToGetCurrentUserDone && currentUser) &&
      <div>
          <h1 className='title'>Your Favorite Items</h1>
        <div className='container'>
          {favoriteItems.length > 0 ? (
            favoriteItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                removeFromFavorite={() => removeTheItemToFavorite(item.id)}
                editToOrder={() => addTheItemToOrder(item.id)}
                isFavoriteItem={isFavoriteItem}
              />
            ))
          ) : (
            <p style={{ color: "black" }}> You don't have favorite items found</p>
          )}

        </div>
        </div>}

        {
        (isRequstToGetCurrentUserDone && !currentUser) &&
        <div className='center'>
          <h2>Unauthorized Access</h2>
          <h3>You need to login to access this page.</h3>
          <button className='login-btn' onClick={() => navigate("/login")}>Login</button>
        </div>
      }



    </div>
  )
}

export default Favorite