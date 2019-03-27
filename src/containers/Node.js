import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';

class Node extends Component {
    handleNameChange = (e) => {
        console.log('value =', e.target.value);
    }

    handleAddChildClick = () => {
        console.log('add child');
    }

    handleRemoveClick = () => {
        console.log('remove child');
    }

    renderChild = id => {
        const { id: parentId } = this.props
        return (
            <ConnectedNode key={id} id={id} parentId={parentId} />
        )
    }

    render() {
        const { childIds } = this.props
        return (
            <li>
                <div className="node">
                    <div>
                        <input type="text" placeholder="Name..." onChange={this.handleNameChange} />
                    </div>

                    <button
                        type="button"
                        className="primary"
                        onClick={this.handleAddChildClick}
                    >
                        Add Child
                    </button>
                    <button
                        type="button"
                        className="danger"
                        onClick={this.handleRemoveClick}
                    >
                        Remove
                    </button>
                </div>
                {childIds && childIds.length > 0 && 
                    <ul>
                        {childIds.map(this.renderChild)}
                    </ul>
                }
            </li>
        )
    }
}


function mapStateToProps(state, ownProps) {
    console.log('>>> state =', state.nodesById);
    return state.nodesById[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps)(Node);
export default ConnectedNode;