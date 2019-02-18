import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

// SINCE WE ARE NOW USING REDUX, WE CAN NOW REMOVE componentWillMount and the Component's current State 
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // // in order to make the ingredients non-null, change to componentWillMount from componentDidMount
    // // this gives us access to the props there so we can already get the queryParam there. 
    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // here we check if the first param is equal to 'price' - this is not the most efficient way to accomplish this task 
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         } else {
    //         // each param will have this format ['salad', '1']
    //         ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients:ingredients, totalPrice:price})
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path ={this.props.match.path + '/contact-data'} 
                    //instead of using component={ContactData} we will use render with a JSX function to pass the this.state.ingredients to contact data
                    // we also make sure to include price here as well 
                    // props is passed here so that we can get the history back in the contactdata page
                    // WE NOW NO LONGER NEED THE RENDER CONTACT DATA METHOD AND CAN SIMPLY PASS THE COMPONENT 
                    // WE CAN DO THIS BECAUSE WE CAN SIMPLY GET THE STATE WITHIN CONTACT DATA 
                    // render={(props) =>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}/>
                    component={ContactData}/>
            </div>
        );
    }
}

// we again have to create a mapStateToProps as we will be getting the current state of the application 
// we don't need mapDispatchToProps as we are not dispatching anything here 
const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);