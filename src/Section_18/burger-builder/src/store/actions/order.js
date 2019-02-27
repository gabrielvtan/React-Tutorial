// This will hold the action creators for submitting an order
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// the first two a synchronous action creators
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error 
    };
};

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

// this is an asynchronous action creator which doesn't need a specific action type 
// HERE we also have to pass the AUTH token when we make a burger order 
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        //Here we initiate purchaseBurgerStart with dispatch so that the action returned by purchaseBurgerStart is dispatched to the store
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

// Similar to the Purchase burger pattern above - we will create three synchronous functions and one asynchronous function 
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

// this is the async code 
// as a preference, do data format changes in the actions folder not the reducers folder 
// HERE we will now work on creating protected routes for the burger orders
// Here we simply need to pass the token we got from firebase when authenticating
// All we have to do for authorization is add a query param to the endpoint and pass the token 
export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err))
        })
    }
}