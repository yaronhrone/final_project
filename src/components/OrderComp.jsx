import React, { useContext, useEffect, useState } from 'react';
import { getOrderTempStatuse, removeItemFromOrder, updateOrderToClose, getAllOrdersCloseStatuse, addItem } from '../service/APIService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styels/Order.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Item from './Item';

const OrderComp = () => {
  const { currentUser, isRequstToGetCurrentUserDone } = useContext(UserContext);
  const navigate = useNavigate();
  const [openOrder, setOpenOrder] = useState(null);
  const [currentProductIndexOpen, setCurrentProductIndexOpen] = useState(0);
  const [closedOrders, setClosedOrders] = useState([]);
  const [currentClosedOrderIndex, setCurrentClosedOrderIndex] = useState(0);
  const [currentProductIndexClosed, setCurrentProductIndexClosed] = useState(0);
 const [ isFromOrder, setIsFromOrder] = useState(true);
  const fetchOrdersTemp = async () => {
    try {
      const { data } = await getOrderTempStatuse();
      if (data && data.items && data.items.length >= 0) {
        setOpenOrder(data);
    
      }else {
      setOpenOrder([]);
      return ;}

    } catch (error) {
      console.error(error);
      setOpenOrder(null);
      return;
    }
  };

  const fetchOrdersClose = async () => {
    try {
      const { data } = await getAllOrdersCloseStatuse();
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
    console.log("Item added to order:", itemId);
    
    fetchOrdersTemp();
  };

  const handleRemove = async (itemId) => {
    await removeItemFromOrder(itemId);
    const currentItem = openOrder?.items?.[currentProductIndexOpen];
    if (currentItem && currentItem.quantity == 1 && openOrder.items.length == 1) {

      setOpenOrder(null);
    
      return;
    }else
    console.log("Item removed from order:", itemId);
    fetchOrdersTemp();
  };
  useEffect(() => {
  if (openOrder && currentProductIndexOpen >= openOrder.items.length) {
    setCurrentProductIndexOpen(Math.max(0, openOrder.items.length - 1));
  }
}, [openOrder, currentProductIndexOpen]);


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
        <div >
          <h2>Open Order</h2>

          {openOrder ? (
            <div className="container-order">
              <div className='order-info'>
                <h4>Order ID: {openOrder.id}</h4>
                <h4>Status: {openOrder.status}</h4>
                <h4>Date Order: {openOrder.date_order}</h4>
                <h4>Shipping Address: {openOrder.shipping_address}</h4>
                <h4>Total Price: {openOrder.total_price} $</h4>
              </div>
              <div className="product-slider">

                <div >
                  <button onClick={goNextProductOpenOrder} className='slider-btn'>
                    <FaArrowLeft />
                  </button>
                  </div>
              <div className='product'>
                  <p className='order-number'>Item {currentProductIndexOpen + 1} of {openOrder.items.length}</p>
                <Item
                  key={openOrder.items[currentProductIndexOpen].id}
                  item={openOrder.items[currentProductIndexOpen]}
                  quantity={openOrder.items[currentProductIndexOpen].quantity}
                  handleAddOrder={handleAdd}
                  handleRemoveOrder={handleRemove}
                  isFromOrder={isFromOrder}
                  />
                </div>
                  <button onClick={goPrevProductOpenOrder} className='slider-btn'>
                    <FaArrowRight />
                  </button>
              </div>
                <button className="send-btn" onClick={handleSendOrder}>Send Order</button>
         
            </div>
         
          ) : (
            <div>
              <h3 className="no-order">You don't have open order</h3>
            </div>
          )}
          <div className='line'></div>
          <h2 >Closed Orders</h2>

              
                { closedOrders.length > 0 && (
                  <div>
              <div className="closed-nav">
                <button onClick={() => {
                  goNextCloseOrder();
                  setCurrentProductIndexClosed(0);
                }} className='slider-btn'><FaArrowLeft /></button>
                <span className='order-number'>Order number: {currentClosedOrderIndex + 1} of  {closedOrders.length}</span>
                <button onClick={() => {
                  goPrevCloseOrder();
                  setCurrentProductIndexClosed(0);
                }} className='slider-btn'><FaArrowRight /></button>
              </div>
            <div className="container-order">

              <div className='order-info'>

                <h4>Order ID: {closedOrders[currentClosedOrderIndex].id}</h4>
                <h4>Status: {closedOrders[currentClosedOrderIndex].status}</h4>
                <h4>Date Order: {closedOrders[currentClosedOrderIndex].date_order}</h4>
                <h4>Shipping Address: {closedOrders[currentClosedOrderIndex].shipping_address}</h4>
                <h4>Total Price: {closedOrders[currentClosedOrderIndex].total_price} $</h4>
              </div>

              {closedOrders[currentClosedOrderIndex].items.length > 0 && (
                <div className="product-slider">
                  <button onClick={goNextCloseProduct} className='slider-btn'>
                    <FaArrowLeft />
                  </button>
                  <div className='product'>
                  <p className='order-number'> Item {currentProductIndexClosed + 1} of {closedOrders[currentClosedOrderIndex].items.length}</p>
                  <Item
                    key={closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].id}
                    item={closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed]}
                    quantity={closedOrders[currentClosedOrderIndex].items[currentProductIndexClosed].quantity}
                    isFromOrderClose={true}
                   
                    />
                    </div>
                  <button onClick={goPrevCloseProduct} className='slider-btn'>
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
          )}
          {closedOrders.length == 0 &&
            <div>
              <h3 className="no-order">You don't have closed orders</h3>
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
