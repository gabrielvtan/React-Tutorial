import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

// we now include the actual contact data to save for a given order form 
// we now have to include an elementType property for each element 
// this is currently the long-form/ you can alternatively create a helper function and input that into the orderForm 
// we include validation as its own state to require a specific form to have an input - 
//dropdowns don't require validation because something is selected on default 
// we include a new prop, 'touched' to only apply the validaity check if the input form was touched 
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5, 
                    maxLength: 5
                }, 
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'example@email.com'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }


    // Here we get access to the ingredients from the order
    orderHandler = (event) => {
        // we need to include event.prevenDefault() in order to prevent a server request and thus reloading the page 
        event.preventDefault();

        // here we now create a new variable so that we can map the name of a given input to a given value 
        // since dont care about elementType or config we simply map the keys to a given value 
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // here we now create a variable object with the ingredients of the order, totalprice of the order, and customer data for the order
        // however in a real app, you would calculate the price on the server because you don't want the user to manipulate the price 
        // order then is the 2nd argument for axios bc it will be the data that is passed to the server
        // we now also include orderData to inlcude the delivery information in a given order
        // HERE we now include the userId as part of the order so that we can associate specific orders with specific users 
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        // REDUX - now we have to include the action for ordering the Burger. Remember to use props 
        // WE also have to pass the Auth token here
        this.props.onOrderBurger(order, this.props.token);

    }

    // Here we now create a method to handle checking the validity of a given form 
    // we want to return true or false to then in inputChangedHandler adjust this valid property as well 
    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            // here we set isValid equal to the value comparision, i.e., isValid should be equal, if it's not equal to, an empty string 
            // use value.trim to remove any whitespaces at the beginning or end. 
            isValid = value.trim() !== '' && isValid;
        }

        // we can also add additional rules for the input form 
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;

        // here we now add an updatedFormElement.valid to run the this.checkValidity
        // and pass the updatedFormElement.value 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        // Here we now include the check for whether a given input was touched 
        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        
        //Here we now want to run a check to see if all the forms are valid which will allow the order button to be selected 
        let formIsValid = true; 
        // we now loop through the inputIdentifiers in the updatedOrderForm - which is the state object that contains all the form elements
        // and we check to see if the formIsValid is true as well so that we don't only look at the last property 
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid  && formIsValid;
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


    }

    render () {
        // we now create an Array for the orderForm to parse through to the input statements
        // in this case, key is name, street, zipCode, etc. 
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        // Here we are setting the form default vs the spinnner 
        // we use the customized Input Component here where we can pass props 
        // we now pass elementType and elementConfig to distribute the props for a given state
        // we parse them out using the map() function for each form element 
        // for changed, we use an annonymous function and pass in the event and formElement.id into inputChangeHandler
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contract data</h4>
                {form}
            </div>
        );
    }
}

// Here we use three different reducers when mapping state to props 
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    // as a reminder, the dispatchToProps has to be returned as a JS object 
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));