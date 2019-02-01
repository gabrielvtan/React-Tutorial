import React from 'react';
// import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );



// withRouter is a great way to make the path, route-aware. It will use or get the props containing information for the nearest loaded route
export default post