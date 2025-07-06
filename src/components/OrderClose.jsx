import React, { useContext, useState } from 'react'
import { getAllOrdersCloseStatuse } from '../service/APIService';
import UserContext from '../contexts/UserContext';

const OrderClose = () => {
    const { currentUser , isRequstToGetCurrentUserDone } = useContext(UserContext);
    const [orderClose, setOrderClose] = useState([]);

    const getOrderClose = async () => {
      try {
        const { data } = await getAllOrdersCloseStatuse();
        setOrderClose(data);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
        <h1>Orders Close</h1>
        {orderClose.map((order) => (
          <div key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Items:</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default OrderClose