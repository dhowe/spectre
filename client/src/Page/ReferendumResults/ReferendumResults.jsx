import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';


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

class ReferendumResults extends React.Component {
  constructor(props) {
    super(props, '/win');
  }
  render() {
    let issue = this.context.adIssue;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + ' content'}>
          <Video
            className={classes.video}
            autoPlay
            movie={'/video/ReferendumResults_'+issue+'.mp4'}
            onComplete={() => setTimeout(this.next, 1000)}
          />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

ReferendumResults.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
ReferendumResults.contextType = UserSession;

export default withStyles(styles)(ReferendumResults);
