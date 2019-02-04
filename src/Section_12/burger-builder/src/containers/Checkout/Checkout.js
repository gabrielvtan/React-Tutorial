import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    // in order to make the ingredients non-null, change to componentWillMount from componentDidMount
    // this gives us access to the props there so we can already get the queryParam there. 
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // here we check if the first param is equal to 'price' - this is not the most efficient way to accomplish this task 
            if(param[0] === 'price'){
                price = param[1];
            } else {
            // each param will have this format ['salad', '1']
            ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients, totalPrice:price})
    }

    // Here we are going a page back whenever cancel is selected
    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    // here we are going to the contact-data page once continue is selected
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path ={this.props.match.path + '/contact-data'} 
                    //instead of using component={ContactData} we will use render with a JSX function to pass the this.state.ingredients to contact data
                    // we also make sure to include price here as well 
                    // props is passed here so that we can get the history back in the contactdata page
                    render={(props) =>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;