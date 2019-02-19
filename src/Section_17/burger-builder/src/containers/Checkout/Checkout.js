import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

// SINCE WE ARE NOW USING REDUX, WE CAN NOW REMOVE componentWillMount and the Component's current State 
class Checkout extends Component {


    // Here we are going a page back whenever cancel is selected
    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    // here we are going  to the contact-data page once continue is selected
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    // Here we create the logic to that if there are ingredients, then show the summary - otherwise - redirect to homepage 
    render () {
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            // We add a new prop 'purchased' which will let us redirect, if purchased is true 
            // now we may add purchasedRedirect in the summary which will redirect to the homepage if the purchase was successful 
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (  
                <div>
                    {purchasedRedirect}             
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path ={this.props.match.path + '/contact-data'} 
                        // WE NOW NO LONGER NEED THE RENDER CONTACT DATA METHOD AND CAN SIMPLY PASS THE COMPONENT 
                        // WE CAN DO THIS BECAUSE WE CAN SIMPLY GET THE STATE WITHIN CONTACT DATA 
                        component={ContactData}/>
                </div>    
            );
        }
        return summary;
    }
}

// we again have to create a mapStateToProps as we will be getting the current state of the application 
// we don't need mapDispatchToProps as we are not dispatching anything here 
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};



export default connect(mapStateToProps)(Checkout);