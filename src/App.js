import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import { configureStore } from './configureStore';
import { createNode, addChild, changeNodeName } from './actions';
import Tree from './components/Tree';


const store = configureStore();

let { nodeId: parentId } = store.dispatch(createNode());
let { nodeId: childId1 } = store.dispatch(createNode());
let { nodeId: childId2 } = store.dispatch(createNode());
let { nodeId: childId3 } = store.dispatch(createNode());

store.dispatch(changeNodeName(parentId, 'Amoeba'))
store.dispatch(changeNodeName(childId1, 'Worm'))
store.dispatch(changeNodeName(childId2, 'Fish'))
store.dispatch(changeNodeName(childId3, 'Lizard'))

store.dispatch(addChild(parentId, childId1));
store.dispatch(addChild(parentId, childId2));
store.dispatch(addChild(childId2, childId3));



class App extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Evolutionary Tree</h1>

                <Provider store={store}>
                    <Router>
                        <Route path="/:id?" component={Tree} />
                    </Router>
                </Provider>

            </div>
        );
    }
}

export default App;
