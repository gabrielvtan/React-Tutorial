import React, {Component} from 'react';
import { connect } from 'react-redux'; // as a reminder you need to use connect in order to mapDispatchToProps and mapStateToProps 

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // We use componentDidMount here because we only want to fetch order when this is loaded
    // we will fetch the order from firebase and push them into an object to be loaded in the order list
    // We also now have to pas userId as props to grab the specific orders of a user 
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    // lets also add the spinner here for the loading state 
    render () {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order=>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            ))
        };
        return orders
    }
}

// the state here are the ones defined within the reducer 
// HERE we have to add the token to make available as a props  
// HERE WE also have to pass the userId here so that we filter the orders for an autherized user 
const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

// here we have to pass the token for order authentication 
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

// we then also wrap Orders with withErrorHandler and axios to deal with errors and connect to firebase
export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));