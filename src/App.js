import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
