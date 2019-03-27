import React from 'react'
import { Component } from 'react';
// import { connect } from 'react-redux';

class Node extends Component {
    render() {
        return (
            <li>
                <div className="node">
                    <div>
                        <input type="text" placeholder="Name..." />
                    </div>
                    
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