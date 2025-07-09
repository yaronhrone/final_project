import React, { useContext, useEffect, useState } from 'react'
import { addItem, getFavoriteItems } from '../service/APIService';
import UserContext from '../contexts/UserContext';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import '../styels/Items.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Item = ({ error = "",isAddFavoriteItem = false, item, editToFavorite = () => { }, removeFromFavorite = () => { }, isFavoriteItem = false , handleAddOrder = () => { }, handleRemoveOrder = () => { }, quantity = false, isFromOrder=false , isFromOrderClose=false}) => {
const { currentUser , isRequstToGetCurrentUserDone } = useContext(UserContext);
const [isAddOrderItem, setIsAddOrderItem] = useState(false);
const [errorOrder, setErrorOrder] = useState('');

  const addTheItemToOrder = async(itemsId) => {
    try {
      await addItem(itemsId);
      setIsAddOrderItem(prev => ({
        ...prev,
        [itemsId]: true
      }));
      setTimeout(() => {
        setIsAddOrderItem(prev => ({
          ...prev,
          [itemsId]: false
        }));
      }, 500);
      console.log(itemsId);
    } catch (error) {
      console.log(error);
      setErrorOrder(prev => ({
        ...prev,
        [itemsId]: error.response.data
      }));
      
      setTimeout(() => {
        setErrorOrder(prev => ({
          ...prev,
          [itemsId]: ''
        }));
      }, 2000);
      
  }
};

  return (
    <div className='container'>
      <div className='product-card' key={item.id}>
        <img src={item.photo} alt={item.name} className='product-image' />
        <h2>{item.title}</h2>
        <p style={{ color: "green", fontSize: "20px" }}>Price: {item.price} $ </p>
        {!isFromOrderClose &&<p style={{ color: "orange", fontSize: "20px" }}> Stock: {item.stock}</p>}
        {quantity && <p style={{ color: "blue", fontSize: "20px" }}>Quantity: {item.quantity}</p>}
        {error && <p style={{ color: "red", fontSize: "20px" }}>{error}</p>}
        {errorOrder && <p style={{ color: "red", fontSize: "20px" }}>{errorOrder[item.id]}</p>}
        {(currentUser && isRequstToGetCurrentUserDone) &&
          <div className='product-details'>
            {!errorOrder && isAddOrderItem[item.id] && <AddShoppingCartIcon className='order-icon' ></AddShoppingCartIcon>}
            {(!error && isAddFavoriteItem )&&  <AddReactionIcon className='favorite-icon' ></AddReactionIcon>}
          <div className='button-group'>
           {(!isFromOrderClose&& !isFavoriteItem && !isFromOrder)&& <button onClick={editToFavorite }>Add to favorite</button>}
           {(!isFromOrderClose && isFavoriteItem) && <button onClick={(removeFromFavorite)}>Remove</button>}
            {(!isFromOrderClose && !isFromOrder) && <button onClick={() => addTheItemToOrder(item.id)}>Add to order</button>}
            {(!isFromOrderClose && isFromOrder) && <button onClick={() => handleRemoveOrder(item.id)}><FaMinus/></button>}
            {(!isFromOrderClose && isFromOrder) && <button onClick={() => handleAddOrder(item.id)}><FaPlus/></button> }
          </div>
          </div>
        }

      </div>
    </div>
      )
}

      export default Item