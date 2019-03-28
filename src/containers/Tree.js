import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Node from './Node';
import { fetchNodes } from '../actions';

class Tree extends Component {
    componentDidMount() {
        const { match: { params } } = this.props
        this.props.fetchNodes(params.id);
    }

    componentDidUpdate(prevProps) {
        const { match: { params: prevParams } } = prevProps;
        const { match: { params } } = this.props
        if (params.id !== prevParams.id) {
            this.props.fetchNodes(params.id);
        }
    }

    render() {

        const { match: { params }, loading, nodesById, error } = this.props;

        if (loading) {
            return (
                <div className="tree">Loading...</div>
            )
        }

        if (error) {
            return (
                <div className="tree">
                    {error}
                </div>
            )
        }

        if (!params.id && Object.keys(nodesById).length > 0) {
            return (
                <div className="tree" >
                    <ul>
                        <Node id={'5c9c593558e1dc4580085a37'} />
                    </ul>
                </div>
            )
        }

        if (params.id in nodesById) {
            return (
                <div className="tree" >
                    <ul>
                        <Node id={params.id} />
                    </ul>
                </div>
            )
        }

        return (
            <div className="tree">
                No data found...
                {' '}
                <Link to="/">Go Home</Link>
            </div>
        )

    }
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.frontend.loading,
        error: state.frontend.error,
        nodesById: state.nodesById,
    };
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchNodes: (id) => dispatch(fetchNodes(id))
})

const connectedTree = connect(mapStateToProps, mapDispatchToProps)(Tree);
export default connectedTree
