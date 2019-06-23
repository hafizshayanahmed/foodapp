import React, { Component } from 'react';

import Navigation from "./components/router"

import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Navigation />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;