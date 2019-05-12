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
import InfluenceAFollower from './Page/InfluenceAFollower/InfluenceAFollower';
import SelectedAvatar from './Page/SelectedAvatar/SelectedAvatar';
import InsightHairColor from './Page/InsightHairColor/InsightHairColor';
import InsightWeight from './Page/InsightWeight/InsightWeight';
import InsightSkin from './Page/InsightSkin/InsightSkin';
import InsightAccuracy from './Page/InsightAccuracy/InsightAccuracy';
import InsightFinancial from './Page/InsightFinancial/InsightFinancial';
import InsightStyle from './Page/InsightStyle/InsightStyle';
import InsightThankYou from './Page/InsightThankYou/InsightThankYou';
import InsightSexuality from './Page/InsightSexuality/InsightSexuality';
import InsightPolitical from './Page/InsightPolitical/InsightPolitical';
import InsightComplete from './Page/InsightComplete/InsightComplete';
import IntroOceanVideo from './Page/IntroOceanVideo/IntroOceanVideo';
import YourPower from './Page/YourPower/YourPower';
import PickASide from './Page/PickASide/PickASide';
import Campaign from './Page/Campaign/Campaign';
import InfluencedBy from './Page/InfluencedBy/InfluencedBy';
import DarkAd from './Page/DarkAd/DarkAd';
import TargetAd from './Page/TargetAd/TargetAd';
import SuccessAd from './Page/SuccessAd/SuccessAd';
import InfluenceANation from './Page/InfluenceANation/InfluenceANation';
import ConsumerData from './Page/ConsumerData/ConsumerData';
import PoliticalData from './Page/PoliticalData/PoliticalData';
import HomeData from './Page/HomeData/HomeData';
import FindCitizens from './Page/FindCitizens/FindCitizens';
import TargetsFound from './Page/TargetsFound/TargetsFound';
import SocialMedia from './Page/SocialMedia/SocialMedia';

// NOTE: requires sym-link from ../../shared/user.js
import User from './Components/User/user';

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
    this.state = {
      date: 'test',
      virtue: 'default',
      gender: 'default',
      name: 'default',
      selectedFollower: {
        name: 'Remy Sharp',
        image: 'https://material-ui.com/static/images/avatar/1.jpg'
      },
      user: new User()
    };
    this.test_state = this.test_state.bind(this);
    this.set_key = this.set_key.bind(this);
  };

  test_state() {
    this.setState({
      date: 'test2'
    });
  }

  set_key(key, value) {
    this.setState({
      [key]: value
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
              <Route exact path="/username" render={() => <Username set_key={this.set_key} />} />
              <Route exact path="/pledge" component={Pledge} />
              <Route exact path="/searching-for" render={() => <SearchingFor set_key={this.set_key} />} />
              <Route exact path="/data-is" render={() => <DataIs virtue={this.state.virtue} />} />
              <Route exact path="/believe-in-dataism" render={() => <BelieveInDataism virtue={this.state.virtue} />} />
              <Route exact path="/steps" render={() => <Steps virtue={this.state.virtue} />} />
              <Route exact path="/personalised-experience" component={PersonalisedExperience} />
              <Route exact path="/game" component={Game} />
              <Route exact path="/thank-you" render={() => <ThankYou name={this.state.name} />} />
              <Route exact path="/influence-a-follower" component={InfluenceAFollower} />
              <Route exact path="/selected-avatar" render={() => <SelectedAvatar virtue={this.state.virtue} selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-hair" component={InsightHairColor} />
              <Route exact path="/insight-weight" component={InsightWeight} />
              <Route exact path="/insight-skin" component={InsightSkin} />
              <Route exact path="/insight-accuracy" component={InsightAccuracy} />
              <Route exact path="/insight-financial" component={InsightFinancial} />
              <Route exact path="/insight-style" component={InsightStyle} />
              <Route exact path="/insight-thank-you" component={InsightThankYou} />
              <Route exact path="/insight-sexuality" component={InsightSexuality} />
              <Route exact path="/insight-political" component={InsightPolitical} />
              <Route exact path="/insight-complete" component={InsightComplete} />
              <Route exact path="/intro-ocean-video" component={IntroOceanVideo} />
              <Route exact path="/your-power" component={YourPower} />
              <Route exact path="/pick-a-side" component={PickASide} />
              <Route exact path="/campaign" component={Campaign} />
              <Route exact path="/influenced-by" component={InfluencedBy} />
              <Route exact path="/dark-ad" component={DarkAd} />
              <Route exact path="/target-ad" component={TargetAd} />
              <Route exact path="/success-ad" component={SuccessAd} />
              <Route exact path="/influence-a-nation" component={InfluenceANation} />
              <Route exact path="/consumer-data" component={ConsumerData} />
              <Route exact path="/political-data" component={PoliticalData} />
              <Route exact path="/home-data" component={HomeData} />
              <Route exact path="/find-citizens" component={FindCitizens} />
              <Route exact path="/targets-found" component={TargetsFound} />
              <Route exact path="/social-media" component={SocialMedia} />
            </Router>
          </header>
        </div>
      </MuiThemeProvider>

    );
  }
}
export default App;
