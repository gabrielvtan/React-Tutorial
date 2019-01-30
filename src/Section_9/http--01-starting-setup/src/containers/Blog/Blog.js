import React, { Component } from 'react';
// import axios from 'axios'; - we comment this out now because we added the axios.js global file 
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

// According to the lifecycle hooks - we should use componentDidMount() for its side-effects on making http requests
// it does not affect your react logic but it has the side effect of fetching new data, which has the side-effect on your application
// but it should not be used for updating state since it will cause a re-render
// we now include selectedPostId to state because it will be the specific post we will be referencing when clicked
// we also include error as a state so that we can render an error message whenever it occurs
class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    // here we use an axios method for sending get requests
    // we will use promises so that we can wait for the entire https call - then() takes a function as input and this function will get executed
    // once the promise resolves
    // We have to setState() after the promise has been resolved so that the response.data may be saved to the current state 
    // we will also transform the posts prior to setState()
    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                // This gets only the first 4 items of the response data
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Gabby'
                    }
                })
                this.setState({posts: updatedPosts});
                // console.log(response)
            })
            // Here we chain a second method after .then(response) in order to error check our http request 
            // catch(error) lets us catch a specific error message and then print it to the console or do a specific action 
            .catch(error => {
                // console.log(error);
                this.setState({error:true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id})
    }

    render () {
        // Here we now include a variable for handling errors - the default posts variable is an error message
        let posts = <p style={{textAlign: "center"}}>Something went Wrong!</p>
        // If there is no error then handle normally otherwise - return the posts error message
        if (!this.state.error) {
            // title is passed here from Post.js as a prop
            // remember to include the key property with each post
            // we use an arrow function here instead of the standard {this.postSelectedHandler} in order to
            // include the post.id as an argument to that method
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>;
            });
        }



        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    {/* the id from post should be passed here so that we can select a specific post to view by ID */}
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;