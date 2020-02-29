import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import TouchToBegin from './Pages/TouchToBegin/TouchToBegin';
import LoginPage from './Pages/LoginPage/LoginPage';
import TakeSelfie from './Pages/TakeSelfie/TakeSelfie';
import Pledge from './Pages/Pledge/Pledge';
import MessageForm from './Pages/MessageForm/MessageForm';
import SearchingFor from './Pages/SearchingFor/SearchingFor';
import DataIs from './Pages/DataIs/DataIs';
import Steps from './Pages/Steps/Steps';
import Personalised from './Pages/Personalised/Personalised';
import Game from './Pages/Game/Game';
import ThankYou from './Pages/ThankYou/ThankYou';
import InfluenceAFollower from './Pages/InfluenceAFollower/InfluenceAFollower';
import Selected from './Pages/Selected/Selected';
import InsightThankYou from './Pages/InsightThankYou/InsightThankYou';
import InsightComplete from './Pages/InsightComplete/InsightComplete';
import YourPower from './Pages/YourPower/YourPower';
import PickYourSide from './Pages/PickYourSide/PickYourSide';
import Campaign from './Pages/Campaign/Campaign';
import DarkAd from './Pages/DarkAd/DarkAd';
import TargetAd from './Pages/TargetAd/TargetAd';
import SuccessAd from './Pages/SuccessAd/SuccessAd';
import InfluenceANation from './Pages/InfluenceANation/InfluenceANation';
import ConsumerData from './Pages/ConsumerData/ConsumerData';
import PoliticalData from './Pages/PoliticalData/PoliticalData';
import HomeData from './Pages/HomeData/HomeData';
import FindCitizens from './Pages/FindCitizens/FindCitizens';
import TargetsFound from './Pages/TargetsFound/TargetsFound';
import LaunchCampaign from './Pages/LaunchCampaign/LaunchCampaign';
import CampaignResults from './Pages/CampaignResults/CampaignResults';
import Win from './Pages/Win/Win';
import InfluenceACelebrity from './Pages/InfluenceACelebrity/InfluenceACelebrity';
import FRMask from './Pages/FRMask/FRMask';
import GeneratingVideo from './Pages/GeneratingVideo/GeneratingVideo';
import PickAStatement from './Pages/PickAStatement/PickAStatement';
import FeelsGood from './Pages/FeelsGood/FeelsGood';
import LookAtYou from './Pages/LookAtYou/LookAtYou';
import OCEANReveal from './Pages/OCEANReveal/OCEANReveal';
import ShallowFake from './Pages/ShallowFake/ShallowFake';
import OurAlgorithms from './Pages/OurAlgorithms/OurAlgorithms';
import ShareOnSocialChoice from './Pages/ShareOnSocialChoice/ShareOnSocialChoice';
import SharingOnSocialMedia from './Pages/SharingOnSocialMedia/SharingOnSocialMedia';
import WrapUp from './Pages/WrapUp/WrapUp';
import TakeBackControl from './Pages/TakeBackControl/TakeBackControl';
import WeAreSorry from './Pages/WeAreSorry/WeAreSorry';
import CustomerSurvey from './Pages/CustomerSurvey/CustomerSurvey';
import OutroVideo from './Pages/OutroVideo/OutroVideo';
import Goodbye from './Pages/Goodbye/Goodbye';
import Insight from './Pages/Insight/Insight';
import ImageTest from './Pages/ImageTest/ImageTest'; // TMP
import UserSession from './Components/UserSession/UserSession';
import User from './Components/User/User';
import Navigation from './Components/Navigation/Navigation';
import Keyboardist from 'react-keyboardist';
//import PostExp from './PostExp/';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.scss';
import colors from './colors.scss';

const theme = createMuiTheme({
  // silence deprecation warns
  useNextVariants: true,
  palette: {
    primary: {
      main: colors.blue
    },
    secondary: {
      main: colors.grey
    }
  },
  status: {
    danger: 'orange',
  },
});

class App extends React.Component {

  render() {
    return (
      <UserSession.Provider value={new User()}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <Router>
                <React.Fragment>
                  <Keyboardist bindings={{ Right: this.next }} />
                  <Navigation />
                  <Route exact path="/" component={TouchToBegin} />
                  <Route exact path="/selfie" component={TakeSelfie} />
                  <Route exact path="/message" component={MessageForm} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/pledge" component={Pledge} />
                  <Route exact path="/searching" component={SearchingFor} />
                  <Route exact path="/data-is" component={DataIs} />
                  <Route exact path="/personalised" component={Personalised} />
                  <Route exact path="/game" component={Game} />
                  <Route exact path="/thank-you" component={ThankYou} />
                  <Route exact path="/steps" component={Steps} />
                  <Route exact path="/follower" component={InfluenceAFollower} />
                  <Route exact path="/selected" component={Selected} />

                  <Route exact path="/insight-gender" render={props => <Insight {...props} progress="one" leftText="Male" middleText="Non-binary" rightText="Female" next="/insight-skin" question={name => `What’s ${name}’s gender?`} />} />
                  <Route exact path="/insight-skin" render={props => <Insight {...props} progress="one" leftText="Light" rightText="Dark" next="/insight-financial" question={name => `What is ${name}'s skin colour?`} />} />
                  <Route exact path="/insight-financial" render={props => <Insight {...props} progress="one" leftText="Poor" rightText="Rich" next="/insight-thank-you" question={name => `What’s ${name}’s financial status?`} />} />
                  <Route exact path="/insight-thank-you" component={InsightThankYou} />
                  <Route exact path="/insight-sexuality" render={props => <Insight {...props} progress="one" leftText="Straight" middleText="Bi" rightText="Gay" next="/insight-political" question={name => `What is ${name}’s likely sexual orientation?`} />} />
                  <Route exact path="/insight-political" render={props => <Insight {...props} progress="one" leftText="Left Wing" rightText="Right Wing" next="/insight-complete" question={name => `What is ${name}’s likely political preference?`} />} />

                  <Route exact path="/insight-complete" component={InsightComplete} />
                  <Route exact path="/your-power" component={YourPower} />
                  <Route exact path="/pick-your-side" component={PickYourSide} />
                  <Route exact path="/campaign" component={Campaign} />
                  <Route exact path="/dark-ad" component={DarkAd} />
                  <Route exact path="/target-ad" component={TargetAd} />
                  <Route exact path="/success-ad" component={SuccessAd} />
                  <Route exact path="/influence-a-nation" component={InfluenceANation} />
                  <Route exact path="/consumer-data" component={ConsumerData} />
                  <Route exact path="/political-data" component={PoliticalData} />
                  <Route exact path="/home-data" component={HomeData} />
                  <Route exact path="/find-citizens" component={FindCitizens} />
                  <Route exact path="/targets-found" component={TargetsFound} />
                  <Route exact path="/launch-campaign" component={LaunchCampaign} />
                  <Route exact path="/campaign-results" component={CampaignResults} />
                  <Route exact path="/win" component={Win} />
                  <Route exact path="/influence-a-celebrity" component={InfluenceACelebrity} />
                  <Route exact path="/FRMask" component={FRMask} />
                  <Route exact path="/generating-video" component={GeneratingVideo} />
                  <Route exact path="/pick-a-statement" component={PickAStatement} />
                  <Route exact path="/feels-good" component={FeelsGood} />
                  <Route exact path="/look-at-you" component={LookAtYou} />
                  <Route exact path="/OCEAN-reveal" component={OCEANReveal} />
                  <Route exact path="/shallow-fake" component={ShallowFake} />
                  <Route exact path="/our-algorithms" component={OurAlgorithms} />
                  <Route exact path="/share-on-social-choice" component={ShareOnSocialChoice} />
                  <Route exact path="/sharing-on-social-media" component={SharingOnSocialMedia} />
                  <Route exact path="/wrap-up" component={WrapUp} />
                  <Route exact path="/take-back-control" component={TakeBackControl} />
                  <Route exact path="/we-are-sorry" component={WeAreSorry} />
                  <Route exact path="/customer-survey" component={CustomerSurvey} />
                  <Route exact path="/outro-video" component={OutroVideo} />
                  <Route exact path="/goodbye" component={Goodbye} />
                  <Route exact path="/image-test" component={ImageTest} /> {/* TMP */}
{//                  <Route exact path="/postexp" component={PostExp} /> {/* TMP */}
}
                </React.Fragment>

              </Router>
            </header>
          </div>
        </MuiThemeProvider>
      </UserSession.Provider >
    );
  }
}

export default App
