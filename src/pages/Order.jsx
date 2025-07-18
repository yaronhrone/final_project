import React, { useContext } from 'react'
import '../styels/Order.css';
import OrderComp from '../components/OrderComp'
import UserContext from '../contexts/UserContext';

const Order = () => {
  return (
    <div>
       <OrderComp/>
    </div>
  )
}

export default Order