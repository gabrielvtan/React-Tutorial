import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost'; - we are commenting this out in order to load it dynamically 

//asyncComponent takes in a function as input  - this allows us to only import the newpost when it is called 
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    // Here we will now create a state for auth in order to set up guards which check for authorization
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                    {/* AsyncNewPost is used instead of NewPost in order to dynamically load the newPost page */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> :null}
                    <Route path="/posts" component={Posts} />
                    {/* This is the 404 message - one way of doing it - for catching unknown routes - */}
                    <Route render={()=> <h1>NOT FOUND 404</h1>} />

                    {/* Alternatively, you can set a redirect path from -> to a new path */}
                    {/* From is not necessary if Redirect is not within the Switch statement */}
                    {/* <Redirect from="/" to="/posts" /> */}
                    {/* By adding componet={Posts}, the posts will automatically populate on the home screen */}
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;