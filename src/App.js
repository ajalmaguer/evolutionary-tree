import React, { Component } from 'react';
import { Provider } from 'react-redux'

import './App.css';
import { configureStore } from './configureStore';
import { selectNode, createNode, addChild } from './actions';
import Node from './containers/Node';


const store = configureStore();
console.log('store =', store.getState());
store.dispatch(selectNode('123'))
store.dispatch(selectNode('456'))

let { nodeId: parentId } = store.dispatch(createNode());
let { nodeId: childId1 } = store.dispatch(createNode());
let { nodeId: childId2 } = store.dispatch(createNode());
let { nodeId: childId3 } = store.dispatch(createNode());

store.dispatch(addChild(parentId, childId1));
store.dispatch(addChild(parentId, childId2));
store.dispatch(addChild(childId2, childId3));



class App extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Evolutionary Tree</h1>

                <Provider store={store}>
                    <div className="tree">
                        <ul>
                            <Node id={parentId} />
                        </ul>
                    </div>
                </Provider>

            </div>
        );
    }
}

export default App;
