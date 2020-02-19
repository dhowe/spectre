import React from "react";
import PropTypes from "prop-types";
//import Typography from "@material-ui/core/Typography/Typography";
//import Grid from "@material-ui/core/Grid/Grid";
import Slider from "@material-ui/core/Slider";
//import ComponentsStyles from '../../App.module.css';
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import OceanProfileHelpModal from '../OceanProfileHelpModal/OceanProfileHelpModal';
import "./OceanProfile.scss";
import "./OceanProfileSidebar.scss";

let activateProfile = false;
let prevActivateProfile = false;

function OceanProfile(props) {
  let traits = props.subject.traits;
  let tname = props.subject.name;

  let targetImage = props.subjectImage;

  activateProfile = props.activateProfile;

  const [sideBar, setSideBar] = React.useState({
    isSideBarActive: false
  });

  const [helpDialog, setHelpDialog] = React.useState({
    isHelpOpened: false
  });



  if (prevActivateProfile !== activateProfile) {
    setSideBar({ isSideBarActive: activateProfile });
    prevActivateProfile = props.activateProfile;
  }

  function handleClick(e) {
    if (sideBar.isSideBarActive) {
      setSideBar({ isSideBarActive: false });
    } else {
      setSideBar({ isSideBarActive: true });
    }
  }

  function handleHelp(e) {
    if (sideBar.isSideBarActive && e) {
      setHelpDialog({ isHelpOpened: true });
    } else {
      setHelpDialog({ isHelpOpened: false });
    }
  }
  //console.log(props.activateProfile)
  /*
function handleChange(e){

  if(props.activateProfile){
    setSideBar({ isSideBarActive: false });
  }else{
    setSideBar({ isSideBarActive: true });
  }
}
*/

  let oceanSliders = Object.keys(traits).map(function(key) {
    return (
      <div className="textSlider" key={key}>
        <div className="icon">
          <img src={"/imgs/" + key + ".svg"} alt={key} />
        </div>
        <div className="sliderContainer">
          <div className="slider">
            <Slider value={traits[key] * 100} aria-labelledby="label" />
          </div>
          <div className="sliderText">
            <p className="slider-title">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            <p className="slider-percentage">{Math.round(traits[key] * 100)}%</p>
          </div>
        </div>
      </div>
    )
  });
  let helpMainTitle = "From these FIVE personality traits, marketers believe they can distinguish every human being";

  let helpTitle = ["Openness",
    "Conscientiousness",
    "Extraversion",
    "Agreeableness",
    "Neuroticism"];

  let helpText = [{Openness: "Openness to experience describes a dimension of personality that distinguishes imaginative, creative people from down-to-earth, conventional people. ",
    Conscientiousness: "Conscientiousness concerns the way in which we control, regulate, and direct our impulses. ",
    Extraversion:" Extraversion is marked by  engagement with the external world, versus being comfortable with your own company.",
    Agreeableness: "Agreeableness reflects individual differences in concern with cooperation and social harmony. ",
    Neuroticism: "Neuroticism refers to the tendency to experience negative emotions."}];

  const oceanHelp = [];

  for (const [index, value] of helpText.entries()) {
    oceanHelp.push(
      <div className="help-item" key={index}>
        <div className="icon">
          <img src={"/imgs/" + helpTitle[index].charAt(0).toLowerCase() + helpTitle[index].slice(1) + ".svg"} alt={index} />
          <h2 className="slider-title">{helpTitle[index]}</h2>
        </div>
        <div className="paragraph">
          <p>{value}</p>
        </div>
      </div>
    )
  }

  /*





    let oceanHelp = Object.keys(traits).map(function(key) {
      return (
        <div className="helpItem" key={key}>
          <div className="helpTitle">
            <img src={"/imgs/" + key + ".svg"} alt={key} />
                        <p className="slider-title">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
          </div>
          <div className="sliderContainer">
          </div>
        </div>
      )

    });
  */

  function closeHelpModal(){
    setHelpDialog({ isHelpOpened: false });
  }

  return (
    <div id="outer-container" className="OceanProfile" >
      <SideNav expanded={sideBar.isSideBarActive} onToggle={e => handleClick(e)}
        className={sideBar.isSideBarActive ? "SideNav-main-expanded" : "SideNav-main-collapsed"}>
        <SideNav.Toggle className={sideBar.isSideBarActive ? "SideNav-toggle-expanded" : "SideNav-toggle-collapsed"}

          onClick={e => handleClick(e)}>  <div id="box2">
            <span id="box2Text"></span>
          </div><h1>OCEAN Profile</h1>
        </SideNav.Toggle>
        <SideNav.Nav defaultSelected="home" className={sideBar.isSideBarActive ? "SideNav-expanded" : "SideNav-collapsed"}>
          <NavItem eventKey="home" className={sideBar.isSideBarActive ? "SideNav-item-expanded" : "SideNav-item-collapsed"}>
            <NavText className="ocean-profile-div">
              <div className="split-h">
                <div className="split-l">
                  <div className="profile-info">
                    <AvatarComponent target={{ name: tname, image: targetImage }} />
                    <h2>{tname}'s<br />OCEAN Profile</h2>
                    <img className="helpIcon" alt="help" src="imgs/help.svg" onClick={e => handleHelp(true)} />
                  </div>
                  <hr />
                  <p>
                    {tname} is the type of person that is not afraid to tell people how it is.
                  <br /><br />
                    They may appear argumentative, confrontational, insensitive, intimidating, and controlling.
                  <br /><br />
                    They can overwhelm others with their energy, intelligence, and desire to order the world around them. </p>
                </div>
                <div className="split-r">
                  <div className="OceanSliders">
                    {oceanSliders}
                  </div>
                </div>
              </div>
              <OceanProfileHelpModal
                isOpen={helpDialog.isHelpOpened}
                title={helpMainTitle}
                content={helpText}
                onClose={e => closeHelpModal(e)}
              />
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>

    </div>

  );
}

OceanProfile.propTypes = {
  classes: PropTypes.object,
};

export default OceanProfile;
