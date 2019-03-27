import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import { configureStore } from './configureStore';
import { receiveNodes } from './actions';
import Tree from './components/Tree';


const store = configureStore();

const responseData = {
    new_0: {
        id: 'new_0',
        name: 'Amoeba',
        childIds: [
            'new_1',
            'new_2'
        ]
    },
    new_1: {
        id: 'new_1',
        name: 'Worm',
        childIds: []
    },
    new_2: {
        id: 'new_2',
        name: 'Fish',
        childIds: [
            'new_3',
            'new_4'
        ]
    },
    new_3: {
        id: 'new_3',
        name: 'Lizard',
        childIds: []
    },
    new_4: {
        id: 'new_4',
        name: 'Bird',
        childIds: [
            'new_5',
            'new_6'
        ]
    },
    new_5: {
        id: 'new_5',
        name: 'Chicken',
        childIds: []
    },
    new_6: {
        id: 'new_6',
        name: 'Turkey',
        childIds: []
    }
}
store.dispatch(receiveNodes(responseData));



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
