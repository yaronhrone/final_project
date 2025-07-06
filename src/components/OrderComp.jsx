import React, { useContext, useEffect, useState } from 'react';
import { getOrderTempStatuse, removeItemFromOrder, updateOrderToClose, getAllOrdersCloseStatuse, addItem } from '../service/APIService';
import { FaArrowLeft, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import '../styels/OrderTemp.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const OrderComp = () => {
  const { currentUser, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const [openOrder, setOpenOrder] = useState(null);
  const [currentProductIndexOpen, setCurrentProductIndexOpen] = useState(0);
  const [closedOrders, setClosedOrders] = useState([]);
  const [currentClosedOrderIndex, setCurrentClosedOrderIndex] = useState(0);
  const [currentProductIndexClosed, setCurrentProductIndexClosed] = useState(0);

  const fetchOrdersTemp = async () => {
    try {
      const { data } = await getOrderTempStatuse();
      if (data && data.items && data.items.length >= 0) {
        setOpenOrder(data);
      }

  
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrdersClose = async () => {
    try {
      const { data} = await getAllOrdersCloseStatuse();
      setClosedOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrdersClose();
    fetchOrdersTemp();
  }, []);

  const handleAdd = async (itemId) => {
    await addItem(itemId);
    fetchOrdersTemp();
  };

  const handleRemove = async (itemId) => {
    await removeItemFromOrder(itemId);
    fetchOrdersTemp();
  };

  const handleSendOrder = async () => {
    await updateOrderToClose();
  
    openOrder.status = 'CLOSE';
      closedOrders.push(openOrder);
        setOpenOrder(null);
        console.log(closedOrders);
  };
  const goNextProductOpenOrder = () => {
    setCurrentProductIndexOpen((prev) => (prev + 1) % openOrder.items.length);
  }

  const goPrevProductOpenOrder = () => {
    setCurrentProductIndexOpen((prev) => (prev - 1 + openOrder.items.length) % openOrder.items.length);
  }
  const goNextCloseOrder = () => {
    setCurrentClosedOrderIndex((prev) => (prev + 1) % closedOrders.length);
  }

  const goPrevCloseOrder = () => {
    setCurrentClosedOrderIndex((prev) => (prev - 1 + closedOrders.length) % closedOrders.length);
  }
  const goNextCloseProduct = () => {
    setCurrentProductIndexClosed((prev) => (prev + 1) % closedOrders[currentClosedOrderIndex].items.length);

  }

  const goPrevCloseProduct = () => {
    setCurrentProductIndexClosed((prev) => (prev - 1 + closedOrders[currentClosedOrderIndex].items.length) % closedOrders[currentClosedOrderIndex].items.length);
  }
  return (
    <>
{(isRequstToGetCurrentUserDone && currentUser) ? 
    <div className="all-orders">

      {openOrder && (
        <div className="container">
            <h2>Open Order</h2>
          <div className='order-info'>
            <h4>Order ID: {openOrder.id}</h4>
            <h4>Status: {openOrder.status}</h4>
            <h4>Date Order: {openOrder.date_order}</h4>
            <h4>Shipping Address: {openOrder.shipping_address}</h4>
            <h4>Total Price: {openOrder.total_price} $</h4>
          </div>
          <div className="product-slider">
             <p className="product-position">
                Item {currentProductIndexOpen + 1} of {openOrder.items.length}</p>
            <button onClick={goNextProductOpenOrder}>
              <FaArrowLeft />
            </button>

            <img src={openOrder.items[currentProductIndexOpen].photo} alt={openOrder.items[currentProductIndexOpen].title} className="product-image" />

            <button onClick={goPrevProductOpenOrder}>
              <FaArrowRight />
            </button>
          </div>
          <div className='product'>

            <h4>{openOrder.items[currentProductIndexOpen].title}</h4>
            <p>Price: {openOrder.items[currentProductIndexOpen].price} $</p>
            <p>Quantity: {openOrder.items[currentProductIndexOpen].quantity}</p>
            <p>Stock: {openOrder.items[currentProductIndexOpen].stock}</p>
            <button onClick={() => handleRemove(openOrder.items[currentProductIndexOpen].id)}><FaMinus /></button>
            <button onClick={() => handleAdd(openOrder.items[currentProductIndexOpen].id)}><FaPlus /></button>
            <br />
            <button className="send-btn" onClick={handleSendOrder}>Send Order</button>
          </div>
        </div>
      )}
               {!openOrder && 
          <div>
            <h3>You have no open order</h3>
          </div>
            
          }
<div className='line'></div>
      {closedOrders.length > 0 && (
        <div className="container">
          <h2>Closed Orders</h2>

          <div className="closed-nav">
            <button onClick={() => {
              goNextCloseOrder();
              setCurrentProductIndexClosed(0);
            }}><FaArrowLeft /></button>
            <span>Order number: {currentClosedOrderIndex + 1} of  {closedOrders.length}</span>
            <button onClick={() => {
              goPrevCloseOrder();
              setCurrentProductIndexClosed(0);
            }}><FaArrowRight /></button>
          </div>
          <div className='order-info'>

            <h4>Order ID: {closedOrders[currentClosedOrderIndex].id}</h4>
            <h4>Status: {closedOrders[currentClosedOrderIndex].status}</h4>
            <h4>Date Order: {closedOrders[currentClosedOrderIndex].date_order}</h4>
            <h4>Shipping Address: {closedOrders[currentClosedOrderIndex].shipping_address}</h4>
            <h4>Total Price: {closedOrders[currentClosedOrderIndex].total_price} $</h4>
          </div>
          
          {closedOrders[currentClosedOrderIndex].items.length > 0 && (
            <div className="product-slider">
             <p className="product-position">
                Item {currentClosedOrderIndex + 1} of {closedOrders[currentClosedOrderIndex].items.length}</p>
              <button onClick={goNextCloseProduct}>
                <FaArrowLeft />
              </button>

              <img src={closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].photo} alt={closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].title} className='product-image'/>

              <button onClick={goPrevCloseProduct}>
                <FaArrowRight />
              </button>
            </div>
          )}
 
          <div className='product'>

            <h4>{closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].title}</h4>
            <p>Price: {closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].price} $</p>
            <p>Quantity: {closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].quantity}</p>
            {/* <p>Stock: {closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].stock}</p> */}
          </div>
        </div>
      )}
      {closedOrders.length == 0 && 
        <div>
          <h3>You have no closed orders</h3>
        </div>
      }
      </div>
      :
      <div className='center'>
          <h2>Unauthorized Access</h2>
          <h3>You need to login to access this page.</h3>
          <button className='login-btn' onClick={() => navigate("/login")}>Login</button>
        </div>
                  
                }
    </>
  )
}

export default OrderComp;
