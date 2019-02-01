import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Aux';


// here we create a hoc which we will be able to wrap BurgerBuilder in so that it may be able to handle errors 
// this will also be able to wrap any other component with a global error handler
// we need to include axios as a second argument so that we can set up an error handler on it 
// we also return an annonymous class component 
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // here we now add this lifecylce hook to check the current state of the error message 
        componentWillMount () {
            // here we use another interceptor for request, but again like response, we are not interested in the request, but rather
            // we are interested in calling this setstate and clear any errors so that whenever I send the request I don't have the error 
            // set up anymore - it is cleared from the state
            // we also have to create a reference to the interceptor and create a new properties for the class by using this.reqInterceptor -> we now
            // are able to use these properties in componentWillUnmount()
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // whenever we start to use withErrorHandler in multiple containers, it will create unused interceptors which will take up memory
        // so we have to use componentWillUnmount() in order to clear the unused interceptors from memory
        componentWillUnmount () {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        // since the modal property also gets removed when we click the backdrop, we also want to clear the error when this occurs
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}> 
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}
export default withErrorHandler;