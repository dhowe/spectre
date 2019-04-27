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
import DataIs from './Page/DataIs/DataIs'
import BelieveInDataism from './Page/BelieveInDataism/BelieveInDataism'
import Steps from './Page/Steps/Steps'
import PersonalisedExperience from './Page/PersonalisedExperience/PersonalisedExperience'
import VideoTest from './Page/VideoTest/VideoTest'
import Game from './Page/Game/Game'
import ThankYou from './Page/ThankYou/ThankYou'

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: 'test' };
    this.test_state = this.test_state.bind(this)
  };

  test_state() {
    this.setState({
      date: 'test2'
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <div className="App">
          <header className="App-header">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            <Router>
              <Route exact path="/" component={VideoTest} />
              <Route exact path="/touch-to-begin" render={() => <TouchToBegin prop={this.state.date} test_state={this.test_state} />} />
              <Route exact path="/login" render={() => <LoginPage prop={this.state.date} />} />
              <Route exact path="/intro-video" component={IntroVideo} />
              <Route exact path="/username" component={Username} />
              <Route exact path="/pledge" component={Pledge} />
              <Route exact path="/searching-for" component={SearchingFor} />
              <Route exact path="/data-is" component={DataIs} />
              <Route exact path="/believe-in-dataism" component={BelieveInDataism} />
              <Route exact path="/steps" component={Steps} />
              <Route exact path="/personalised-experience" component={PersonalisedExperience} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/thank-you" component={ThankYou} />
            </Router>
          </header>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default App;
