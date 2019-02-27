// This will be the sign-in/sign-up form 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

// we manage state here, because we want authentication to be managed by the local state of the application 
// we are going to copy the structure and the checkValidity function from ContactData 
// WE now have to create a state of isSingUp
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'address@email.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, 
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            }
        },
        isSignup: true
    } 

    // Here we will add componentDidMount in order to check if the redirect path was set correctly 
    // the logic here is checking to see if the user is currently building a burger and if the redirect path is not equal to the default
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !=='/') {
            this.props.onSetAuthRedirectPath()
        }
    }

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

    // Similarly to ContactData - we are creating a check for inputs to the authentication page 
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    // Add submitHandler 
    // we add the isSignup here to swith between signin and signup
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    // Here we have to crate a swithAuthModeHandler to switch the value whenever the toggle is changed 
    swithAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        // we now create an Array for the orderForm to parse through to the input statements
        // in this case, key is name, street, zipCode, etc. 
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        // like contact data, we want to take each form element in the login input component
        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
        ));

        // Here we will add the conditional for loading
        if (this.props.loading) {
            form = <Spinner />
        }
        
        // Here we will create an error message if the password input is incorrect
        // we will pass a JSX object - message is only avaiable bc it is coming from firebase 
        let errorMessage = null;

        if( this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        // Here will add the logic for checking if the user is authentiated, if they are, they will be redirected to the burger builder page
        // NOW we have to add logic to redirect either to the burgerbuilder page or the checkout depending upon authentication 
        // HERE WE WILL DYNAMICALLY CHANGE THE AUTH REDIRECT PATH DEPENDING ON THE REDUX STATE PASSED 
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {/* Of course, we have to add the redirect object here */}
                {authRedirect}
                {/* Here we will include the onSubmit to form */}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                {/* Here we will add a ternary expression to change the signup states */}
                {/* and add a clicked listener for the sign-in and sign-up */}
                <Button 
                    clicked={this.swithAuthModeHandler}
                    btnType="Danger">SWITH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

// Again we have to map state to props to initiate the loading spinner 
// We have to map isAuthenticated in order to redirect the user once they sign in - this will return a bool
// IN ADDTION, we have to add the state on whether the burger is currently being built 
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

// As a reminder, once you have created your actions then reduces and exported through index,
// then you have to mapDispatchToProps to pass the Redux props 
// Need to also import connect so that you can connect mapDispatchToProps to redux 
// HERE WE ALSO need to dispatch a change on the redirect path back to the landing screen
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup ) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);