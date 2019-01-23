import React, { Component } from 'react';

// this is a different way of applying hoc, in this way, you have to wrap the export default w/ withClass(App), classes.Person
// this takes a className and a specific configuration

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             {/* Here we will pass in the props using the spread operator {...props} - pass on the props as you get them and split them up in key-value pairs */}
//             <WrappedComponent {...props}/>
//         </div>
//     )
// }

// if you need access to lifecycle hooks, then you will need a Stateful WrappedComponent

const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render () {
            return (
                <div className={className}>
                    {/* Here we will pass in the props using the spread operator {...props} - pass on the props as you get them and split them up in key-value pairs */}
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}





export default withClass;