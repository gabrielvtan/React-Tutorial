import React from 'react';

// since we don't need a wrapping element, let's import the Aux Component to display the props.children
import Aux from '../../../hoc/Aux';

// Here is how we dynamically display the ingredient by key and show the quantity associated with each key (ingredient)
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
                </li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Aux>
    );
};

export default orderSummary;