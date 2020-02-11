import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';
import ComponentsStyles from '../../App.module.css';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  video: {
    width: '100%',
  },
  content: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
};

class CampaignResults extends React.Component {
  constructor(props) {
    super(props, '/win');
    this.state = { adIssue: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'adIssue']);
    this.setState({ adIssue: user.adIssue });
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { classes } = this.props;
    const { adIssue } = this.state;

    let videoPlaceholder = adIssue.length ? (
      <Video className={ComponentsStyles.inPageVideo}
        movie={'https://spectreknows.me/video/ElectionResults_' + adIssue + '_US.mp4'}
        onComplete={() => this.timeout = setTimeout(() => this.props.history.push('/win'), 1000)}
      />) : <br />;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + ' content'}>
          {videoPlaceholder}
        </div>
        <FooterLogo />
      </div>
    );
  }
}

CampaignResults.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
CampaignResults.contextType = UserSession;

export default withStyles(styles)(CampaignResults);
