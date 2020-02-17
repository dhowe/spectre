import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Slider from "@material-ui/core/Slider";
import ComponentsStyles from '../../App.module.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';


// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import "./OceanProfile.scss";
import "./OceanProfileSidebar.scss";



function OceanProfile(props) {
  let traits = props.subject.traits;
  let tname = props.subject.name;

  const [sideBar,setSideBar] = React.useState({
    isSideBarActive : false});


  //let sideBar = sB;

  function handleClick(e){
    if(sideBar.isSideBarActive){
      setSideBar({isSideBarActive: false});
    }else{
      setSideBar({isSideBarActive: true});
    }
  }
  return (
    <div id="outer-container" className="OceanProfile">
    <SideNav expanded={props.isSideBarActive}
    onSelect={(selected) => {
        {console.log(selected)}
    }} className={props.isSideBarActive ? "SideNav-main-expanded" : "SideNav-main-collapsed"}>
    <SideNav.Toggle className={props.isSideBarActive ? "SideNav-toggle-expanded" : "SideNav-toggle-collapsed"} onClick={e=>handleClick(e)}>  <div id="box2">
    <span id="box2Text"></span>
  </div><h1>OCEAN Profile</h1>
    </SideNav.Toggle>
    <SideNav.Nav defaultSelected="charts" className={props.isSideBarActive ? "SideNav-expanded" : "SideNav-collapsed"}>
        <NavItem eventKey="home" className="SideNav-item">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
            <div>
              <p><strong>{tname}'s OCEAN Profile</strong></p>
            </div>
            <Grid container alignItems="center">
              <div className="OceanSliders">
                <div className="">
                  <div className="textSliderText">
                    <Typography>{Math.round(traits.openness * 100)}%</Typography>
                    <div className="sliderContainer">
                      <div className="slider">
                        <Slider value={traits.openness * 100} aria-labelledby="label" />
                      </div>
                    </div>
                    <div className="iconText">

                      <img src="/imgs/openness.svg" alt="openness" />
                      <Typography>Openness</Typography>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="textSliderText">
                    <Typography>{Math.round(traits.conscientiousness * 100)}%</Typography>
                    <div className="sliderContainer">
                      <div className="slider">
                        <Slider value={traits.conscientiousness * 100} aria-labelledby="label" />
                      </div>
                    </div>
                    <div className="iconText">
                      <img src="/imgs/conscientiousness.svg" alt="conscientiousness" />
                      <Typography>Conscientiousness</Typography>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="textSliderText">
                    <Typography>{Math.round(traits.extraversion * 100)}%</Typography>
                    <div className="sliderContainer">
                      <div className="slider">
                        <Slider value={traits.extraversion * 100} aria-labelledby="label" />
                      </div>
                    </div>
                    <div className="iconText">
                      <img src="/imgs/extroversion.svg" alt="extraversion" />
                      <Typography>Extroversion</Typography>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="textSliderText">
                    <Typography>{Math.round(traits.agreeableness * 100)}%</Typography>
                    <div className="sliderContainer">
                      <div className="slider">
                        <Slider value={traits.agreeableness * 100} aria-labelledby="label" />
                      </div>
                    </div>
                    <div className="iconText">
                      <img src="/imgs/agreeableness.svg" alt="agreeableness" />
                      <Typography>Agreeableness</Typography>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="textSliderText">
                    <Typography>{Math.round(traits.neuroticism * 100)}%</Typography>
                    <div className="sliderContainer">
                      <div className="slider">
                        <Slider value={traits.neuroticism * 100} aria-labelledby="label" />
                      </div>
                    </div>
                    <div className="iconText">
                      <img src="/imgs/neuroticism.svg" alt="neuroticism" />
                      <Typography>Neuroticism</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
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
