import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from '../../Components/TextSliderText/TextSliderText';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class Insight extends NavigationHack {
  constructor(props) {
    super(props, props.next);
    this.state = { buttonEnabled: false };
    this.EnableButton = this.EnableButton.bind(this);
  }

  EnableButton() {
    this.setState({
      buttonEnabled: true,
    });
  }

  render() {
    const {
      classes,
      leftText,
      middleText,
      rightText,
      question,
      next,
      progress,
    } = this.props;

    this.context.target = this.context.target || UserSession.defaults[0];
    const tname = this.context.target.name;
    const timage = this.context.targetImgUrl();
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber={progress} />
        <div className={`${classes.content} content insightPage`}>
          <Typography component="h6" variant="h6">{question(tname)}</Typography>
          <AvatarComponent target= {{name: tname, image: timage }} />
          <div onTouchEnd={this.EnableButton}>
            <TextSliderText leftText={leftText} rightText={rightText} middleText={middleText} />
          </div>
          <Link to={next}>
            <IconButton enabled={true} icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Insight.propTypes = {
  classes: PropTypes.object.isRequired,
  next: PropTypes.string.isRequired,
  leftText: PropTypes.string.isRequired,
  middleText: PropTypes.string,
  rightText: PropTypes.string.isRequired,
  question: PropTypes.func.isRequired,
  progress: PropTypes.string.isRequired,
};
Insight.contextType = UserSession;

export default withStyles(styles)(Insight);
