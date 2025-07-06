import axios from "axios"

const BASE_URL = "http://localhost:8080";

const setAuthHeader = (token) => {
    console.log("token: " + token);
    localStorage.setItem("token", token);
    
};

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    
    return{
        Authorization: `Bearer ${token}`
    };
    
};
export const removeAuthHeader = () => {
    localStorage.removeItem("token");
}
export const register = (user) => {
    return axios.post(`${BASE_URL}/users/register`, user);

}
export const fetchCurrentUser = () => {
    return axios.get(`${BASE_URL}/users` , {headers: getAuthHeader()});
}
export const deleteCurrentUser = () => {
    return axios.delete(`${BASE_URL}/users` , {headers: getAuthHeader()});
}
export const login = async (credentials) => {
    const { data } = await axios.post(`${BASE_URL}/authenticate`,  credentials );
    const jwtToken = data.jwt;
    setAuthHeader(jwtToken);
    return data;
}
export const updateCurrentUser = (updateUser) => {
    return axios.put(`${BASE_URL}/users/update`, updateUser , {headers: getAuthHeader()});
}
export const getItem = (itemId) => {
    return axios.get(`${BASE_URL}/items/get_item/${itemId}`);
}
export const getAllItem = () => {
    return axios.get(`${BASE_URL}/items/get_all_items`);
}
export const addItemToFavorite = (itemId) => {
    return axios.post(`${BASE_URL}/favorite/${itemId}`,{}, {headers: getAuthHeader()});
}
export const removeItemFromFavorite = (itemId) => {
    return axios.delete(`${BASE_URL}/favorite/${itemId}`, {headers: getAuthHeader()});
}
export const getFavoriteItems = () => {
    return axios.get(`${BASE_URL}/favorite`, {headers: getAuthHeader()});
}
export const getAllOrdersCloseStatuse = () => {
    return axios.get(`${BASE_URL}/order/get_orders` , {headers: getAuthHeader()});
}
export const getOrderTempStatuse = () => {
    return axios.get(`${BASE_URL}/order/get_order_temp` , {headers: getAuthHeader()});
}
export const addItem = async (itemId) => {
    const {data} = await axios.post(`${BASE_URL}/order/add_item?itemId=${itemId}` ,{}, {headers: getAuthHeader()});
    return data;
    
}
export const removeItemFromOrder = async (itemId) => {
    return await axios.delete(`${BASE_URL}/order/remove_item_order?itemId=${itemId}` ,{headers: getAuthHeader()});
};
export const updateOrderToClose = () => {
     axios.put(`${BASE_URL}/order/update_order`,{} ,{headers: getAuthHeader()});
}
export const searchItems = async (searchTerm) => {
    return await axios.get(`${BASE_URL}/items/search/${searchTerm}`);
}
export const getFavoriteItemsBySearch = async (searchTerm) => {
    return await axios.get(`${BASE_URL}/favorite/search/${searchTerm}`, {headers: getAuthHeader()});
}