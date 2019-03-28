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
                <div id="title">
                    <h1>Totally Fake Evolutionary Tree</h1>
                    <div>Built as a demo project by AJ Almaguer. Source code <a href="https://github.com/ajalmaguer/evolutionary-tree" target="_blank">here.</a></div>
                </div>

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
