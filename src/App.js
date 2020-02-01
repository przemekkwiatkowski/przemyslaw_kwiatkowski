import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import ListView from './routes/list-view/ListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />

        <div className="container">
          <Route exact path="/" component={ListView} />
        </div>
      </div>
    );
  }
}

export default App;
