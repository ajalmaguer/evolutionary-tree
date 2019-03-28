import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import RemoveButton from '../components/RemoveButton';

class Node extends Component {

    constructor(props) {
        super(props);
        this.state = { name: props.name };
    }

    componentDidMount() {
        if (this.isNew(this.props.id)) {
            this.nameInput.focus()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.setState({ name: this.props.name });
        }
    }

    isNew = (id) => {
        return id.indexOf('new') > -1
    }

    canSave = () => {
        return this.props.name !== this.state.name;
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
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

    handleClickSave = () => {
        const { saveNode, id, parentId } = this.props;
        saveNode(id, this.state, parentId);
    }

    renderChild = id => {
        const { id: parentId } = this.props
        return (
            <ConnectedNode key={id} id={id} parentId={parentId} />
        )
    }

    render() {
        const { childIds, parentId, id, path } = this.props
        return (
            <li>
                <div className="node">
                    <div>
                        <input
                            type="text"
                            placeholder="Name..."
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            ref={(input) => this.nameInput = input}
                        />
                    </div>

                    {!parentId && path !== null &&
                        <RemoveButton remove={this.handleRemoveClick} id={id} />
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

                    {this.canSave(id) &&
                        <button
                            type="button"
                            className="primary"
                            onClick={this.handleClickSave}
                        >
                            Save
                        </button>
                    }
                    {!this.isNew(id) &&
                        <button
                            type="button"
                            className="primary"
                            onClick={this.handleAddChildClick}
                        >
                            Add Child
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
    return state.nodesById[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;