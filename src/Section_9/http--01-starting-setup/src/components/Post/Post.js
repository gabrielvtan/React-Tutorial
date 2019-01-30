import React from 'react';

import './Post.css';

// We set props.title & props.author here so that it can dynamically update
// we include an onClick eventlistener so that the post may be viewed in detail when it is selected
const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default post;