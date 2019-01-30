import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

// Here we use componentDidUpdate bc we are checking specific post which will re-render the page
// we now create a state for loadedPost which will allow us to access the properties of a given response
class FullPost extends Component {
    state = {
        loadedPost: null,
    }

    componentDidUpdate () {
        // We include this if statement to make sure we are not checking if the id is null
        // then select the response for a given id
        if (this.props.id) {
            // we need to include this if check statement so that we don't run an infinite loop
            // Check if there is a loaded post then 
            // check to make sure it's not the same id as the one previously selected
            // or if there is no this.state.loadedPost
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id)
                .then(response => {
                    // console.log(response);
                    this.setState({loadedPost: response.data})
                });
            } 
        }
    }

    // similar to the axios.get() - the response would then have to be connected to a database in order to delete a given post
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // Here we have to create a check to see if request has been completed
        // it will show a loading sign if not 
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading....!</p>
        }
        // Here we use state.loadedPost because we want to confirm that the loadedPost value is not null
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    {/* We have to use this.state specifically here because we are setting a new state when we select a post */}
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;