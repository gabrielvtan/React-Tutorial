import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxilary/Aux';
import Backdrop from '../Backdrop/Backdrop';

//This function allows us to display the props.children of a given burger order
// We now include the CSS inline style to display the animation whenever the Order Now button is toggled 
// We now also import Backdrop bc we want this to show whenever the modal is displayed and also import Aux to display the props.children of the component
// Like order summary, we will convert modal into a class component so that we can display the componentWillUpdate warning 
// ALWAYS REMEMBER, when you convert to a Stateful component, convert props to this.props
class Modal extends Component {

    // by adding this, we increase the efficiency of the app because it is no longer unnecessarily re-rendering unless the modal is updated
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate')
    }

    render() {
        return (
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
        </Aux>
        );
    }
} 

export default Modal;