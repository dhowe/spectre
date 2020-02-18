import React from "react";
import PropTypes from "prop-types";
//import Typography from "@material-ui/core/Typography/Typography";
//import Grid from "@material-ui/core/Grid/Grid";
import Slider from "@material-ui/core/Slider";
//import ComponentsStyles from '../../App.module.css';
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';


// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import "./OceanProfile.scss";
import "./OceanProfileSidebar.scss";



function OceanProfile(props) {
  let traits = props.subject.traits;
  let tname = props.subject.name;

  const [sideBar, setSideBar] = React.useState({
    isSideBarActive: false
  });
  //let sideBar = sB;

  function handleClick(e) {
    if (sideBar.isSideBarActive) {
      setSideBar({ isSideBarActive: false });
    } else {
      setSideBar({ isSideBarActive: true });
    }
  }
  return (
    <div id="outer-container" className="OceanProfile">
      <SideNav expanded={sideBar.isSideBarActive} onToggle={e => handleClick(e) }
        onSelect={(selected) =>  console.log(selected) } className={sideBar.isSideBarActive ? "SideNav-main-expanded" : "SideNav-main-collapsed"}>
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
                  <div>
                    <p>{tname}'s OCEAN Profile</p>
                  </div>
                  <hr />
                  <p>
                    [username] is the type of person that is not afraid to tell people how it is.
                  <br /><br />
                    They may appear argumentative, confrontational, insensitive, intimidating, and controlling.
                  <br /><br />
                    They can overwhelm others with their energy, intelligence, and desire to order the world around them. </p>
                </div>
                <div className="split-r">
                  <div>
                    <div className="OceanSliders">

                      <div className="textSlider">
                        <div className="icon">
                          <img src="/imgs/openness.svg" alt="openness" />
                        </div>
                        <div className="sliderContainer">
                          <div className="slider">
                            <Slider value={traits.openness * 100} aria-labelledby="label" />
                          </div>
                          <div className="sliderText">
                            <p className="slider-title">Openness</p>
                            <p className="slider-percentage">{Math.round(traits.openness * 100)}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="textSlider">
                        <div className="icon">
                          <img src="/imgs/conscientiousness.svg" alt="conscientiousness" />
                        </div>
                        <div className="sliderContainer">
                          <div className="slider">
                            <Slider value={traits.conscientiousness * 100} aria-labelledby="label" />
                          </div>
                          <div className="sliderText">
                            <p className="slider-title">Conscientiousness</p>
                            <p className="slider-percentage">{Math.round(traits.conscientiousness * 100)}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="textSlider">
                        <div className="icon">
                          <img src="/imgs/extraversion.svg" alt="extraversion" />
                        </div>
                        <div className="sliderContainer">
                          <div className="slider">
                            <Slider value={traits.extraversion * 100} aria-labelledby="label" />
                          </div>
                          <div className="sliderText">
                            <p className="slider-title">Extraversion</p>
                            <p className="slider-percentage">{Math.round(traits.extraversion * 100)}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="textSlider">
                        <div className="icon">
                          <img src="/imgs/agreeableness.svg" alt="agreeableness" />
                        </div>
                        <div className="sliderContainer">
                          <div className="slider">
                            <Slider value={traits.agreeableness * 100} aria-labelledby="label" />
                          </div>
                          <div className="sliderText">
                            <p className="slider-title">Agreeableness</p>
                            <p className="slider-percentage">{Math.round(traits.agreeableness * 100)}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="textSlider">
                        <div className="icon">
                          <img src="/imgs/neuroticism.svg" alt="neuroticism" />
                        </div>
                        <div className="sliderContainer">
                          <div className="slider">
                            <Slider value={traits.neuroticism * 100} aria-labelledby="label" />
                          </div>
                          <div className="sliderText">
                            <p className="slider-title">Neuroticism</p>
                            <p className="slider-percentage">{Math.round(traits.neuroticism * 100)}%</p>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>


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
