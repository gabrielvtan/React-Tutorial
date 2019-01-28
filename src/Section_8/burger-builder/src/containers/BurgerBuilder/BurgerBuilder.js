import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// Global consts should be in all upper case
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1
}

// we include the totalPrice and purchasable states here to set the base price of the burger and to set whether the burger is purchasable
// we also include the purchasing state here to allow for the app to display the modal whenever the Order Now button is clicked
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0, 
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                {/* The Modal here will be used to display the burger order summary */}
                {/* We add some additional styling to Modal for the CSS animation to work  */}
                <Modal show={this.state.purchasing}> 
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                {/* Here we then add the ingredients to the BuildControls */}
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price ={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;