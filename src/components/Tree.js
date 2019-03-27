import React from 'react'
import Node from '../containers/Node';

const Tree = ({ match: { params } }) => {
    return (
        <div className="tree">
            <ul>
                <Node id={params.id || 'new_0'} />
            </ul>
        </div>
    )
}

export default Tree
