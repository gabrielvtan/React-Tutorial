import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// Global consts should be in all upper case
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1
}

// we include the totalPrice and purchasable states here to set the base price of the burger and to set whether the burger is purchasable
// we also include the purchasing state here to allow for the app to display the modal whenever the Order Now button is clicked
// We now need to add a new state for the loading state of the spinner
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // here we will include the componentDidMount() in order to pull the ingredients from the database
    componentDidMount () {
        axios.get('https://burgerbuilder-a39e5.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        this.setState({purchasable: sum > 0});
    }

    // this method takes the current ingredient count of a given type, adds 1 to the count when the button is selected then updates the updated count
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }

    // We include the logic that if the old count is 0, then nothing happens
    // We also include logic to disable the button when the value of a given ingredient is 0
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    // Now we create a purchaseHandler method to display the modal checkout box
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    // Now we create a purchaseCancelHandler to hide the modal whenever we click on the backdrop of the page
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    // Now we create a purchase continue handler to for paying for the burger order
    // we have to connect this to a post request to firebase - the endpoint must end in a .json for firebase databases
    purchaseContinueHandler = () => {
        // Here we now have to change the state of loading for the spinner 
        this.setState({loading: true})
        // alert('You Continue!');
        // here we now create a variable object with the ingredients of the order, totalprice of the order, and customer data for the order
        // however in a real app, you would calculate the price on the server because you don't want the user to manipulate the price 
        // order then is the 2nd argument for axios bc it will be the data that is passed to the server
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Gabby Tan',
                address: {
                    street:'Test Street',
                    zipCode: '34343',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        // once the order is loaded or an error occurs, set the loading and purchasing states back to false in order to close the modal 
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Since the orderSummary also includes ingredients - we have to set it to null to begin with so that we do not draw an error
        let orderSummary = null;

        // Here we have to first set Burger as the Spinner for default as the ingredients have not been retrieved from the server just yet
        // if there is an error connecting to the server then show error message, otherwise, show the spinner
        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    {/*  similarly to order summary - we will do the same to burger because we are now pulling the ingredients from the server and need
                    to set up a load screen before the burger renders 
                    we need to include AUX here because we can return adjacent tags in JSX */}
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price ={this.state.totalPrice}/>
                </Aux>
            );
            // we also shift order summary up here to incorporate the spinner instead of the order summary between the modal 
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

// here we wrap the BurgerBuilder with withErrorHandler and use axios as a second argument in order to pass the Axios instance
export default withErrorHandler(BurgerBuilder, axios);