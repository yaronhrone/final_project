// import React, { useContext, useEffect, useState } from 'react'
// import UserContext from '../contexts/UserContext';
// import { addItem, getAllOrdersCloseStatuse, getOrderTempStatuse,updateOrderToClose } from '../service/APIService';
// import { removeItemFromOrder } from '../service/APIService';
// import '../styels/OrderTemp.css'
// import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// const OrderTemp = () => {
//   const [orderTemp, setOrderTemp] = useState(null);
//   const { currentUser, isRequstToGetCurrentUserDone } = useContext(UserContext);
//   const [isHeveOrderTemp, setIsHeveOrderTemp] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentIndexClose, setCurrentIndexClose] = useState(0);
//   const [orderClose, setOrderClose] = useState([]);
//   const navigate = useNavigate();
//   const goNext = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex + 1) % orderTemp.items.length
//     );
//   };

//   const goPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + orderTemp.items.length) % orderTemp.items.length
//     );
//   };
//   const goNextClose = () => {
//     setCurrentIndexClose((prevIndex) =>
//       (prevIndex + 1) % orderClose[orderClose.length - 1].items.length
//     );
//   };

//   const goPrevClose = () => {
//     setCurrentIndexClose((prevIndex) =>
//       (prevIndex - 1 + orderClose[orderClose.length - 1].items.length) % orderTemp[orderTemp.length - 1].items.length
//     );
//   };
  
//   const removeItemOrder = async (itemId) => {
//     try {
//       console.log(itemId);

//       await removeItemFromOrder(itemId);
//       if (orderTemp.items.length === 0) {
//         setIsHeveOrderTemp(false);
//       }
//       getOrder();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const addItemToOrder = (itemId) => {
//     try {
//       addItem(itemId);
//       getOrder();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const updateOrder = async () => {
//     try {
//       await updateOrderToClose();
//       setIsHeveOrderTemp(false);
//       setTimeout(() => {
     
//         getOrderClose();
//       },1000);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getOrderClose = async () => {
//     try {
//       const { data } = await getAllOrdersCloseStatuse();
//       setOrderClose(data);
//       console.log(data);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getOrder = async () => {
//     try {
//       const { data } = await getOrderTempStatuse();
//       if (data.items.length === 0) {
//         return setIsHeveOrderTemp(false);
//       };
//       setOrderTemp(data);
//       setIsHeveOrderTemp(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getOrder();
//     getOrderClose();
//   }, []);
//   return (
//     <div>

//       {(currentUser && isRequstToGetCurrentUserDone)
//        && 
//        <div>
//        {isHeveOrderTemp &&

//         <div className="container" key={orderTemp.id}>
//           {orderTemp.items.length > 0 &&
//             <div key={orderTemp.items[currentIndex].id} className="item">
//               <h2>Order ID: {orderTemp.id} </h2>
//               <p className="product-position">
//                 Item {currentIndex + 1} of {orderTemp.items.length}</p>
//               <div className="product">
//                 <button onClick={goPrev} className='slider-btn'><FaArrowLeft /></button>
//                 <img src={orderTemp.items[currentIndex].photo} alt={orderTemp.items[currentIndex].name} className="product-image" />
//                 <h2>{orderTemp.items[currentIndex].title}</h2>
//                 <p>Price: {orderTemp.items[currentIndex].price} $</p>
//                 <p>Quantity: {orderTemp.items[currentIndex].quantity}</p>
//                 <p>Stock: {orderTemp.items[currentIndex].stock}</p>
//                 <button onClick={() => removeItemOrder(orderTemp.items[currentIndex].id)}><FaMinus /></button>
//                 <button onClick={() => addItemToOrder(orderTemp.items[currentIndex].id)}><FaPlus /></button>
//                 <button onClick={goNext} className='slider-btn'><FaArrowRight /></button>
//               </div>
//               <p className='total-price'>Total price: {orderTemp.total_price} $</p>
//               <h4>Order Status: {orderTemp.status}</h4>
//               <h4>Order Date Open: {orderTemp.date_order}</h4>
//               <h4>Order Shipping Address: {orderTemp.shipping_address}</h4>
//               <button type='button' className='send-btn' onClick={updateOrder}>Send Order</button>
//             </div>

//           }

//         </div>
//       }
//       {!isHeveOrderTemp &&

//         <h2>There is no open order for you</h2>
//         }

//       {orderClose.length > 0 ?
//         <div>
//           <h2>Order Close</h2>
//           {orderClose.map((order) => (

//             <div key={order.items[currentIndexClose].id} className="item">
//               <h2>Order ID: {order.id} </h2>
//               <p className="product-position">
//                 Item {currentIndexClose + 1} of {order.items.length}</p>
//               <div className="product">
//                 <button onClick={goPrevClose} className='slider-btn'><FaArrowLeft /></button>
//                 <img src={order.items[currentIndexClose].photo} alt={order.items[currentIndexClose].name} className="product-image" />
//                 <h2>{order.items[currentIndexClose].title}</h2>
//                 <p>Price: {order.items[currentIndexClose].price} $</p>
//                 <p>Quantity: {order.items[currentIndexClose].quantity}</p>
//                 <p>Stock: {order.items[currentIndexClose].stock}</p>
//                 <button onClick={goNextClose} className='slider-btn'><FaArrowRight /></button>
//                 <p className='total-price'>Total price: {order.total_price} $</p>
//                 <h2>Order ID: {order.id} </h2>
//                 <h4>Order Status: {order.status}</h4>
//                 <h4>Order Date Open: {order.date_order}</h4>
//                 <h4>Order Shipping Address: {order.shipping_address}</h4>
//               </div>
//             </div>
//           ))}
//         </div>
//           : 
//           <h2>There is no close order for you</h2>
//         }

//       </div>
//       }
//                 {(isRequstToGetCurrentUserDone && !currentUser ) &&
//         <div className='center'>
//           <h2>Unauthorized Access</h2>
//           <h3>You need to login to access this page.</h3>
//           <button className='login-btn' onClick={() => navigate("/login")}>Login</button>
//         </div>
//       }
//     </div>
//   )
// }

// export default OrderTemp