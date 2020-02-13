import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from '../../Components/TextSliderText/TextSliderText';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {

};

class Insight extends React.Component {

  constructor(props) {
    super(props, props.next);
    this.state = { buttonEnabled: false, targetName: '',
      targetImage: UserSession.profileDir + 'default.jpg' };
    this.EnableButton = this.EnableButton.bind(this);
  }

  EnableButton() {
    this.setState({
      buttonEnabled: true,
    });
    document.getElementById("clickMe").click();
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      [/*'_id',*/ 'name', 'login', 'gender', 'virtue', 'target']);
    this.setState({ targetName: user.target.name,
      targetImage: user.targetImageUrl() });
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
    const { targetName, targetImage } = this.state;
    return (
      <div className={classes.root} id='clickMe'>
        <SpectreHeader colour="white" progressActive progressNumber={progress} />
        <IdleChecker />
        <div className={`${classes.content} content insightPage`}>
          <h1 className="addSpacing">{question(targetName)}</h1>
          <br/>
          <AvatarComponent target= {{name: targetName, image: targetImage }} />
          <div onTouchEnd={this.EnableButton}>
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
