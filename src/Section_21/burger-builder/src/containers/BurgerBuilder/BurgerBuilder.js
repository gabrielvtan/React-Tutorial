import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


// we include the totalPrice and purchasable states here to set the base price of the burger and to set whether the burger is purchasable
// we also include the purchasing state here to allow for the app to display the modal whenever the Order Now button is clicked
// We now need to add a new state for the loading state of the spinner
// from the way we structured our application, purchasing, loading, and error should be within the local state, while ingredients, totalPrice, and purchasable 
// should be managed by redux 
// BY ADDING 'export' to the start of the BurgerBuilder class, you are able to pass it to tests
export class BurgerBuilder extends Component {
    state = {
        // totalPrice: 4, WE NO LONGER NEED THIS BC WE ARE PASSING THE DATA THROUGH THE REDUCER 
        purchasing: false
    }

    // here we will include the componentDidMount() in order to pull the ingredients from the database
    componentDidMount () {
        // console.log(this.props);
        // since we moved the axios request to the burger builder action file 
        this.props.onInitIngredients();
    }

    
    // we create a new method here that sets whether the burger may be purhcased after an ingredient is added or subtracted
    // We need to get the current ingredients and convert them into an array to be analyzed by element then sum the total amount of ingredients through reduce()
    // el is the value accessed from return ingredients[igKey]
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // Now we create a purchaseHandler method to display the modal checkout box
    // HERE we will add the logic which either redirects the user to the Authentication page or the Checkout page 
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing:true});
        } else {
            // Here we add the redirect prop for redirecting to checkout 
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    // Now we create a purchaseCancelHandler to hide the modal whenever we click on the backdrop of the page
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    // Now we create a purchase continue handler to for paying for the burger order
    purchaseContinueHandler = () => {
        // Here we will include the onInitPurchase to handle the redirect of the order success 
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Since the orderSummary also includes ingredients - we have to set it to null to begin with so that we do not draw an error
        let orderSummary = null;

        // Here we have to first set Burger as the Spinner for default as the ingredients have not been retrieved from the server just yet
        // if there is an error connecting to the server then show error message, otherwise, show the spinner
        let burger = this.props.error? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    {/*  similarly to order summary - we will do the same to burger because we are now pulling the ingredients from the server and need
                    to set up a load screen before the burger renders 
                    we need to include AUX here because we can return adjacent tags in JSX */}
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        //HERE - buildControls need to know if the user is authenticated or not so to redirect the user whenever the order a burger
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // we change purchasable to this.updatePurchaseState because we are no longer handling purchasable within State 
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price ={this.props.price}/>
                </Aux>
            );
            // we also shift order summary up here to incorporate the spinner instead of the order summary between the modal 
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }


        return (
            <Aux>
                {/* The Modal here will be used to display the burger order summary */}
                {/* We add some additional styling to Modal for the CSS animation to work  */}
                {/* Now - we want to show the spinner in lieu of the orderSummary in the modal - we have to shift the OrderSummary tag to the render section */}
                {/* and set a conditional as to whether the state is loading  */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

// we have to now include price a State to be mapped to Props 
// Now that we have combined reducers - we need to make sure that we have the correct path for each of the properties 
// HERE we have to add isAuthenticated as a props so that the user will be redirected at the order now stage
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

// HERE we will set the redirect porps so that we can change the redirect path 
const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) =>  dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>  dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

// here we wrap the BurgerBuilder with withErrorHandler and use axios as a second argument in order to pass the Axios instance
// you may have multiple HOC wrapping your export component 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));