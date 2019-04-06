import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import TouchToBegin from './Components/TouchToBegin/TouchToBegin';
import Placeholder from './Page/Placeholder/Placeholder';

const theme = createMuiTheme({
  palette: {
    primary: blue,
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
          <Router>
            <Route exact path="/" component={Placeholder} />
            <Route exact path="/touch-to-begin" component={TouchToBegin} />
          </Router>
        </header>
      </div>
    </MuiThemeProvider>

  );
}
export default App;
