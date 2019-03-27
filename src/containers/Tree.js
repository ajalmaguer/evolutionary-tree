import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Node from './Node';
import { fetchNodes } from '../actions';

class Tree extends Component {
    componentDidMount() {
        this.props.fetchNodes();
    }

    render() {

        const { match: { params }, loading, nodesById, error } = this.props;

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>Loading...</div>
            )
        }

        if (error) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {error}
                </div>
            )
        }

        if (!params.id && Object.keys(nodesById).length > 0) {
            return (
                <div className="tree" >
                    <ul>
                        <Node id={'amoeba'} />
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
            <div style={{ textAlign: 'center' }}>
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
