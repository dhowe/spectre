import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from '../../Components/TextSliderText/TextSliderText';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

import ComponentsStyles from '../../App.module.css';

const styles = {};

class Insight extends React.Component {

  constructor(props) {
    super(props, props.next);
    this.state = {
      targetName: '',
      targetUpdate: UserSession.epochDate,
      targetImage: UserSession.imageDir + 'default.jpg',
      buttonEnabled: false
    };
  }

  enableButton = () => {
    this.setState({ buttonEnabled: true, });
    document.getElementById("clickMe").click();
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'login', 'gender', 'virtue', 'target']);
    this.setState({
      targetName: user.target.name,
      targetImage: UserSession.profileDir + user.targetImage(),
      targetUpdate: user.target.updatedAt
    });
  }

  render() {
    const { leftText, rightText, middleText } = this.props;
    const { classes, question, next, progress } = this.props;
    const { targetName, targetImage, targetUpdate } = this.state;
    return (
      <div className={classes.root} id='clickMe'>
        <SpectreHeader colour="white" progressActive progressNumber={progress} />
        <IdleChecker />
        <div className={`${classes.content} content insightPage`}>
          <h1 className="addSpacing">{question(targetName)}</h1><br />
          <AvatarComponent target={{ name: targetName, image: targetImage, updatedAt: targetUpdate }} />
          <div onTouchEnd={this.enableButton}>
            <TextSliderText leftText={leftText} rightText={rightText} middleText={middleText} />
          </div>
          <div className="link">
            <Link to={next}>
              <IconButton enabled={this.state.buttonEnabled} className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
            </Link>
          </div>
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
