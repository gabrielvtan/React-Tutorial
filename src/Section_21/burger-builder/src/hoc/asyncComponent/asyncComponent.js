import React, {Component} from 'react';

// here we will create a technique which will allow us to only download the data we need in order to render a given component
// This is how we do lazy loading 

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(cmp =>{
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null ;
        }
    }
}

export default asyncComponent;