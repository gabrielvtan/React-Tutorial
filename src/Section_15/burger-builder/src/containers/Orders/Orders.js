import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    // We use componentDidMount here because we only want to fetch order when this is loaded
    // we will fetch the order from firebase and push them into an object to be loaded in the order list
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading:false, orders:fetchedOrders});

            })
            .catch(err => {
                this.setState({loading:false});
            })
    }


    render () {
        return (
            <div>
                {/* Here we now map out the orders received from firebase */}
                {this.state.orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

// we then also wrap Orders with withErrorHandler and axios to deal with errors and connect to firebase
export default withErrorHandler(Orders, axios);