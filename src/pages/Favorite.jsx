import React, {  useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { addItem,  getFavoriteItems, getFavoriteItemsBySearch, removeItemFromFavorite } from '../service/APIService';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';


const Favorite = ({searchTerm}) => {
    const { currentUser , isRequstToGetCurrentUserDone } = useContext(UserContext);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const  navigate = useNavigate();
    const [isFavoriteItem ] = useState(true);

    const fetchFavoriteItems = async () => {
        console.log("fetchFavoriteItems called with searchTerm:", searchTerm);
        
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
        console.error('Error fetching favorite items:', error);
      }
    }
    
    const removeTheItemToFavorite =  (itemsId) => {
      try {
        removeItemFromFavorite(itemsId);
        setFavoriteItems((favoriteItems) => favoriteItems.filter((item) => item.id !== itemsId));
        console.log(itemsId);
      } catch (error) {
        console.log(error);
      }
    };
    
    const addTheItemToOrder =  (itemsId) => {
      try {
        addItem(itemsId);
        console.log(itemsId);
      } catch (error) {
        console.log(error);
      }
      
     };
     useEffect(() => {
       fetchFavoriteItems();
     },[searchTerm]);
  return (
    <div >
        <h1 className='title'>Your Favorite Items</h1>

        {(isRequstToGetCurrentUserDone && currentUser) ?
        <div className='container'>
        { favoriteItems.length > 0 ? (
          favoriteItems.map((item) => (
            <Item
            key={item.id}
            item={item}
            removeFromFavorite={ () => removeTheItemToFavorite(item.id)}
            editToOrder={() => addTheItemToOrder(item.id)}
            isFavoriteItem = {isFavoriteItem}
            />
          ))
        ) : (
          <p className='no-items'> You don't have favorite items found</p>
        ) }

        </div>
        
          :
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