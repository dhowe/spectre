import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import './App.scss';
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
import InsightGender from './Page/InsightGender/InsightGender';
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

const theme = createMuiTheme({
  useNextVariants: true, // silence deprecation warnings
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
        gender: 'man',
        image: 'https://material-ui.com/static/images/avatar/1.jpg'
      },
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
              <Route exact path="/touch-to-begin" component={TouchToBegin} />
              <Route exact path="/login" component={LoginPage} />
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
              <Route exact path="/influence-a-follower" component={InfluenceAFollower} />
              <Route exact path="/selected-avatar" render={() => <SelectedAvatar selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-hair" render={() => <InsightGender selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-weight" render={() => <InsightWeight selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-skin" render={() => <InsightSkin selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-accuracy" render={() => <InsightAccuracy selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-financial" render={() => <InsightFinancial selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-style" render={() => <InsightStyle selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-thank-you" component={InsightThankYou} />
              <Route exact path="/insight-sexuality" render={() => <InsightSexuality selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-political" render={() => <InsightPolitical selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/insight-complete" render={() => <InsightComplete name={this.state.name} virtue={this.state.virtue} selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/intro-ocean-video" component={IntroOceanVideo} />
              <Route exact path="/your-power" component={YourPower} />
              <Route exact path="/pick-a-side" component={PickASide} />
              <Route exact path="/campaign" render={() => <Campaign selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/influenced-by" render={() => <InfluencedBy selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/dark-ad" component={DarkAd} />
              <Route exact path="/target-ad" render={() => <TargetAd selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/success-ad" render={() => <SuccessAd selectedFollower={this.state.selectedFollower} />} />
              <Route exact path="/influence-a-nation" component={InfluenceANation} />
              <Route exact path="/consumer-data" component={ConsumerData} />
              <Route exact path="/political-data" component={PoliticalData} />
              <Route exact path="/home-data" component={HomeData} />
              <Route exact path="/find-citizens" render={() => <FindCitizens selectedFollower={this.state.selectedFollower} />} />
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
