import React, {Component} from 'react';

// since we don't need a wrapping element, let's import the Aux Component to display the props.children
import Aux from '../../../hoc/Auxilary/Aux';
import Button from '../../UI/Button/Button';

// Here is how we dynamically display the ingredient by key and show the quantity associated with each key (ingredient)
// We also now include the different button style for continuing or cancelling your order

// We are going to change orderSummary to a class Component to check for lifecycle update hooks
class OrderSummary extends Component {
    // this could be a functional component, doesn't have to be a class component
    // componentWillUpdate is unnecessary here but is left for debugging purposes
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate')
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                </li>);
        });
        
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;