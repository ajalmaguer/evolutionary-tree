import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="tree">
        <ul>
          <li>
            <a>Parent</a>
            <ul>
              <li>
                <a>Child</a>
                <ul>
                  <li>
                    <a>Grand Child</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Child</a>
                <ul>
                  <li><a>Grand Child</a></li>
                  <li>
                    <a>Grand Child</a>
                    <ul>
                      <li>
                        <a>Great Grand Child</a>
                      </li>
                      <li>
                        <a>Great Grand Child</a>
                      </li>
                      <li>
                        <a>Great Grand Child</a>
                      </li>
                    </ul>
                  </li>
                  <li><a>Grand Child</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
