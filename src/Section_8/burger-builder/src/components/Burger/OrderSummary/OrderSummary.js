import React from 'react';

// since we don't need a wrapping element, let's import the Aux Component to display the props.children
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

// Here is how we dynamically display the ingredient by key and show the quantity associated with each key (ingredient)
// We also now include the different button style for continuing or cancelling your order
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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;