import React, { Component } from 'react';
// import axios from 'axios';
import {Route, NavLink, Switch} from 'react-router-dom'; // we import Route & Link over here to introduce the specific url path 
// Link is used in lieu of the standard href anchor tag
// NavLink has some extra props which allow us to define some styling for the active link

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                {/* Since the blog is the main container, here will add links to the different pages */}
                <header>
                    <nav>
                        <ul>
                            {/* By using the Link tag, we prevent React from re-rendering the state whenever we select a url path */}
                            {/* Link to= may also be set up as a JS function with an object whose values represent different methods */}
                            {/* An absolute path is always appended to your domain, it always gets added to the end of the baseURL */}
                            {/* pathname: this.props.match.url + '/new-post', is an example of a relative path */}
                            {/* my-active is a different css class that prevents the active styling*/}
                            {/* activeStyle allows us to put a specific styling on the link  */}
                            <li><NavLink 
                                to="/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post', 
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Switch tells the react router to only load one of the routes */}
                {/* The oreder of the routes is really important as  */}
                <Switch>
                    {/* Here we have to include a specific path to each container */}
                    {/* Use exact to perfectly match the url path */}
                    <Route path="/" exact component={Posts}/>
                    <Route path="/new-post" exact component={NewPost}/>
                    {/* Here we will set a dynamic post route for the url - you need (:id) - id is just a variable */}
                    <Route path="/posts/:id" exact component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;