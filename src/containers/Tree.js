import React, { Component } from 'react'
import { connect } from 'react-redux';
import Node from './Node';

class Tree extends Component {
    nodesToRender = () => {
        const { nodesById, match: { params } } = this.props;
        return Object.keys(nodesById).length > 0;
    }

    render() {
        console.log('Tree > this.props =', this.props);
        const { match: { params } } = this.props;

        return (
            <div>
                {this.nodesToRender() &&
                    <div className="tree" >
                        <ul>
                            <Node id={params.id || 'new_0'} />
                        </ul>
                    </div>
                }
                {!this.nodesToRender() &&
                    <div style={{textAlign: 'center'}}>
                        No Data
                    </div>
                }
            </div>

        )

    }
}

function mapStateToProps(state, ownProps) {
    return {
        nodesById: state.nodesById
    };
}
const connectedTree = connect(mapStateToProps)(Tree);
export default connectedTree
