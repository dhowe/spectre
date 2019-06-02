import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import TextSliderText from "../../Components/TextSliderText/TextSliderText";
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

class InsightFinancial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonEnabled: false};
    this.EnableButton = this.EnableButton.bind(this);
  }

  EnableButton() {
    this.setState({
      buttonEnabled: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content insightPage"}>
            <Typography component="h6" variant="h6">What’s {this.context.targetName}’s likely financial status?</Typography>
            <AvatarComponent target={{ image: this.context.targetImgUrl() }}/>
            <div onTouchEnd={this.EnableButton}>
              <TextSliderText leftText="Poor" rightText="Rich" />
            </div>
            <Link className={this.state.buttonEnabled ? "true" : "disabled"} to="/insight-thank-you">
                <IconButton enabled={this.state.buttonEnabled} icon="next" text="Next" />
            </Link>
        </div>
        <FooterLogo />
    </div>
    );
  }
}

InsightFinancial.propTypes = {
  classes: PropTypes.object.isRequired,
};
InsightFinancial.contextType = UserSession;

export default withStyles(styles)(InsightFinancial);
