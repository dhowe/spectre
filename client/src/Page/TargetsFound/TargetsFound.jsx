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
  image: {
    height: '500px',
    width: '440px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
};

class TargetsFound extends React.Component {
  
  constructor(props) {
    super(props, '/launch-campaign');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <div className={`${classes.content} content`}>
          <Video autoPlay style={{ width: '100%' }} movie="/video/TargetsFound_Animation.mp4" onComplete={this.next} />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

TargetsFound.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
TargetsFound.contextType = UserSession;

export default withStyles(styles)(TargetsFound);
