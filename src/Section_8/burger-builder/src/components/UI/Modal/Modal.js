import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

//This function allows us to display the props.children of a given burger order
// We now include the CSS inline style to display the animation whenever the Order Now button is toggled 
// We now also import Backdrop bc we want this to show whenever the modal is displayed and also import Aux to display the props.children of the component
const modal = (props) => (
    <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal