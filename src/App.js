import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import { configureStore } from './configureStore';
import Tree from './containers/Tree';


const store = configureStore();


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
