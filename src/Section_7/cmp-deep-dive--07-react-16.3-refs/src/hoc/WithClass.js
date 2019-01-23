import React, { Component } from 'react';

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

const withClass = (WrappedComponent, className) => {
    const WithClass = class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    // this allows us to take a function as an argument - returning our hoc with the updated reference
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    });
}


export default withClass;