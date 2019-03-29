import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import logo from './logo.svg';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <img src={logo} className="App-logo" alt="logo" />
          <Button variant="contained" color="secondary">
      Hello World
          </Button>
        </header>
      </div>
    </MuiThemeProvider>

  );
}
export default App;
