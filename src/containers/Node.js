import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Node extends Component {
    handleNameChange = (e) => {
        const { changeNodeName, id } = this.props;
        changeNodeName(id, e.target.value);
    }

    handleAddChildClick = () => {
        const { createNode, addChild, id: parentId } = this.props;
        const childId = createNode().nodeId;
        addChild(parentId, childId);
    }

    handleRemoveClick = () => {
        const { removeChild, deleteNode, id, parentId } = this.props;
        removeChild(parentId, id);
        deleteNode(id);
    }

    renderChild = id => {
        const { id: parentId } = this.props
        return (
            <ConnectedNode key={id} id={id} parentId={parentId} />
        )
    }

    render() {
        const { childIds, parentId, name } = this.props
        return (
            <li>
                <div className="node">
                    <div>
                        <input type="text" placeholder="Name..." value={name} onChange={this.handleNameChange} />
                    </div>

                    <button
                        type="button"
                        className="primary"
                        onClick={this.handleAddChildClick}
                    >
                        Add Child
                    </button>
                    {typeof parentId !== 'undefined' &&
                        <button
                            type="button"
                            className="danger"
                            onClick={this.handleRemoveClick}
                        >
                            Remove Me
                        </button>
                    }
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
    return state.nodesById[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;