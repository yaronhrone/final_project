import React, { useContext } from 'react'
import '../styels/Order.css';
import OrderComp from '../components/OrderComp'
import UserContext from '../contexts/UserContext';

const Order = () => {
  const { currentUser, isRequstToGetCurrentUserDone } = useContext(UserContext);
  return (
    <div>
      { (isRequstToGetCurrentUserDone && currentUser) &&
       <OrderComp/>
      }
    </div>
  )
}

export default Order