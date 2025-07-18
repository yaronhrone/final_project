import React, {  useEffect } from 'react'
import { getAllItem, addItemToFavorite,  searchItems } from '../service/APIService';
import { useState } from 'react';
import '../styels/Items.css';
import Item from './Item';
function Items({searchTerm}) {
  // const { currentUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [errorItem, setErrorItem] = useState("");
  const [isAddFavoriteItem, setIsAddFavorite] = useState(false);


  const getItems = async () => {
    try {
  

      if (searchTerm.trim() == '') {
    const { data } = await getAllItem();
    setItems(data);
    return;
      }
      const { data } = await searchItems(searchTerm);
      setItems(data);
    } catch (error) {
      console.log(error);
      setItems([]);
    }
  }

  const addTheItemToFavorite = async (itemId) => {
    try {

      setIsAddFavorite(prev => ({
        ...prev,
        [itemId]: true
      }));
      setTimeout(() => {
        setIsAddFavorite(prev => ({
          ...prev,
          [itemId]: false
        }));
      }, 500);

      
      return await addItemToFavorite(itemId);
    } catch (error) {
      setErrorItem(prev => ({
        ...prev,
        [itemId]: error.response.data
      }));
   
      setTimeout(() => {
        setErrorItem(prev => ({
          ...prev,
          [itemId]: ''
        }));
      }, 2000);
    }
  };



  useEffect(() => {
    getItems();
  }, [searchTerm]);
  return (
    <div className='container'>
   
{ items.length > 0 ? (
      items.map(item =>
        <Item
          key={item.id}
          item={item}
          editToFavorite={() => addTheItemToFavorite(item.id)}
          error={errorItem[item.id]}
          isAddFavoriteItem={isAddFavoriteItem[item.id]}
        />
      ))
      : <h1 style={{color:"black"}}>There is no items found</h1> } 
    </div>


  )
}

export default Items