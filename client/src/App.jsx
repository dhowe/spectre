import React from 'react';
import Routes from './Routes.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserSession from './Components/UserSession/UserSession';
import User from './Components/User/User';

import blue from '@material-ui/core/colors/blue';
import './App.scss';

const theme = createMuiTheme({
  // silence deprecation warns
  useNextVariants: true,
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  },
});

class App extends React.Component {

  componentDidMount() {
    console.log('App.componentDidMount');
    window.addEventListener("keyup", this.handleKeyPress);
  }

  componentWillUnmount() {
    console.log('App.componentWillUnmount');
    window.removeEventListener("keyup", this.handleKeyPress);
  }

  handleKeyPress = event => {
    console.log('App.handleKeyPress', event.key, this.props.history);
    this.setState({ lastKey: event.key });
    // switch (event.keyCode) {
    //   case 39: // RIGHT_ARROW
    //     console.log('RIGHT');
    //     break;
    //   case 37: // LEFT_ARROW
    //     console.log('LEFT');
    //     break;
    //   default:
    // }
  };

  render() {
    return (
      <UserSession.Provider value={new User()}>
        <MuiThemeProvider theme={theme}>
          <div className="App" >
            <header className="App-header">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <Routes />
            </header>
          </div>
        </MuiThemeProvider>
      </UserSession.Provider>
    );
  }
}


export default App;
