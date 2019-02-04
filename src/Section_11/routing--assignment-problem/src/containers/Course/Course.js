import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: ''
    }

    componentDidMount () {
        this.parseQueryParams();
    }
    
    componentDidUpdate() {
        this.parseQueryParams();
    }

    // URLSearchParams allows you to parse the query params 
    parseQueryParams () {
        console.log(this.props);
        // this const query allows us to now iterate over the search params
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param);
            if (this.state.courseTitle !== param[1]) {
                this.setState({courseTitle: param[1]});
            }
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                {/* <h1>{this.props.match.params.courseTitle}</h1> */}
                <p>You selected the Course with ID: {this.props.match.params.courseId}</p>
            </div>
        );
    }
}

export default Course;