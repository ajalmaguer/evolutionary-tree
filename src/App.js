import React, { Component } from 'react';
import './App.css';
import Node from './containers/Node';

class App extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Evolutionary Tree</h1>

                <div className="node" className="tree">
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
