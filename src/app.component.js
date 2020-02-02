import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ROUTES } from './app.constants';
import Navigation from './components/navigation/navigation.component';
import ListView from './routes/list-view/listView.component';
import AddCharacter from './routes/add-character/addCharacter.component';

class AppComponent extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <Route exact path={ROUTES.home} component={ListView} />
          <Route exact path={ROUTES.addCharacter} component={AddCharacter} />
        </div>
      </div>
    );
  }
}

export default AppComponent;
