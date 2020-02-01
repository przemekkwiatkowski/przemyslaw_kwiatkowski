import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component';
import ListView from './routes/list-view/listView.component';

class AppComponent extends Component {
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

export default AppComponent;
