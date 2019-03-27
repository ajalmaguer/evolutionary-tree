import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

class Node extends Component {
    componentDidMount() {
        this.nameInput.focus()
    }

    isNew = (id) => {
        return id.indexOf('new') > -1
    }

    handleNameChange = (e) => {
        const { changeNodeName, id } = this.props;
        changeNodeName(id, e.target.value);
    }

    handleAddChildClick = () => {
        const { createNode, addChild, id: parentId } = this.props;
        const childId = createNode().nodeId;
        addChild(parentId, childId);
    }

    handleSelectNodeClick = () => {
        const { id, selectNode } = this.props;
        selectNode(id);
    }

    handleRemoveClick = () => {
        const { requestDeleteNode, id } = this.props;
        requestDeleteNode(id);
    }

    renderChild = id => {
        const { id: parentId } = this.props
        return (
            <ConnectedNode key={id} id={id} parentId={parentId} />
        )
    }

    render() {
        const { childIds, parentId, name, id } = this.props
        return (
            <li>
                <div className="node">
                    <div>
                        <input
                            type="text"
                            placeholder="Name..."
                            value={name}
                            onChange={this.handleNameChange}
                            ref={(input) => this.nameInput = input}
                        />
                    </div>

                    {!parentId &&
                        <button
                            type="button"
                            className="danger"
                            onClick={this.handleRemoveClick}
                        >
                            Remove Me
                        </button>
                    }

                    {parentId && !this.isNew(id) &&
                        <Link to={id}>
                            <button
                                type="button"
                            >
                                Make Me Root
                            </button>
                        </Link>
                    }

                    <button
                        type="button"
                        className="primary"
                        onClick={this.handleAddChildClick}
                    >
                        Add Child
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
    return state.nodesById[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;