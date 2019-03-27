import React from 'react'
import { Component } from 'react';
// import { connect } from 'react-redux';

class Node extends Component {
    render() {
        return (
            <li>
                <div>
                    <h4>Node information goes here</h4>
                    
                    <button type="button" className="primary">Add Child</button>
                    <button type="button" className="danger">Remove</button>
                </div>
                {/* <ul> */}
                {/* children go here */}
                {/* </ul> */}
            </li>
        )
    }
}


// function mapStateToProps(state, ownProps) {
//     return state[ownProps.id]
// }

// const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default Node;