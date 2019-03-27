import React, { Component } from 'react';
import './App.css';
import Node from './containers/Node';

class App extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Evolutionary Tree</h1>

                <div className="tree">
                    <ul>
                        <li>
                            <div>Parent</div>
                            <ul>
                                <Node />
                                <li>
                                    <div>Child</div>
                                    <ul>
                                        <li>
                                            <div>Grand Child</div>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div>Child</div>
                                    <ul>
                                        <li><div>Grand Child</div></li>
                                        <li>
                                            <div>Grand Child</div>
                                            <ul>
                                                <li>
                                                    <div>Great Grand Child</div>
                                                </li>
                                                <li>
                                                    <div>Great Grand Child</div>
                                                </li>
                                                <li>
                                                    <div>Great Grand Child</div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><div>Grand Child</div></li>
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
