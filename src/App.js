import React, { Component } from 'react';
import './App.css';

import { configureStore } from './configureStore';
import Node from './containers/Node';
import { selectNode, createNode, addChild, removeChild, deleteNode } from './actions';


const store = configureStore();
console.log('store =', store.getState());
store.dispatch(selectNode('123'))
store.dispatch(selectNode('456'))

let { nodeId: parentId } = store.dispatch(createNode());
console.log('parentId =', parentId);

let { nodeId: childId1 } = store.dispatch(createNode());
console.log('childId1 =', childId1);

let { nodeId: childId2 } = store.dispatch(createNode());
console.log('childId2 =', childId2);

let { nodeId: childId3 } = store.dispatch(createNode());
console.log('childId3 =', childId3);

store.dispatch(addChild(parentId, childId1));
store.dispatch(addChild(parentId, childId2));
store.dispatch(addChild(childId2, childId3));

store.dispatch(removeChild(parentId, childId2));
store.dispatch(deleteNode(childId2));


console.log('store =', store.getState());


class App extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Evolutionary Tree</h1>

                <div className="tree">
                    <ul>
                        <li>
                            <div className="node">Parent</div>
                            <ul>
                                <Node />
                                <li>
                                    <div className="node">Child</div>
                                    <ul>
                                        <li>
                                            <div className="node">Grand Child</div>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="node">Child</div>
                                    <ul>
                                        <li><div className="node">Grand Child</div></li>
                                        <li>
                                            <div className="node">Grand Child</div>
                                            <ul>
                                                <li>
                                                    <div className="node">Great Grand Child</div>
                                                </li>
                                                <li>
                                                    <div className="node">Great Grand Child</div>
                                                </li>
                                                <li>
                                                    <div className="node">Great Grand Child</div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><div className="node">Grand Child</div></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>


        );
    }
}

export default App;
