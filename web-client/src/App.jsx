import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import TouchToBegin from './Page/TouchToBegin/TouchToBegin';
import LoginPage from './Page/LoginPage/LoginPage';
import IntroVideo from './Page/IntroVideo/IntroVideo';
import Username from './Page/Username/Username';
import Pledge from './Page/Pledge/Pledge';
import SearchingFor from './Page/SearchingFor/SearchingFor';

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
            <Route exact path="/" component={TouchToBegin} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/intro-video" component={IntroVideo} />
            <Route exact path="/username" component={Username} />
            <Route exact path="/pledge" component={Pledge} />
            <Route exact path="/searching-for" component={SearchingFor} />
          </Router>
        </header>
      </div>
    </MuiThemeProvider>

  );
}
export default App;
