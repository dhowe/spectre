import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom';

import TouchToBegin from './Page/TouchToBegin/TouchToBegin';
import LoginPage from './Page/LoginPage/LoginPage';
import TakeSelfie from './Page/TakeSelfie/TakeSelfie';
import Pledge from './Page/Pledge/Pledge';
import SearchingFor from './Page/SearchingFor/SearchingFor';
import DataIs from './Page/DataIs/DataIs';
import BelieveInDataism from './Page/BelieveInDataism/BelieveInDataism';
import Steps from './Page/Steps/Steps';
import PersonalisedExperience from './Page/PersonalisedExperience/PersonalisedExperience';
import Game from './Page/Game/Game';
import ThankYou from './Page/ThankYou/ThankYou';
import InfluenceAFollower from './Page/InfluenceAFollower/InfluenceAFollower';
import SelectedAvatar from './Page/SelectedAvatar/SelectedAvatar';
import InsightThankYou from './Page/InsightThankYou/InsightThankYou';
import InsightComplete from './Page/InsightComplete/InsightComplete';
import YourPower from './Page/YourPower/YourPower';
import PickYourSide from './Page/PickYourSide/PickYourSide';
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
import LaunchCampaign from './Page/LaunchCampaign/LaunchCampaign';
import ReferendumResults from './Page/ReferendumResults/ReferendumResults';
import Win from './Page/Win/Win';
import InfluenceACelebrity from './Page/InfluenceACelebrity/InfluenceACelebrity';
import FRMask from './Page/FRMask/FRMask';
import GeneratingVideo from './Page/GeneratingVideo/GeneratingVideo';
import PickAStatement from './Page/PickAStatement/PickAStatement';
import FeelsGood from './Page/FeelsGood/FeelsGood';
import LookAtYou from './Page/LookAtYou/LookAtYou';
import OCEANReveal from './Page/OCEANReveal/OCEANReveal';
import ShallowFake from './Page/ShallowFake/ShallowFake';
import OurAlgorithms from './Page/OurAlgorithms/OurAlgorithms';
import ShareOnSocialChoice from './Page/ShareOnSocialChoice/ShareOnSocialChoice';
import SharingOnSocialMedia from './Page/SharingOnSocialMedia/SharingOnSocialMedia';
import WrapUp from './Page/WrapUp/WrapUp';
import TakeBackControl from './Page/TakeBackControl/TakeBackControl';
import WeAreSorry from './Page/WeAreSorry/WeAreSorry';
import CustomerSurvey from './Page/CustomerSurvey/CustomerSurvey';
import OutroVideo from './Page/OutroVideo/OutroVideo';
import Goodbye from './Page/Goodbye/Goodbye';
import Insight from './Page/Insight/Insight';

import ImageTest from './Page/ImageTest/ImageTest'; // TMP

export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={TouchToBegin} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/take-selfie" component={TakeSelfie} />
      <Route exact path="/pledge" component={Pledge} />
      <Route exact path="/searching-for" component={SearchingFor} />
      <Route exact path="/data-is" component={DataIs} />
      <Route exact path="/believe-in-dataism" component={BelieveInDataism} />
      <Route exact path="/steps" component={Steps} />
      <Route exact path="/personalised-experience" component={PersonalisedExperience} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/thank-you" component={ThankYou} />
      <Route exact path="/influence-a-follower" component={InfluenceAFollower} />
      <Route exact path="/selected-avatar" component={SelectedAvatar} />
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
      <Route exact path="/launch-campaign" component={LaunchCampaign} />
      <Route exact path="/referendum-results" component={ReferendumResults} />
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
    </Router>
  );
}
