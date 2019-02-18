import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';



// we include the totalPrice and purchasable states here to set the base price of the burger and to set whether the burger is purchasable
// we also include the purchasing state here to allow for the app to display the modal whenever the Order Now button is clicked
// We now need to add a new state for the loading state of the spinner
// from the way we structured our application, purchasing, loading, and error should be within the local state, while ingredients, totalPrice, and purchasable 
// should be managed by redux 
class BurgerBuilder extends Component {
    state = {
        // totalPrice: 4, WE NO LONGER NEED THIS BC WE ARE PASSING THE DATA THROUGH THE REDUCER 
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // here we will include the componentDidMount() in order to pull the ingredients from the database
    componentDidMount () {
        console.log(this.props);
        // we shall commment this out for now and move the logic to the reducer - since we don't know how to do asynchronous code 
        // axios.get('https://burgerbuilder-a39e5.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
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

    // WE NO LONGER NEED THESE TWO METHODS AS WE HAVE MOVED THE FUNCTIONALITY TO THE REDUCER 
    // // this method takes the current ingredient count of a given type, adds 1 to the count when the button is selected then updates the updated count
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // // We include the logic that if the old count is 0, then nothing happens
    // // We also include logic to disable the button when the value of a given ingredient is 0
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // Now we create a purchaseHandler method to display the modal checkout box
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    // Now we create a purchaseCancelHandler to hide the modal whenever we click on the backdrop of the page
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    // Now we create a purchase continue handler to for paying for the burger order
    purchaseContinueHandler = () => {
        
        // WE CAN NOW REMOVE QUERY PARAMS AS WE WILL NOW BE MANAGING THESE INGREDIENTS WITHIN REDUX 
        // here we are setting up our own queryParams to make the ingredients pass through the burgerbuilder to checkout 
        // encodeURIComponent is a react method which simply encodes the elements such that they can be used in the URL 
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // // SINCE we moved the contact data code, we will now include the total price as something to pass along with the burger ingredients
        // queryParams.push('price=' + this.state.totalPrice);

        // // we will now join this array of strings 
        // const queryString = queryParams.join('&');
    
        // instead of sending the order to firebase, here we navigated the page to /checkout 
        // WE NOW SHORTEN THIS AS WE NO LONGER NEED QUERY PARAMS
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
        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    {/*  similarly to order summary - we will do the same to burger because we are now pulling the ingredients from the server and need
                    to set up a load screen before the burger renders 
                    we need to include AUX here because we can return adjacent tags in JSX */}
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // we change purchasable to this.updatePurchaseState because we are no longer handling purchasable within State 
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
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
            // We now add a conditional check to see if the page is loading for the spinner
            if (this.state.loading){
                orderSummary = <Spinner />;
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
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) =>  dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) =>  dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

// here we wrap the BurgerBuilder with withErrorHandler and use axios as a second argument in order to pass the Axios instance
// you may have multiple HOC wrapping your export component 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));