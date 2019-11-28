import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Entry from './components/entryform';
import Home from './components/home'

class App extends Component {
  render () {
    return (
      <div className="app">
          <BrowserRouter>
                <Route exact path="/" component={Entry} ></Route>
                <Route exact path="/home" component={Home} ></Route>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;