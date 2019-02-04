import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    // Here we get access to the ingredients from the order
    orderHandler = (event) => {
        // we need to include event.prevenDefault() in order to prevent a server request and thus reloading the page 
        event.preventDefault();
        // WE NOW MOVED THIS SECTION FROM BURGER BUILDER TO HANDLE CONTACT INFORMATION
        // Here we now have to change the state of loading for the spinner 
        this.setState({loading: true})
        // alert('You Continue!');
        // here we now create a variable object with the ingredients of the order, totalprice of the order, and customer data for the order
        // however in a real app, you would calculate the price on the server because you don't want the user to manipulate the price 
        // order then is the 2nd argument for axios bc it will be the data that is passed to the server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({loading: false});
                // Here we redirect the page after the order button is clicked 
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    console.log(order)
    }

    

    render () {
        // Here we are setting the form default vs the spinnner 
        let form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Zip Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading) {
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

export default ContactData;